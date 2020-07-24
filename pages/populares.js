import React from 'react';
import Layout from '../components/layout/Layout';
import ProductDetails from '../components/layout/ProductDetails';
import useProducts from '../hooks/useProducts';

export default function Populares() {
  const {products} = useProducts('votes');
  return (
    <div>
      <Layout>
        <div className="listado-ptoducts">
          <div className="contenedor">
            <ul className="bg-white">
              {products.map(product => (
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
