import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardBody, CardTitle, Input, Label } from 'reactstrap';
import { AuthContext } from '../../../contexts/auth';

type MapChecked = {
  [key: string]: boolean;
};

function Categories() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories } = useContext(AuthContext);
  const [mapChecked, setMapChecked] = useState<MapChecked>({});

  const handleChange = useCallback(
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

      setMapChecked({
        ...mapChecked,
        [category]: !categoryIsSelected,
      });
      setSearchParams({
        ...searchParams,
        categories: searchCategories,
      });
    },
    [mapChecked, searchParams, setSearchParams],
  );

  useEffect(() => {
    const params = searchParams.get('categories');
    if (params) {
      const splittedCategories = params.split(',');
      const map: MapChecked = {};
      splittedCategories.forEach((category) => {
        if (category !== '') map[category] = true;
      });
      setMapChecked(map);
    }
  }, []);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="strong">Categories</CardTitle>
        <div className="mt-3">
          {categories &&
            categories.map((category) => (
              <div className="d-flex">
                <Label key={category} checked={mapChecked[category]}>
                  <Input
                    className="me-2"
                    type="checkbox"
                    checked={mapChecked[category]}
                    onChange={() => handleChange(category)}
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
