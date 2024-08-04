import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';


function NavBar() {
    return (

        // <div className="NavBar">
        //     <ul>
        //         <li><Link to='/'>Inicio</Link></li>
        //         <li><Link to='/alta'>Registro</Link></li>
        //         <li><Link to='/ingresar'>Ingresar</Link></li>
        //         <li><Link to='/producto'>Productos</Link></li>
        //     </ul>
        // </div>

        <Navbar expand="lg" className='bg-info opacity-19 mb-5' style={{ height: '90px' }}>
            <Container>
                <Navbar.Brand as={Link} to='/'>Ecommerce</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to='/'>Home</Nav.Link>
                        <Nav.Link as={Link} to='/alta'>Registro</Nav.Link>
                        <Nav.Link as={Link} to='/ingresar'>Ingresar</Nav.Link>
                        <Nav.Link as={Link} to='/producto'>Productos</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>);

}

export default NavBar;