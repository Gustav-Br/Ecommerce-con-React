import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Card, Col, Row, Container } from 'react-bootstrap';
import firebase from '../Config/firebase';
import styles from './FavoritesView.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { ArrowLeftSquare, Pencil, Trash } from 'react-bootstrap-icons';


function FavoritesView() {
    const [producto, setProducto] = useState([]);
    const [loading, setLoading] = useState(true);
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
                setLoading(false);
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

    if (loading) {
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
                                            <Pencil className={styles.iconStyle} size={30}  /* boton editar */
                                                onClick={() => handleFavEdit(item)} />
                                            <Trash className={styles.iconStyle} size={30}   /* boton eliminar */
                                                onClick={() => handleFavDelete(item)} />
                                            <Link to='/producto' className={styles.linkStyle}>                         {/* boton volver  */}
                                                <ArrowLeftSquare className={styles.iconStyle} size={30} /></Link>
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