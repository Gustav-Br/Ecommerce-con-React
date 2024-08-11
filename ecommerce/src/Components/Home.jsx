import Products from './Products.jsx';
// eslint-disable-next-line no-unused-vars
import firebase from '../Config/firebase.js';


function Home() {

    return (
        <div className="Home">
            <Products />
        </div>
    );
}

export default Home;