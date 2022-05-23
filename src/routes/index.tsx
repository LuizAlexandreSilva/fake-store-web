import React from 'react';
import {
  BrowserRouter as Router,
  Routes as DOMRoutes,
  Route,
} from 'react-router-dom';
import { Layout } from '../components/organisms/Layout';
import { Cart } from '../components/pages/Cart';
import { Home } from '../components/pages/Home';
import { NoPageFound } from '../components/pages/NoPageFound';
import { SignIn } from '../components/pages/SignIn';
import ProtectedRoute from './ProtectedRoute';

function Routes() {
  return (
    <Router>
      <DOMRoutes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart/:id"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/login" element={<SignIn />} />
        <Route path="*" element={<NoPageFound />} />
      </DOMRoutes>
    </Router>
  );
}

export default Routes;
