import { Route, Routes } from 'react-router-dom';
import Home from '../Components/Home';
import Products from '../Components/Products';
import Login from '../Components/Login';
import Registro from '../Components/Registro';
import NotFound from '../Components/NotFound';
import Detail from '../Components/Detail';



function Public() {
    return (
        <div className="Public">
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/producto' element={<Products />} />
                <Route path='/producto/:id' element={<Detail />} />
                <Route path='/ingresar' element={<Login />} />
                <Route path='/alta' element={<Registro />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default Public;

