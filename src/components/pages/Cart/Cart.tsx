import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardTitle, Table } from 'reactstrap';
import api from '../../../config/api';
import { Cart as TCart } from '../../../entities/cart';
import { Product } from '../../../entities/product';
import { CartItem } from '../../molecules/CartItem';
import { Loading } from '../../molecules/Loading';

function Cart() {
  const params = useParams();
  const [cartProducts, setCartProducts] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState(false);

  const getCart = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get<TCart>(`carts/${params.id}`);

      const products = await Promise.all(
        response.data.products.map(async (product) => {
          const productResponse = await api.get<Product>(
            `products/${product.productId}`,
          );

          return {
            ...productResponse.data,
            quantity: product.quantity,
          };
        }),
      );

      setCartProducts(products);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [params.id]);

  const handleGoToPayment = useCallback(() => {
    alert('End of project');
  }, []);

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="row">
      <Card>
        <CardBody>
          <CardTitle tag="h5">Cart</CardTitle>
          <h6>Products</h6>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <Table>
                <tr>
                  <th />
                  <th>Description</th>
                  <th>Value</th>
                  <th />
                </tr>
                <tbody>
                  {cartProducts &&
                    cartProducts.map((item) => (
                      <CartItem key={item.id} product={item} />
                    ))}
                </tbody>
              </Table>

              <div className="d-flex justify-content-end">
                <Button color="primary" onClick={handleGoToPayment}>
                  Go to payment
                </Button>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default Cart;
