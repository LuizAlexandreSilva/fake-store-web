import React from 'react';
import ReactStars from 'react-stars';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from 'reactstrap';
import { Product } from '../../../entities/product';

type Props = {
  data: Product;
};

function ProductListItem({ data }: Props) {
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
                <Button className="w-100" color="success">
                  Add to Cart
                </Button>
              </div>
            </div>
          </CardBody>
        </div>
      </Card>
    </div>
  );
}

export default ProductListItem;
