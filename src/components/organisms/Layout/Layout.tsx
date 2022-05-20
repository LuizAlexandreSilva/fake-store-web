import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../molecules/Header';

function Layout() {
  return (
    <div className="bg-light h-100">
      <Header />
      <div className="container mx-auto mt-3 px-3">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
