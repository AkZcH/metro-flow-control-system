import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Ticket, 
  Wallet, 
  History, 
  User, 
  LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/book-ticket', icon: <Ticket size={20} />, label: 'Book Tickets' },
    { path: '/wallet', icon: <Wallet size={20} />, label: 'Wallet' },
    { path: '/trip-history', icon: <History size={20} />, label: 'Trip History' },
    { path: '/profile', icon: <User size={20} />, label: 'Profile' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="h-screen w-64 bg-[#1a1a1a] text-white p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#00e0ff]">Metro Portal</h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#00e0ff] text-black'
                      : 'hover:bg-[#2b2b2b] text-gray-300'
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-[#2b2b2b] transition-colors w-full"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar; 