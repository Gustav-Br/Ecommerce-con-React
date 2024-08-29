import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Card, Col, Row, Container, Button } from 'react-bootstrap';
import firebase from '../Config/firebase';
import styles from './FavoritesView.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';


function FavoritesView() {
    const [producto, setProducto] = useState([]);
    const [louding, setLouding] = useState(true);
    const navigate = useNavigate();
    const context = useContext(AuthContext);


    useEffect(() => {
        const result = async () => {
            try {
                const user = firebase.auth().currentUser;
                const querySnapshot = await firebase.firestore().collection('productos')
                    .where('userId', '==', user.uid)
                    .get();
                const respData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setProducto(respData);
                setLouding(false);
            }
            catch (e) {
                console.log(e);
            }
        }
        result();

    }, []);

    const handleFavEdit = (producto) => {
        navigate('/editfavorito', { state: { producto } })
    }

    const handleFavDelete = (producto) => {
        navigate('/borrarfavorito', { state: { producto } })
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
            <div>
                <h3 className={styles.title}>Tus productos Favoritos</h3>
                <Container >
                    <Row>
                        {producto.map((item) => (
                            <Col key={item.id} xs={12} sm={6} lg={4} xxl={3} className={styles.cardColumn}>
                                <Card style={{ width: '20rem' }} className={styles.imageContainer} >
                                    <Card.Img variant="top" src={item.imagen} className={styles.customImgSize} />
                                    <Card.Body>
                                        <Card.Title>{item.descripcion}</Card.Title>
                                        <Card.Text>{item.garantia}</Card.Text>
                                        <Card.Text>Precio: ${item.precio}</Card.Text>
                                        {context.login && <>
                                            <Button variant="primary" className={styles.buttonStyle}
                                                onClick={() => handleFavEdit(item)}>
                                                <span className={styles.linkButStyle}>Editar</span></Button>
                                            <Button variant="primary" className={styles.buttonStyle}
                                                onClick={() => handleFavDelete(item)}>
                                                <span className={styles.linkButStyle}>Eliminar</span></Button>
                                            <Button variant="primary" className={styles.buttonStyle}>
                                                <Link to='/producto' className={styles.linkButStyle}>Cancelar</Link></Button>
                                        </>}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default FavoritesView;