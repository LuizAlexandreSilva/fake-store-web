import React from 'react';
import { AuthProvider } from './contexts/auth';
import Routes from './routes';
import './App.css';
import { CartProvider } from './contexts/cart';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
