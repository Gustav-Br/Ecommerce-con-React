import { useState } from 'react';
import { validate, validateForm } from '../Utils/validate';
import { Form, Button, Container } from 'react-bootstrap';
import firebase from '../Config/firebase';
import AlertCustom from './Alert';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Form.module.css';


function Register() {
    const [form, setForm] = useState({ name: '', lastName: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState({ variant: '', text: '' });
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formErrors = validateForm(form);
        if (Object.keys(formErrors).length === 0) {
            //  Envia  el formulario 
            try {
                const responseUser = await firebase.auth().createUserWithEmailAndPassword(form.email, form.password);
                if (responseUser.user.uid) {
                    await firebase.firestore().collection('usuarios').add({
                        name: form.name,
                        lastName: form.lastName,
                        userId: responseUser.user.uid
                    });
                    setForm({ name: '', lastName: '', email: '', password: '' });
                    setAlert({ variant: 'success', text: 'Gracias por registrarse' });
                    setTimeout(() => {
                        navigate('/ingresar');
                    }, 2000);
                }
            }
            catch (e) {
                console.log(e);
                setAlert({ variant: 'danger', text: 'Ha ocurrido un error' });
            }
        } else {
            setAlert({ variant: 'danger', text: 'El formulario contiene errores' });
            setTimeout(() => {
                setAlert({ variant: '', text: '' });
            }, 2400);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
        const fieldErrors = validate(name, value);
        setErrors(prevE => ({ ...prevE, ...fieldErrors }));     // función de actualización 
    };

    return (
        <div>
            <h3 className={styles.title}>Registrarse</h3>
            <div><Link to='/ingresar' className={styles.registerLink}>Ya tengo cuenta &gt;</Link></div>
            {alert.variant && <AlertCustom {...alert} />}
            <Container className={styles.formContainer}>
                <Form onSubmit={handleSubmit} className={styles.formStyles}>
                    <Form.Group className="mb-2" controlId="formGroupName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" name="name" value={form.name}
                            onChange={handleChange} placeholder="Ingrese nombre" />
                        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formGroupLastName">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control type="text" name='lastName' value={form.lastName}
                            onChange={handleChange} placeholder="Apellido" />
                        {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name='email' value={form.email}
                            onChange={handleChange} placeholder="Enter email" />
                        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' value={form.password}
                            onChange={handleChange} placeholder="Password" />
                        {errors.password && <ul style={{ color: 'red', listStyle: 'none' }}>
                            {errors.password.map((error, index) => <li key={index} >{error}</li>)}
                        </ul>}
                    </Form.Group>
                    <Button type='submit' variant="primary" >
                        <span className={styles.linkButStyle}>Registrar</span></Button>
                </Form>
            </Container>
        </div >
    );
}

export default Register;