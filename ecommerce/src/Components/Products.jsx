import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Button, Card, Col, Row, Container, Form } from 'react-bootstrap';
import styles from './Products.module.css';
import { Link } from 'react-router-dom';



function Products() {

    const [producto, setProducto] = useState([]);
    const [louding, setLouding] = useState(true);
    const [input, setInput] = useState('');
    const [search, setSearch] = useState('celulares');


    useEffect(() => {
        const result = async () => {
            try {
                const res = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${search}`);
                const respData = await res.json();
                setProducto(respData.results);
                setLouding(false);
            }
            catch (e) {
                console.log(e);
            }
        }

        result();

    }, [search])


    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearch(input);
    };
    console.log(producto);
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
                <Form onSubmit={handleSubmit} className="w-25 mx-auto mb-5">
                    <Form.Group className="d-flex align-items-center" controlId="formGroupSearch">
                        <Form.Control className="me-2" type="text" name="search"
                            value={input} onChange={handleChange} placeholder="buscar" />
                        <Button type='submit' >buscar</Button>
                    </Form.Group>
                </Form>
                <Container>
                    <Row>
                        {producto.map((item) => (
                            <Col key={item.id} xs={12} sm={6} lg={4} xxl={3}>
                                <Card style={{ width: '18rem' }} className={styles.imageContainer} >
                                    <Card.Img variant="top" src={item.thumbnail} className={styles.customImgSize} />
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Text>
                                            Price: ${item.price}
                                        </Card.Text>
                                        <Button variant="primary">
                                            <Link to={`/producto/${item.id}`} className={styles.linkButStyle}>Detalle</Link></Button>
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

export default Products;