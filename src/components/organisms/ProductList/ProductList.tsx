import React from 'react';
import { Card, CardBody, CardColumns, CardTitle } from 'reactstrap';
import { Product } from '../../../entities/product';
import { Loading } from '../../molecules/Loading';
import ProductListItem from '../../molecules/Product/ProductListItem';

type Props = {
  isLoading: boolean;
  products?: Product[];
};

function ProductList({ isLoading, products }: Props) {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="strong">Products</CardTitle>
        {!isLoading ? (
          <div>
            {products && products?.length > 0 ? (
              <CardColumns className="row mt-3">
                {products.map((product) => (
                  <ProductListItem key={product.id} data={product} />
                ))}
              </CardColumns>
            ) : (
              <div className="w-100 text-center">
                <span>No products found.</span>
              </div>
            )}
          </div>
        ) : (
          <Loading />
        )}
      </CardBody>
    </Card>
  );
}

export default ProductList;
