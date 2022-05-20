import React from 'react';
import { AuthProvider } from './contexts/auth';
import Routes from './routes';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
