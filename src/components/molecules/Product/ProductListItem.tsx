import React, { useCallback, useContext, useState } from 'react';
import ReactStars from 'react-stars';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Input,
  InputGroup,
} from 'reactstrap';
import api from '../../../config/api';
import { AuthContext } from '../../../contexts/auth';
import { ToastContext } from '../../../contexts/toast';
import { Product } from '../../../entities/product';

type Props = {
  data: Product;
};

function ProductListItem({ data }: Props) {
  const { user } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeQuantity = useCallback(
    (type: 'minus' | 'plus') => {
      if (type === 'minus' && quantity > 1) {
        setQuantity(quantity - 1);
      } else if (type === 'plus' && quantity < 99) {
        setQuantity(quantity + 1);
      }
    },
    [quantity],
  );

  const handleAddToCart = useCallback(async () => {
    if (quantity < 1 || quantity > 99) return;

    try {
      setIsLoading(true);
      await api.post('/carts', {
        userId: user?.id,
        date: new Date().toISOString(),
        products: [
          {
            productId: data.id,
            quantity,
          },
        ],
      });

      showToast({
        title: 'Success!',
        body: (
          <>
            <p>Product added to cart successfully.</p>
            <Button color="success">Go to cart</Button>
          </>
        ),
      });
    } catch (err) {
      showToast({
        title: 'Failed!',
        body: 'Product was not added to cart. Try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [data.id, quantity, user?.id, showToast]);

  return (
    <div className="mb-3 col-lg-12 col-xl-6">
      <Card>
        <div className="d-flex">
          <div className="my-auto ms-1">
            <CardImg
              className="mh-100"
              height="180px"
              style={{ width: '140px' }}
              src={data.image}
            />
          </div>
          <CardBody>
            <div className="d-flex row justify-content-between">
              <div>
                <CardTitle tag="strong">{data.title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted">
                  {data.category}
                </CardSubtitle>
                <CardText className="mb-1">$ {data.price}</CardText>
                <div className="d-flex">
                  <ReactStars
                    count={5}
                    value={data.rating.rate}
                    edit={false}
                    half
                  />
                  <CardText tag="small" className="ms-1 text-muted">
                    ({data.rating.count})
                  </CardText>
                </div>
              </div>
              <div className="mt-2">
                <InputGroup>
                  <Button onClick={() => handleChangeQuantity('minus')}>
                    -
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    min={1}
                    max={99}
                    onChange={(e) => setQuantity(+e.target.value)}
                  />
                  <Button onClick={() => handleChangeQuantity('plus')}>
                    +
                  </Button>

                  <Button
                    color="success"
                    onClick={handleAddToCart}
                    disabled={isLoading}
                  >
                    <small>{!isLoading ? 'Add to Cart' : 'loading'}</small>
                  </Button>
                </InputGroup>
              </div>
            </div>
          </CardBody>
        </div>
      </Card>
    </div>
  );
}

export default ProductListItem;
