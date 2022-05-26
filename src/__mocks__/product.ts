import { Product } from '../entities/product';

export const productMock: Product = {
  id: 1,
  title: 'T-shirt',
  description: "Men's white T-shirt",
  category: "men's clothing",
  image: 'img-src',
  price: 29.9,
  rating: {
    rate: 4.5,
    count: 10,
  },
  quantity: 2,
};
