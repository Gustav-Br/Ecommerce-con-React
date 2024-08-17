import { Link, useLocation } from "react-router-dom";
import { Button, Card, Container } from 'react-bootstrap';
import styles from './FavoritesAdd.module.css';
import firebase from '../Config/firebase';


function FavoritesAdd() {
    const location = useLocation();
    const { producto } = location.state || {};
    console.log(producto);

    const newProduct = {
        descripcion: producto.title,
        precio: producto.price,
        imagen: producto.pictures[0].url,
        garantia: producto.warranty
    }


    const handlerFavAdd = async () => {
        try {
            const user = firebase.auth().currentUser;
            console.log(user);

            if (user) {
                const producActual = { ...newProduct, userId: user.uid };
                console.log(user.uid);
                console.log(producActual);

                const querySnapshot = await firebase.firestore().collection('productos')
                    .add(producActual)
                console.log(querySnapshot);
            } else {
                console.log("El usuario debe estar logueado");
            };
        }
        catch (e) {
            console.log("Error al agregar documento: ", e);
        };
    };
    console.log("producto: ", producto)
    return (

        < div >
            <Container className={styles.customContainer} >
                <Card className={styles.imageContainer} >
                    <Card.Title>Vas a agregar a Favoritos:</Card.Title>
                    <Card.Img variant="top" src={producto.pictures[0].url} className={styles.customImgSize} />
                    <Card.Body>
                        <Card.Title>{producto.title}</Card.Title>
                        <Card.Text>Precio: ${producto.price}</Card.Text>
                        <Card.Text>{producto.warranty}</Card.Text>
                        <Button variant="primary" className={styles.buttonStyle} onClick={handlerFavAdd}>
                            <span className={styles.linkButStyle}>Aceptar</span></Button>
                        <Button variant="primary" className={styles.buttonStyle}>
                            <Link to='/producto' className={styles.linkButStyle}>Cancelar</Link></Button>
                    </Card.Body>
                </Card>
            </Container>
        </div >
    );
};

export default FavoritesAdd;