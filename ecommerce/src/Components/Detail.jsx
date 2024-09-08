import { useEffect, useState } from 'react';
import { Card, Container, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from './Detail.module.css';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { ArrowLeftSquare, Heart } from 'react-bootstrap-icons';
import { favoritesAddProd } from '../Utils/favoritesAddProd';
import AlertCustom from './Alert';



function Detail() {

    const context = useContext(AuthContext);
    const { id } = useParams();
    const [producto, setProducto] = useState({});
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({ variant: '', text: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const result = async () => {
            try {
                const res = await fetch(`https://api.mercadolibre.com/items/${id}`);
                const respData = await res.json();
                setProducto(respData);
                setLoading(false);
            }
            catch (e) {
                console.log(e);
            }
        }
        result();

    }, [id]);

    const handlerFavorite = (producto) => {

        favoritesAddProd(producto, setLoading, setAlert, navigate);
    }

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
                {alert.variant && <AlertCustom {...alert} />}
                <Container className={styles.customContainer} >
                    {/* Tarjeta para imágenes en miniatura */}
                    <Col xs={12} md={4} className={styles.colCard}>
                        <Card style={{ width: '9rem', border: 'none' }} className={styles.thumbnailContainer} >
                            <Col>
                                {producto.pictures.slice(0, 5).map((picture, index) => (
                                    <Card key={picture.id} className={styles.thumbnailCard}>
                                        <img src={picture.url} alt={producto.title} className={`${styles.thumbnailImg} ${index < 2 ? styles.topThumbnailImg : styles.bottomThumbnailImg}`} />
                                    </Card>
                                ))}
                            </Col>
                        </Card>
                    </Col>
                    {/* Tarjeta para imágen principal */}
                    <Col xs={12} md={6} className={styles.colCard}>
                        <Card className={styles.imageContainer} >
                            <Card.Img variant="top" src={producto.pictures[0].url} className={styles.customImgSize} />
                            <Card.Body>
                                <Card.Title>{producto.title}</Card.Title>
                                <Card.Text>Precio: ${producto.price}</Card.Text>
                                <Card.Text>{producto.warranty}</Card.Text>
                                <Link to='/producto' >
                                    <ArrowLeftSquare className={styles.iconStyle} size={30} /></Link>
                                {context.login && <>
                                    <Heart onClick={() => handlerFavorite(producto)}
                                        className={styles.iconStyle} size={30} color="blue" />
                                </>}
                            </Card.Body>
                        </Card>
                    </Col>
                </Container>
            </div >
        );
    };
}

export default Detail;