import React from 'react';
import Sidebar from './sidebar/Sidebar';
import Nav from './nav/Nav';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <Sidebar />
      <main>
        <Nav />
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default React.memo(MainLayout);
