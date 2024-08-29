import { Button, Container, Form } from "react-bootstrap";
import firebase from '../Config/firebase';
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import AlertCustom from "./Alert";
import styles from './Form.module.css';


function FavoritesCustom() {

    const [form, setForm] = useState({ descripcion: '', precio: 0, imagen: '', garantia: '' });
    const [alert, setAlert] = useState({ variant: '', text: '' });
    const context = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = firebase.auth().currentUser;
        if (user) {
            const producto = { ...form, userId: user.uid }
            try {
                const querySnapshot = firebase.firestore().collection('productos');
                await querySnapshot.add(producto);
                setAlert({ variant: 'success', text: 'Documento creado correctamente' });
                setTimeout(() => {
                    navigate('/verfavorito')
                }, 2000);
            }
            catch (e) {
                console.log(e);
                setAlert({ variant: 'danger', text: 'Error al crear documento' });
                setTimeout(() => {
                    navigate('/verfavorito')
                }, 2000);
            }
        }
    };

    return (
        <div>
            <h4 className={styles.title}>Agregar producto Favorito</h4>
            {context.login && <>
                <Container className={styles.formContainer}>
                    <Form onSubmit={handleSubmit} className={styles.formStyles}>
                        <Form.Group className="mb-2" controlId="formGroupDescription">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control type="text" name="descripcion" value={form.descripcion}
                                onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formGroupPrice">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type="number" name='precio' value={form.precio}
                                onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formGroupWarranty">
                            <Form.Label>Garantia</Form.Label>
                            <Form.Control type="text" name='garantia' value={form.garantia}
                                onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupImage">
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control type="text" name='imagen' value={form.imagen}
                                onChange={handleChange} />
                        </Form.Group>
                        <Button type='submit' variant="primary" className={styles.buttonStyle}>
                            <span className={styles.linkButStyle}>Guardar</span></Button>
                        <Button variant="primary" className={styles.buttonStyle}>
                            <Link to='/verfavorito' className={styles.linkButStyle}>Cancelar</Link></Button>
                    </Form>
                </Container>
            </>}
            {alert.variant && <AlertCustom {...alert} />}
        </div>
    )
};

export default FavoritesCustom;