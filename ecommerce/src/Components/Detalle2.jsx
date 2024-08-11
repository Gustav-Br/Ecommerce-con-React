import { useEffect, useState } from "react";
import { Button, Card, Container, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { Link, useParams } from "react-router-dom";
import styles from './Detail2.module.css';


function Detalle2() {

    const { id } = useParams();
    const [producto, setProducto] = useState({});
    const [louding, setLouding] = useState(true);

    useEffect(() => {
        const result = async () => {
            try {
                const res = await fetch(`https://api.mercadolibre.com/items/${id}`);
                const respData = await res.json();
                setProducto(respData);
                setLouding(false);
            }
            catch (e) {
                console.log(e);
            }
        }
        result();

    }, [id]);

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
                <Container className={styles.customContainer} >


                    {/* Tarjeta para imágenes en miniatura */}
                    <Col xs={12} md={4} >
                        <Card style={{ width: '9rem' }} className={styles.thumbnailContainer} >



                            <Col>
                                {producto.pictures.slice(0, 5).map((picture, index) => (
                                    <Card key={picture.id} className={`${index < 2 ? styles.topThumbnailImg : styles.bottomThumbnailImg}`}>
                                        <img src={picture.url} alt={producto.title} className={styles.thumbnailImg} />
                                    </Card>
                                ))}
                            </Col>


                        </Card>
                    </Col>
                    {/* Tarjeta para imágen principal */}
                    <Col xs={12} md={6} >
                        <Card className={styles.imageContainer} >
                            <Card.Img variant="top" src={producto.pictures[0].url} className={styles.customImgSize} />
                            <Card.Body>
                                <Card.Title>{producto.title}</Card.Title>
                                <Card.Text>
                                    Price: ${producto.price}
                                </Card.Text>
                                <Button variant="primary">
                                    <Link to='/producto' className={styles.linkButStyle}>Volver</Link></Button>
                            </Card.Body>
                        </Card>
                    </Col>

                </Container>
            </div >
        );
    };
}

export default Detalle2;