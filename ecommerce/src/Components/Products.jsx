import React, { useState, useEffect } from 'react';


function Products() {

    const [producto, setProducto] = useState([]);
    const [louding, setLouding] = useState(true);

    useEffect(() => {
        const result = async () => {
            try {
                const res = await fetch('https://api.mercadolibre.com/sites/MLA/search?q=auriculares');
                const respData = await res.json();
                setProducto(respData.results);
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
            <p>Louding</p>
        );
    }
    else {
        return (
            <div>
                <p>Productos</p>
                {producto.map((item) => (
                    <li key={item.id}>
                        <h3>{item.title}</h3>
                        <p>Price: ${item.price}</p>
                    </li>
                )
                )}
            </div>
        );
    }

}

export default Products;