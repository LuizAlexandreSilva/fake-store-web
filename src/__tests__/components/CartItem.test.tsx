/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import api from '../../config/api';
import { CartItem } from '../../components/molecules/CartItem';
import { ToastContext } from '../../contexts/toast';
import { productMock } from '../../__mocks__/product';

const apiMock = new MockAdapter(api);

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
}));
describe('CartItem component', () => {
  beforeAll(() => {
    apiMock.onDelete('products/1').reply(200);
  });

  it('should call showToast correctly on delete cart item', async () => {
    const mockedShowToast = jest.fn();

    render(
      <Router>
        <ToastContext.Provider value={{ showToast: mockedShowToast }}>
          <CartItem product={productMock} />
        </ToastContext.Provider>
      </Router>,
    );
    fireEvent.click(screen.getByTestId('delete-cart-item-btn'));

    fireEvent.click(screen.getByTestId('confirm-delete-cart-item-btn'));

    await waitFor(() =>
      expect(mockedShowToast).toHaveBeenCalledWith({
        title: 'Success!',
        body: 'Product removed successfully.',
      }),
    );
  });
});
