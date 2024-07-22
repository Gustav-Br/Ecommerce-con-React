import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div className="NavBar">
            <ul>
                <li><Link to='/'>Inicio</Link></li>
                <li><Link to='/alta'>Registro</Link></li>
                <li><Link to='/ingresar'>Ingresar</Link></li>
                <li><Link to='/producto'>Productos</Link></li>
            </ul>
        </div>
    );
}

export default NavBar;