import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from 'reactstrap';

function ProductListItem() {
  return (
    <Card className="mb-3">
      <div className="d-flex">
        <CardImg
          style={{ width: 'fit-content' }}
          height="180px"
          width="130px"
          src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
        />
        <CardBody>
          <CardTitle tag="strong">Blusa</CardTitle>
          <CardSubtitle className="mb-2 text-muted">mens</CardSubtitle>
          <CardText>$ 40</CardText>
          <div className="d-flex justify-content-end">
            <Button className="me-2">More Details</Button>
            <Button>Add to Cart</Button>
          </div>
        </CardBody>
      </div>
    </Card>
  );
}

export default ProductListItem;
