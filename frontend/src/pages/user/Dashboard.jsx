import React from 'react';
import { Wallet, Ticket, Clock } from 'lucide-react';

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-[#1a1a1a] p-6 rounded-xl">
    <div className="flex items-center space-x-4">
      <div className={`p-3 rounded-lg ${color}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-gray-400 text-sm">{title}</h3>
        <p className="text-2xl font-semibold text-white">{value}</p>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  // This would typically come from your API
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const stats = {
    walletBalance: '₹500',
    activeTickets: '2',
    lastTrip: '2 hours ago'
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {user.fullname?.firstname || 'User'}!
        </h1>
        <p className="text-gray-400 mt-2">
          Here's what's happening with your metro account
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Wallet className="text-white" size={24} />}
          title="Wallet Balance"
          value={stats.walletBalance}
          color="bg-blue-500"
        />
        <StatCard
          icon={<Ticket className="text-white" size={24} />}
          title="Active Tickets"
          value={stats.activeTickets}
          color="bg-green-500"
        />
        <StatCard
          icon={<Clock className="text-white" size={24} />}
          title="Last Trip"
          value={stats.lastTrip}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1a1a1a] p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Trips</h2>
          <div className="space-y-4">
            {/* This would be populated from your API */}
            <p className="text-gray-400">No recent trips</p>
          </div>
        </div>

        <div className="bg-[#1a1a1a] p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-[#2b2b2b] rounded-lg text-white hover:bg-[#333] transition-colors">
              Book New Ticket
            </button>
            <button className="p-4 bg-[#2b2b2b] rounded-lg text-white hover:bg-[#333] transition-colors">
              Add Money
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 