import React from 'react';
import { Card, CardBody, CardTitle, Input, Label } from 'reactstrap';
import { MapCategoryChecked } from '../../pages/Home/Home';

type Props = {
  items: string[];
  checkedMap: MapCategoryChecked;
  onChangeCategory: (category: string) => void;
};

function Categories({ items, checkedMap, onChangeCategory }: Props) {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="strong">Categories</CardTitle>
        <div className="mt-3">
          {items &&
            items.map((category) => (
              <div className="d-flex">
                <Label key={category} checked={checkedMap[category]}>
                  <Input
                    className="me-2"
                    type="checkbox"
                    checked={checkedMap[category]}
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
