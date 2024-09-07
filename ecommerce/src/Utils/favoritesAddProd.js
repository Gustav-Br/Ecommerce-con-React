import firebase from '../Config/firebase';


export const favoritesAddProd = async (producto, setLoading, setAlert, navigate) => {

    setLoading(true);
    const currentProduct = {
        descripcion: producto.title,
        precio: producto.price,
        imagen: producto.pictures[0].url,
        garantia: producto.warranty
    }

    try {
        const user = firebase.auth().currentUser;
        if (user) {
            const producActual = { ...currentProduct, userId: user.uid };
            // eslint-disable-next-line
            const querySnapshot = await firebase.firestore().collection('productos')
                .add(producActual);
            setLoading(false);
            setAlert({ variant: 'success', text: 'Producto agregado a Favoritos' })
            setTimeout(() => {
                navigate('/producto')
            }, 1500);
        } else {
            setLoading(false);
            setAlert({ variant: 'danger', text: 'El usuario debe estar logueado' });
            setTimeout(() => {
                setAlert({ variant: '' });
            }, 2000);
        };
    }
    catch (e) {
        console.log("Error al agregar documento: ", e);
    };
};



