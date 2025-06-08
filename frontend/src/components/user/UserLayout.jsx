import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const UserLayout = () => {
  return (
    <div className="flex h-screen bg-[#111]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout; 