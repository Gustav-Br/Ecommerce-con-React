import { useState } from 'react';
import { validate, validateForm } from '../Utils/validate';
import { Form, Button } from 'react-bootstrap';
import firebase from '../Config/firebase';



function Registro() {
    const [form, setForm] = useState({ name: '', lastName: '', email: '', password: '' });
    const [errors, setErrors] = useState({});


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formErrors = validateForm(form);
        if (Object.keys(formErrors).length === 0) {
            console.log("Envia el formulario", form);

            try {
                const responseUser = await firebase.auth().createUserWithEmailAndPassword(form.email, form.password);
                console.log("responseUser:", responseUser.user.uid);
                if (responseUser.user.uid) {
                    const document = await firebase.firestore().collection('usuarios').add({
                        name: form.name,
                        lastName: form.lastName,
                        userId: responseUser.user.uid
                    });
                    console.log("SE REGISTRO CORRECTAMENTE !!", document);
                    setForm({ name: '', lastName: '', email: '', password: '' });
                }
            }
            catch (e) {
                console.log(e);
            }
        } else {
            console.log("El formulario contiene errores", formErrors);
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
            <Form onSubmit={handleSubmit} className="w-25 mx-auto">
                <Form.Group className="mb-3" controlId="formGroupName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="name" value={form.name}
                        onChange={handleChange} placeholder="Ingrese nombre" />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupLastName">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" name='lastName' value={form.lastName}
                        onChange={handleChange} placeholder="Apellido" />
                    {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
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
                <Button type='submit' variant="primary">Registrar</Button>
            </Form>
        </div >
    );
}

export default Registro;