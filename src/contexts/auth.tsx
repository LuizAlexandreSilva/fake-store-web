import React, { createContext, ReactNode, useCallback, useState } from 'react';
import api from '../config/api';

export const APP_NAME = 'FakeStoreWeb';

type User = {
  id: string;
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
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

type AuthState = {
  user?: User;
  token: string;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AuthState>(() => {
    const storedUser = localStorage.getItem(`${APP_NAME}:user`);
    const token = localStorage.getItem(`${APP_NAME}:token`);

    if (token && storedUser) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(storedUser) };
    }

    return {} as AuthState;
  });

  const getUserByUsername = useCallback(
    async (username: string) => {
      const response = await api.get('/users');

      const users: User[] = response.data;
      const foundUser = users.find((user) => user.username === username);

      setData({ ...data, user: foundUser });
      localStorage.setItem(`${APP_NAME}:user`, JSON.stringify(foundUser));
    },
    [data],
  );

  const signIn = useCallback(
    async (credentials: SignInCredentials) => {
      const { username, password } = credentials;
      const response = await api.post('/auth/login', {
        username,
        password,
      });

      setData({ ...data, token: response.data.token });
      localStorage.setItem(`${APP_NAME}:token`, response.data.token);
      // method used to get signed user data because login route does not return it
      await getUserByUsername(username);
    },
    [data, getUserByUsername],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem(`${APP_NAME}:token`);
    localStorage.removeItem(`${APP_NAME}:user`);

    setData({} as AuthState);
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ signIn, signOut, user: data.user }}>
      {children}
    </AuthContext.Provider>
  );
}
