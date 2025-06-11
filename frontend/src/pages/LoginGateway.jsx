import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield } from 'lucide-react';

const LoginGateway = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-4xl w-full p-8">
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          Welcome to MetroTix
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* User Login Card */}
          <div 
            onClick={() => navigate('/login')}
            className="bg-[#1a1a1a] p-8 rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 border border-gray-800 hover:border-blue-500"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                <User className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-4">User Login</h2>
              <p className="text-gray-400 mb-6">
                Access your personal account to book tickets, manage your wallet, and view your trip history.
              </p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Login as User
              </button>
            </div>
          </div>

          {/* Admin Login Card */}
          <div 
            onClick={() => navigate('/admin/login')}
            className="bg-[#1a1a1a] p-8 rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 border border-gray-800 hover:border-purple-500"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-purple-500" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-4">Admin Login</h2>
              <p className="text-gray-400 mb-6">
                Access the admin panel to manage the metro system, view analytics, and handle user accounts.
              </p>
              <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Login as Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginGateway; 