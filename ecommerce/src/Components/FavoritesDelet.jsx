import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import firebase from '../Config/firebase';
import styles from './FavoritesDelet.module.css';
import AlertCustom from "./Alert";
import { Check2Square, XSquare } from "react-bootstrap-icons";


function FavoritesDelet() {
    const context = useContext(AuthContext);
    const location = useLocation();
    const { producto } = location.state || {};
    const navigate = useNavigate();
    const [alert, setAlert] = useState({ variant: '', text: '' });

    const handleDelete = async () => {
        const user = firebase.auth().currentUser;
        const id = producto.id;
        if (user && id) {
            try {
                const querySnapshot = firebase.firestore().collection('productos').doc(id);
                const document = await querySnapshot.get();
                if (document.data().userId === user.uid) {
                    await querySnapshot.delete();
                    setAlert({ variant: 'success', text: 'Producto eliminado correctamente' });
                    setTimeout(() => {
                        navigate('/verfavorito')
                    }, 2000);
                } else {
                    setAlert({ variant: 'danger', text: 'El UID no coincide con el documento' });
                    setTimeout(() => {
                        navigate('/verfavorito')
                    }, 2000);
                }
            }
            catch (e) {
                console.error('Error al eliminar el documento: ', e);
            }
        }
    }

    return (
        <div>
            <h3 className={styles.title}>Seguro quieres eliminar este producto?</h3>
            {alert.variant && <AlertCustom {...alert} />}
            <Container className={styles.customContainer}>
                <Card style={{ width: '22rem' }} className={styles.imageContainer} >
                    <Card.Img variant="top" src={producto.imagen} className={styles.customImgSize} />
                    <Card.Body>
                        <Card.Title>{producto.descripcion}</Card.Title>
                        <Card.Text>{producto.descripcion}</Card.Text>
                        <Card.Text>
                            Precio: ${producto.precio}
                        </Card.Text>
                        {context.login && <>
                            <Check2Square onClick={() => handleDelete(producto)}
                                className={styles.iconStyle} size={30} color="blue" />
                            <Link to='/verfavorito' className={styles.linkStyle}>
                                <XSquare className={styles.iconStyle} size={30} /></Link>
                        </>}
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
};

export default FavoritesDelet;