import { Route, Routes } from 'react-router-dom';
import Home from '../Components/Home';
import Products from '../Components/Products';
import Login from '../Components/Login';
import NotFound from '../Components/NotFound';
import Detail from '../Components/Detail';
import Register from '../Components/Register';
import Purchase from '../Components/Purchase';
import FavoritesView from '../Components/FavoritesView';
import FavoritesEdit from '../Components/FavoritesEdit';
import FavoritesDelet from '../Components/FavoritesDelet';
import FavoritesAdd from '../Components/FavoritesAdd';



function Public() {
    return (
        <div className="Public">
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/producto' element={<Products />} />
                <Route path='/producto/:id' element={<Detail />} />
                <Route path='/ingresar' element={<Login />} />
                <Route path='/alta' element={<Register />} />
                <Route path='/compra' element={<Purchase />} />
                <Route path='/altafavorito/:id' element={<FavoritesAdd />} />
                <Route path='/verfavorito' element={<FavoritesView />} />
                <Route path='/editfavorito' element={<FavoritesEdit />} />
                <Route path='/borrarfavorito' element={<FavoritesDelet />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default Public;

