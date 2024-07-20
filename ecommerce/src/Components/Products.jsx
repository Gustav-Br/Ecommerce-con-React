import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Button, Card, Col, Row, Container } from 'react-bootstrap';
import '../styles/Products.css';



const spinnerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
};

function Products() {

  const [producto, setProducto] = useState([]);
  const [louding, setLouding] = useState(true);

  useEffect(() => {
    const result = async () => {
      try {
        const res = await fetch('https://api.mercadolibre.com/sites/MLA/search?q=auriculares');
        const respData = await res.json();
        setProducto(respData.results);
        console.log(respData.results);
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
      <Spinner animation="border" role="status" variant="primary" style={spinnerStyle}>
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
                <Card style={{ width: '18rem' }} className='image-container' >
                  <Card.Img variant="top" src={item.thumbnail} className='custom-img-size' />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                      Price: ${item.price}
                    </Card.Text>
                    <Button variant="primary">Detalle</Button>
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