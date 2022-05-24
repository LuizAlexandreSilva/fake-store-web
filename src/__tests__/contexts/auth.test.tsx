import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router } from 'react-router-dom';

import api from '../../config/api';
import { APP_NAME, AuthProvider } from '../../contexts/auth';
import { SignIn } from '../../components/pages/SignIn';
import { Header } from '../../components/molecules/Header';

const apiMock = new MockAdapter(api);

describe('Auth Context', () => {
  beforeAll(() => {
    jest.spyOn(localStorage, 'getItem');
  });
  it('should sign in successfully', async () => {
    const apiAuthResponse = {
      token: 'eyJhbGciOiJIUzI1NiIsInR',
    };
    const apiUserResponse = [
      {
        id: 1,
      },
    ];
    const apiCategoriesResponse = ['electronics'];
    const spyStorage = jest.spyOn(localStorage, 'setItem');

    apiMock.onPost('auth/login').reply(200, apiAuthResponse);
    apiMock.onGet('users').reply(200, apiUserResponse);
    apiMock.onGet('products/categories').reply(200, apiCategoriesResponse);

    render(
      <Router>
        <AuthProvider>
          <SignIn />
        </AuthProvider>
      </Router>,
    );

    fireEvent.input(screen.getByPlaceholderText('Username'), {
      target: {
        value: 'johndoe',
      },
    });
    fireEvent.input(screen.getByPlaceholderText('Password'), {
      target: {
        value: '123456',
      },
    });

    fireEvent.submit(screen.getByRole('button', { name: /Sign in/i }));

    await waitFor(() =>
      expect(spyStorage).toHaveBeenCalledWith(
        `${APP_NAME}:token`,
        apiAuthResponse.token,
      ),
    );
  });

  it('should sign out successfully', () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(
      JSON.stringify({
        id: 1,
      }),
    );
    jest
      .spyOn(localStorage, 'getItem')
      .mockReturnValueOnce('eyJhbGciOiJIUzI1NiIsInR');
    jest
      .spyOn(localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify(['electronics']));
    const spyStorageRemoveItem = jest.spyOn(localStorage, 'removeItem');

    render(
      <Router>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </Router>,
    );

    fireEvent.click(screen.getByTestId('sign-out-btn'));

    expect(spyStorageRemoveItem).toHaveBeenCalledWith(`${APP_NAME}:token`);
    expect(spyStorageRemoveItem).toHaveBeenCalledWith(`${APP_NAME}:user`);
    expect(spyStorageRemoveItem).toHaveBeenCalledWith(`${APP_NAME}:categories`);
  });
});
