import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";


function NavBar() {
    const context = useContext(AuthContext);
    return (
        <Navbar expand="lg" className='bg-info mb-5 opacity-75' style={{ height: '90px' }}>
            <Container>
                <Navbar.Brand >Ecommerce</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to='/'>Home</Nav.Link>
                        {!context.login && <>
                            <Nav.Link as={Link} to='/alta'>Registro</Nav.Link>
                            <Nav.Link as={Link} to='/ingresar'>Ingresar</Nav.Link>
                        </>}

                        {context.login && <>
                            <Nav.Link as={Link} to='/producto'>Productos</Nav.Link>
                            <NavDropdown title="Favoritos" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to='/altafavorito'>Alta Favoritos</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to='/editfavorito'>Editar Favoritos</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to='/verfavorito'>Ver Favoritos</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to='/borrarfavorito'>Borrar Favorito</NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link onClick={context.handlerLogout}>Salir</Nav.Link>
                        </>}
                    </Nav>
                </Navbar.Collapse>
                {context.login && <div>
                    Hola {context.user}</div>}
            </Container>
        </Navbar>);
}

export default NavBar;