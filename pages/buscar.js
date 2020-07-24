import React, {useEffect, useState} from 'react';
import Layout from '../components/layout/Layout';
import {useRouter} from 'next/router';
import ProductDetails from '../components/layout/ProductDetails';
import useProducts from '../hooks/useProducts';

const Buscar = () => {
    const router =useRouter();
    console.log(router);
    const {query : {q}} = router;
    const {products} = useProducts('create');
    const [result, setResult] = useState([]);
    
    useEffect(() => {
        console.log(q);
       const search = q.toLowerCase();
        const filter = products.filter(product => {
            return (
                product.name.toLowerCase().includes(search) || product.description.toLowerCase().includes(search)
            )
        });
        setResult(filter);
    }, [q, products]);
    return(
        <div>
            <Layout>
                <div className="listado-ptoducts">
                <div className="contenedor">
                    <ul className="bg-white">
                    {result.map(product => (
                        <ProductDetails 
                        key={product.id}
                        product={product}
                        />
                    ))}
                    </ul>
                </div>
                </div>
            </Layout>
        </div>

    )
}

export default Buscar