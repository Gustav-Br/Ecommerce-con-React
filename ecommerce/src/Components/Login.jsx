import { useContext, useState } from 'react';
import firebase from '../Config/firebase';
import { Form, Button } from 'react-bootstrap';
import AlertCustom from './Alert';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';


function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [alert, setAlert] = useState({ variant: '', text: '' });
    const navigate = useNavigate();
    const context = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const responseUser = await firebase.auth().signInWithEmailAndPassword(form.email, form.password);
            if (responseUser.user.uid) {
                const userDocument = await firebase.firestore().collection('usuarios')
                    .where('userId', '==', responseUser.user.uid)
                    .get()
                const user = userDocument.docs[0].data();
                context.handlerLogin(user.name);
                setAlert({ variant: 'success', text: `Bienvenido/a ${user?.name}` });
                setTimeout(() => {
                    navigate('/producto')
                }, 2000);
            }
        }
        catch (e) {
            console.log(e);
            setAlert({ variant: 'danger', text: 'Ha ocurrido un error' })
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });

    };

    return (
        <div>
            <Form onSubmit={handleSubmit} className="w-25 mx-auto">
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email"
                        value={form.email} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password"
                        value={form.password} onChange={handleChange} />
                </Form.Group>
                <Button type='submit'>Ingresar</Button>
            </Form>
            {alert && <AlertCustom {...alert} />}
        </div >
    );
}

export default Login;