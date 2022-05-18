import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './components/organisms/Layout';
import { Home } from './components/pages/Home';
import { NoPageFound } from './components/pages/NoPageFound';
import { Product } from './components/pages/Product';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
        </Route>

        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </Router>
  );
}

export default App;
