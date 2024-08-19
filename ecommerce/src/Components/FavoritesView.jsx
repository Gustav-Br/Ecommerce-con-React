import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Card, Col, Row, Container, Button } from 'react-bootstrap';
import firebase from '../Config/firebase';
import styles from './FavoritesView.module.css';
import { Link, useNavigate } from 'react-router-dom';


function FavoritesView() {
    const [producto, setProducto] = useState([]);
    const [louding, setLouding] = useState(true);
    const navigate = useNavigate();

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

    const handleFavDelete = (id) => {
        navigate(`/borrarfavorito/${id}`)
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
                <Container >
                    <Row>
                        {producto.map((item) => (
                            <Col key={item.id} xs={12} sm={6} lg={4} xxl={3}>
                                <Card style={{ width: '20rem' }} className={styles.imageContainer} >
                                    <Card.Img variant="top" src={item.imagen} className={styles.customImgSize} />
                                    <Card.Body>
                                        <Card.Title>{item.nombre}</Card.Title>
                                        <Card.Text>{item.descripcion}</Card.Text>
                                        <Card.Text>{item.garantia}</Card.Text>
                                        <Card.Text>
                                            Precio: ${item.precio}
                                        </Card.Text>
                                        <Button variant="primary" className={styles.buttonStyle}
                                            onClick={() => handleFavEdit(item)}>
                                            <span className={styles.linkButStyle}>Editar</span></Button>
                                        <Button variant="primary" className={styles.buttonStyle}
                                            onClick={() => handleFavDelete(item.id)}>
                                            <span className={styles.linkButStyle}>Eliminar</span></Button>
                                        <Button variant="primary" className={styles.buttonStyle}>
                                            <Link to='/producto' className={styles.linkButStyle}>Cancelar</Link></Button>
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