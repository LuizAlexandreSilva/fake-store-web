import React from 'react';
import { Card, CardBody, CardTitle, Input, Label } from 'reactstrap';

type Props = {
  items: string[];
  selected?: string;
  onChangeCategory: (category: string) => void;
};

function Categories({ items, selected, onChangeCategory }: Props) {
  return (
    <Card className="mb-3">
      <CardBody>
        <CardTitle tag="strong">Categories</CardTitle>
        <div className="mt-3">
          <div className="d-flex">
            <Label checked={!selected}>
              <Input
                className="me-2"
                type="radio"
                value=""
                checked={!selected}
                onChange={() => onChangeCategory('')}
              />
              All
            </Label>
          </div>
          {items &&
            items.map((category) => (
              <div className="d-flex">
                <Label key={category} checked={selected === category}>
                  <Input
                    className="me-2"
                    type="radio"
                    value={category}
                    checked={selected === category}
                    onChange={() => onChangeCategory(category)}
                  />
                  {category}
                </Label>
              </div>
            ))}
        </div>
      </CardBody>
    </Card>
  );
}

export default Categories;
