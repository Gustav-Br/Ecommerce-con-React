import { useState } from 'react';
import firebase from '../Config/firebase';
import { Form, Button } from 'react-bootstrap';


function Login() {
    const [form, setForm] = useState({ email: '', password: '' });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const responseUser = await firebase.auth().signInWithEmailAndPassword(form.email, form.password);
            if (responseUser.user.uid) {
                console.log(responseUser.user.uid, "Loguin exitoso");
            }
        }
        catch (e) {
            console.log(e);
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
        </div >
    );
}

export default Login;