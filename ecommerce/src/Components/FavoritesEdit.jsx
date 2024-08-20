import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import firebase from '../Config/firebase';
import AlertCustom from "./Alert";
import styles from './FavoritesView.module.css';
import { AuthContext } from "../Context/AuthContext";


function FavoritesEdit() {
    const context = useContext(AuthContext);
    const location = useLocation();
    const { producto } = location.state || {};
    const [form, setForm] = useState({ descripcion: '', precio: 0, imagen: '', garantia: '' });
    const navigate = useNavigate();
    const [alert, setAlert] = useState({ variant: '', text: '' });

    useEffect(() => {
        if (producto) {
            setForm({
                descripcion: producto.descripcion || '',
                precio: producto.precio || 0,
                imagen: producto.imagen || '',
                garantia: producto.garantia || ''
            });
        }
    }, [producto]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = firebase.auth().currentUser;
        const id = producto.id;
        if (user && id) {
            try {
                const querySnapshot = firebase.firestore().collection('productos').doc(id);
                await querySnapshot.update({
                    descripcion: form.descripcion,
                    precio: form.precio,
                    imagen: form.imagen,
                    garantia: form.garantia
                });
                setAlert({ variant: 'success', text: 'Documento actualizado correctamente' });
                setTimeout(() => {
                    navigate('/verfavorito')
                }, 2000);
            }
            catch (e) {
                console.log(e);
                setAlert({ variant: 'danger', text: 'Error al actualizar documento' });
                setTimeout(() => {
                    navigate('/verfavorito')
                }, 2000);
            }
        }
    };

    return (
        <div>
            <h4 className={styles.title}>Editar Favorito</h4>
            {context.login && <>
                <Form onSubmit={handleSubmit} className="w-25 mx-auto">
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
            </>}
            {alert.variant && <AlertCustom {...alert} />}
        </div >
    );
};

export default FavoritesEdit;