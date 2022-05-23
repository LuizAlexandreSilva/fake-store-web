import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import api from '../config/api';
import { Cart } from '../entities/cart';
import { AuthContext } from './auth';

type CartContextData = {
  userCart?: Cart;
  cartProductsCount: number;
};

export const CartContext = createContext<CartContextData>(
  {} as CartContextData,
);

type CartState = {
  userCarts: Cart[];
};
export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState<CartState>();

  const getUserCarts = useCallback(async (userId: number) => {
    const response = await api.get(`carts/user/${userId}`);
    setData({
      userCarts: response.data,
    });
  }, []);

  useEffect(() => {
    if (user) {
      getUserCarts(user.id);
    }
  }, [user, getUserCarts]);

  const providerValue: CartContextData = useMemo(
    () => ({
      userCart: data?.userCarts[0],
      cartProductsCount: data?.userCarts[0].products.length || 0,
    }),
    [data],
  );
  return (
    <CartContext.Provider value={providerValue}>
      {children}
    </CartContext.Provider>
  );
}
