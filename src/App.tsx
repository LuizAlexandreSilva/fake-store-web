import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Home } from './components/pages/Home';
import { NoPageFound } from './components/pages/NoPageFound';
import { Product } from './components/pages/Product';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </Router>
  );
}

export default App;
