import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../../config/api';
import { Product } from '../../../entities/product';
import { Categories } from '../../molecules/Categories';
import { ProductList } from '../../organisms/ProductList';
import { AuthContext } from '../../../contexts/auth';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>();

  const [searchParams, setSearchParams] = useSearchParams();
  const { categories } = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState<string>();

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
  const handleChangeCategory = useCallback(
    (category: string) => {
      const searchCategories = searchParams.has('category')
        ? searchParams.get('category') || ''
        : '';
      const categoryIsSelected = searchCategories === category;

      setSelectedCategory(categoryIsSelected ? '' : category);
      setSearchParams({
        ...searchParams,
        category,
      });
    },
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    const categoryParams = searchParams.get('category');
    if (categoryParams) {
      setSelectedCategory(categoryParams);
    }
  }, []);

  return (
    <div className="row">
      <div className="col-lg-3 col-md-4 col-12">
        <Categories
          items={categories}
          selected={selectedCategory}
          onChangeCategory={handleChangeCategory}
        />
      </div>
      <div className="col-lg-9 col-md-8 col-12">
        <ProductList isLoading={isLoading} products={products} />
      </div>
    </div>
  );
}

export default Home;
