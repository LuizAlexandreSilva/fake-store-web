import React, { useEffect, useState } from 'react';
import api from '../../../config/api';
import { Product } from '../../../entities/product';
import { Categories } from '../../molecules/Categories';
import { ProductList } from '../../organisms/ProductList';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>();

  async function loadProducts() {
    try {
      const response = await api.get('/products/');

      setProducts(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error(JSON.stringify(err));
    }
  }

  // useEffect(() => {
  //   loadProducts();
  // }, []);

  return (
    <div className="row">
      <div className="col-lg-3 col-md-4 col-12">
        <Categories />
      </div>
      <div className="col-lg-9 col-md-8 col-12">
        <ProductList isLoading={isLoading} products={products} />
      </div>
    </div>
  );
}

export default Home;
