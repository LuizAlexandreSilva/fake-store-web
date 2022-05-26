/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import MockAdapter from 'axios-mock-adapter';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Button } from 'reactstrap';
import api from '../../config/api';
import { AuthContext, User } from '../../contexts/auth';
import { ToastContext } from '../../contexts/toast';
import ProductListItem from '../../components/molecules/Product/ProductListItem';
import { productMock } from '../__mocks__/product';

const apiMock = new MockAdapter(api);

describe('ProductListItem component', () => {
  it('should call showToast with success feedback when api returns 204', async () => {
    apiMock.onPost('/carts').reply(204);
    const mockedShowToast = jest.fn();
    const mockedAuthProviderValue = {
      user: { id: 1 } as User,
      signIn: jest.fn(),
      signOut: jest.fn(),
      categories: [''],
    };

    render(
      <AuthContext.Provider value={mockedAuthProviderValue}>
        <ToastContext.Provider value={{ showToast: mockedShowToast }}>
          <ProductListItem data={productMock} />
        </ToastContext.Provider>
      </AuthContext.Provider>,
    );

    fireEvent.click(screen.getByTestId('add-product-to-cart-btn'));

    await waitFor(() => {
      expect(mockedShowToast).toHaveBeenCalledWith({
        title: 'Success!',
        body: (
          <>
            <p>Product added to cart successfully.</p>
            <Button color="success">Go to cart</Button>
          </>
        ),
      });
    });
  });

  it('should call showToast with failure feedback when api returns error', async () => {
    apiMock.onPost('/carts').reply(400);
    const mockedShowToast = jest.fn();
    const mockedAuthProviderValue = {
      user: { id: 1 } as User,
      signIn: jest.fn(),
      signOut: jest.fn(),
      categories: [''],
    };

    render(
      <AuthContext.Provider value={mockedAuthProviderValue}>
        <ToastContext.Provider value={{ showToast: mockedShowToast }}>
          <ProductListItem data={productMock} />
        </ToastContext.Provider>
      </AuthContext.Provider>,
    );

    fireEvent.click(screen.getByTestId('add-product-to-cart-btn'));

    await waitFor(() => {
      expect(mockedShowToast).toHaveBeenCalledWith({
        title: 'Failed!',
        body: 'Product was not added to cart. Try again later.',
      });
    });
  });
});
