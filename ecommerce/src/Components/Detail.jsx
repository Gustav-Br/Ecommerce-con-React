import { useEffect, useState } from "react";
import { Button, Card, Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { Link, useParams } from "react-router-dom";
import styles from './Detail.module.css';


function Detail() {

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
                    <Card style={{ width: '20rem' }} className={styles.imageContainer} >
                        <Card.Img variant="top" src={producto.thumbnail} className={styles.customImgSize} />
                        <Card.Body>
                            <Card.Title>{producto.title}</Card.Title>
                            <Card.Text>
                                Price: ${producto.price}
                            </Card.Text>
                            <Button variant="primary" className={styles.buttonStyle}>
                                <Link to='/producto' className={styles.linkButStyle}>Volver</Link></Button>
                        </Card.Body>
                    </Card>
                </Container>
            </div >
        );
    };
}

export default Detail;