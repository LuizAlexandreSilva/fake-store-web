import React from 'react';
import { AuthProvider } from './contexts/auth';
import Routes from './routes';
import './App.css';
import { CartProvider } from './contexts/cart';
import { ToastProvider } from './contexts/toast';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <Routes />
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
