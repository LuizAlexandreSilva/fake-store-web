import React from 'react';
import { Card, CardBody, CardColumns, CardGroup, CardTitle } from 'reactstrap';
import { Product } from '../../../entities/product';
import { Loading } from '../../molecules/Loading';
import ProductListItem from '../../molecules/Product/ProductListItem';

type Props = {
  isLoading: boolean;
  products?: Product[];
};

function ProductList({ isLoading, products }: Props) {
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Card>
      <CardBody>
        <CardTitle tag="strong">Products</CardTitle>
        {true ? (
          <CardColumns>
            <ProductListItem />
            <ProductListItem />
          </CardColumns>
        ) : (
          <div className="w-100 text-center">
            <span>No products found.</span>
          </div>
        )}
      </CardBody>
    </Card>
  );
}

export default ProductList;
