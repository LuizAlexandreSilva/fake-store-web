import React, { createContext, ReactNode, useCallback, useState } from 'react';
import api from '../config/api';

export const APP_NAME = 'FakeStoreWeb';

export type User = {
  id: number;
  username: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: string;
    zipcode: string;
  };
};

type SignInCredentials = {
  username: string;
  password: string;
};

type AuthContextData = {
  user?: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  categories: string[];
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

type AuthState = {
  user?: User;
  token: string;
  categories: string[];
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AuthState>(() => {
    const storedUser = localStorage.getItem(`${APP_NAME}:user`);
    const token = localStorage.getItem(`${APP_NAME}:token`);
    const categories = localStorage.getItem(`${APP_NAME}:categories`);

    const state: AuthState = {
      token: '',
      categories: [],
    };

    if (token && storedUser) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      state.token = token;
      state.user = JSON.parse(storedUser);
    }

    if (categories) {
      state.categories = JSON.parse(categories);
    }

    return state;
  });

  const getUserByUsername = useCallback(async (username: string) => {
    const response = await api.get('/users');

    const users: User[] = response.data;
    const foundUser = users.find((user) => user.username === username);

    localStorage.setItem(`${APP_NAME}:user`, JSON.stringify(foundUser));

    return foundUser;
  }, []);

  const getCategories = useCallback(async () => {
    const response = await api.get('/products/categories');

    const categories: string[] = response.data;
    localStorage.setItem(`${APP_NAME}:categories`, JSON.stringify(categories));

    return categories;
  }, []);

  const signIn = useCallback(
    async (credentials: SignInCredentials) => {
      const { username, password } = credentials;
      const response = await api.post('/auth/login', {
        username,
        password,
      });

      const [user, categories] = await Promise.all([
        getUserByUsername(username), // method used to get signed user data because login route does not return it
        getCategories(),
      ]);
      setData({ user, categories, token: response.data.token });
      localStorage.setItem(`${APP_NAME}:token`, response.data.token);
    },
    [getUserByUsername, getCategories],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem(`${APP_NAME}:token`);
    localStorage.removeItem(`${APP_NAME}:user`);
    localStorage.removeItem(`${APP_NAME}:categories`);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ signIn, signOut, user: data.user, categories: data.categories }}
    >
      {children}
    </AuthContext.Provider>
  );
}
