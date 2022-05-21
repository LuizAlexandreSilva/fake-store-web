import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../../config/api';
import { Product } from '../../../entities/product';
import { Categories } from '../../molecules/Categories';
import { ProductList } from '../../organisms/ProductList';
import { AuthContext } from '../../../contexts/auth';

export type MapCategoryChecked = {
  [key: string]: boolean;
};
function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>();

  const [searchParams, setSearchParams] = useSearchParams();
  const { categories } = useContext(AuthContext);
  const [mapCategoryChecked, setMapCategoryChecked] =
    useState<MapCategoryChecked>({});

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
      let searchCategories = searchParams.has('categories')
        ? searchParams.get('categories') || ''
        : '';
      const splittedCategories = searchCategories?.split(',') || [];
      const categoryIsSelected = !!splittedCategories?.includes(category);

      if (categoryIsSelected) {
        const index = splittedCategories?.findIndex(
          (c: string) => c === category,
        );

        if (index >= 0) {
          splittedCategories?.splice(index, 1);
          searchCategories = splittedCategories.toString();
        }
      } else {
        searchCategories = searchCategories?.concat(`${category},`) || '';
      }

      setMapCategoryChecked({
        ...mapCategoryChecked,
        [category]: !categoryIsSelected,
      });
      setSearchParams({
        ...searchParams,
        categories: searchCategories,
      });
    },
    [mapCategoryChecked, searchParams, setSearchParams],
  );

  useEffect(() => {
    const params = searchParams.get('categories');
    if (params) {
      const splittedCategories = params.split(',');
      const map: MapCategoryChecked = {};
      splittedCategories.forEach((category) => {
        if (category !== '') map[category] = true;
      });
      setMapCategoryChecked(map);
    }
  }, []);

  return (
    <div className="row">
      <div className="col-lg-3 col-md-4 col-12">
        <Categories
          items={categories}
          checkedMap={mapCategoryChecked}
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
