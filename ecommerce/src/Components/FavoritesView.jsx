import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Card, Col, Row, Container } from 'react-bootstrap';
import styles from './Products.module.css';
import firebase from '../Config/firebase';


function FavoritesView() {
    const [producto, setProducto] = useState([]);
    const [louding, setLouding] = useState(true);

    useEffect(() => {
        const result = async () => {
            try {
                const querySnapshot = await firebase.firestore().collection('productos')
                    .get()
                const respData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setProducto(respData);
                setLouding(false);
            }
            catch (e) {
                console.log(e);
            }
        }

        result();

    }, [])

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
                <Container>
                    <Row>
                        {producto.map((item) => (
                            <Col key={item.id} xs={12} sm={6} lg={4} xxl={3}>
                                <Card style={{ width: '18rem' }} className={styles.imageContainer} >
                                    <Card.Img variant="top" src={item.imagen} className={styles.customImgSize} />
                                    <Card.Body>
                                        <Card.Title>{item.nombre}</Card.Title>
                                        <Card.Text>{item.descripcion}</Card.Text>
                                        <Card.Text>{item.id}</Card.Text>
                                        <Card.Text>
                                            Price: ${item.precio}
                                        </Card.Text>
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