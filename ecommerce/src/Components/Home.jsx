import Products from './Products.jsx';
import firebase from '../Config/firebase.js';


function Home() {
    console.log(firebase);
    return (
        <div className="Home">
            <Products />
        </div>
    );
}

export default Home;