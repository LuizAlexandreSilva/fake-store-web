import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../molecules/Header';

function Layout() {
  return (
    <div className="bg-slate-100 h-screen">
      <Header />

      <div className="container mx-auto mt-5 px-3 h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
