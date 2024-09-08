import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import styles from './NavBar.module.css';


function NavBar() {
    const context = useContext(AuthContext);
    return (
        <Navbar expand="md" className={`bg-info mb-5 ${styles.navBar} `}>
            <Container className={styles.container}>
                <Navbar.Brand >Ecommerce</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.toggle} />
                <Navbar.Collapse id="basic-navbar-nav" className={styles.dropdown}>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to='/'>Home</Nav.Link>
                        {!context.login && <>
                            <Nav.Link as={Link} to='/alta'>Registro</Nav.Link>
                            <Nav.Link as={Link} to='/ingresar'>Ingresar</Nav.Link>
                        </>}
                        {context.login && <>
                            <Nav.Link as={Link} to='/producto'>Productos</Nav.Link>
                            <Nav.Link as={Link} to='/verfavorito'>Favoritos</Nav.Link>
                            <Nav.Link onClick={context.handlerLogout}>Salir</Nav.Link>
                        </>}
                    </Nav>
                </Navbar.Collapse>
                {context.login && <div className={styles.userName}>
                    Hola {context.user}</div>}
            </Container>
        </Navbar>);
}

export default NavBar;