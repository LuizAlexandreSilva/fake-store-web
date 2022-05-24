import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import api from '../../config/api';
import { AuthContext, User } from '../../contexts/auth';
import { Cart } from '../../entities/cart';
import { CartContext, CartProvider } from '../../contexts/cart';

const apiMock = new MockAdapter(api);

describe('Cart Context', () => {
  it('should get user carts successfully', async () => {
    const apiResponse: Cart[] = [
      {
        id: 1,
        date: new Date(2022, 2, 2).toISOString(),
        userId: 1,
        products: [
          {
            productId: 2,
            quantity: 3,
          },
        ],
      },
    ];
    apiMock.onGet('carts/user/1').reply(200, apiResponse);

    render(
      <AuthContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{
          user: { id: 1 } as User,
          signIn: jest.fn(),
          signOut: jest.fn(),
          categories: [],
        }}
      >
        <CartProvider>
          <CartContext.Consumer>
            {(value) =>
              value.cartProductsCount && (
                <span data-testid="consumer">{value.cartProductsCount}</span>
              )
            }
          </CartContext.Consumer>
        </CartProvider>
      </AuthContext.Provider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('consumer').innerHTML).toBe('1');
    });
  });
});
