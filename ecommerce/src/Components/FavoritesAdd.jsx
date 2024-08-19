import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Container, Spinner } from 'react-bootstrap';
import styles from './FavoritesAdd.module.css';
import firebase from '../Config/firebase';
import { useState } from "react";
import AlertCustom from "./Alert";


function FavoritesAdd() {
    const location = useLocation();
    const { producto } = location.state || {};
    const currentProduct = {
        descripcion: producto.title,
        precio: producto.price,
        imagen: producto.pictures[0].url,
        garantia: producto.warranty
    }
    const [alert, setAlert] = useState({ variant: '', text: '' });
    const [louding, setLouding] = useState(false);
    const navigate = useNavigate();


    const handleFavAdd = async () => {
        setLouding(true);
        try {
            const user = firebase.auth().currentUser;
            if (user) {
                const producActual = { ...currentProduct, userId: user.uid };
                const querySnapshot = await firebase.firestore().collection('productos')
                    .add(producActual)
                console.log(querySnapshot);
                setLouding(false);
                setAlert({ variant: 'success', text: 'Producto agregado a Favoritos' })
                setTimeout(() => {
                    navigate('/producto')
                }, 2000);
            } else {
                setLouding(false);
                setAlert({ variant: 'danger', text: 'El usuario debe estar logueado' });
                setTimeout(() => {
                    setAlert({ variant: '' });
                }, 2000);
            };
        }
        catch (e) {
            console.log("Error al agregar documento: ", e);
        };
    };

    if (louding) {
        return (
            <Spinner animation="border" role="status" variant="primary" className={styles.spinnerStyle}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }
    else {

        return (
            < div >
                {alert.variant && <AlertCustom {...alert} />}
                <Container className={styles.customContainer} >
                    <Card className={styles.imageContainer} >
                        <Card.Title>Vas a agregar a Favoritos:</Card.Title>
                        <Card.Img variant="top" src={producto.pictures[0].url} className={styles.customImgSize} />
                        <Card.Body>
                            <Card.Title>{producto.title}</Card.Title>
                            <Card.Text>Precio: ${producto.price}</Card.Text>
                            <Card.Text>{producto.warranty}</Card.Text>
                            <Button variant="primary" className={styles.buttonStyle} onClick={handleFavAdd}>
                                <span className={styles.linkButStyle}>Aceptar</span></Button>
                            <Button variant="primary" className={styles.buttonStyle}>
                                <Link to='/producto' className={styles.linkButStyle}>Cancelar</Link></Button>
                        </Card.Body>
                    </Card>
                </Container>
            </div >
        );
    };
};

export default FavoritesAdd;