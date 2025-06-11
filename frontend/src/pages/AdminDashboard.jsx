import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BarChart, LineChart, Users, CreditCard, Train } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [stats, setStats] = useState({ totalUsers: 0, activeTickets: 0, totalRevenue: 0, networkLoad: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      try {
        // Fetch admin details
        const adminRes = await axios.get('/api/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdminData(adminRes.data);

        // Fetch dashboard statistics
        const statsRes = await axios.get('/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(statsRes.data);

      } catch (err) {
        console.error("Error fetching admin data or stats:", err);
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="p-6 bg-gradient-to-br from-[#0f111a] to-[#1a1d2d] min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600"
        >
          Logout
        </Button>
      </div>

      {/* Top Stats Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-gray-400">Total Users</p>
              <h2 className="text-2xl font-semibold">{stats.totalUsers}</h2>
            </div>
            <Users className="text-blue-400" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-gray-400">Active Tickets</p>
              <h2 className="text-2xl font-semibold">{stats.activeTickets}</h2>
            </div>
            <CreditCard className="text-green-400" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-gray-400">Revenue</p>
              <h2 className="text-2xl font-semibold">₹{stats.totalRevenue.toLocaleString()}</h2>
            </div>
            <BarChart className="text-yellow-400" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-gray-400">Live Network Load</p>
              <h2 className="text-2xl font-semibold">{stats.networkLoad}%</h2>
            </div>
            <Train className="text-red-400" />
          </CardContent>
        </Card>
      </div>

      {/* Tabs Panel */}
      <Tabs defaultValue="wallet" className="space-y-6">
        <TabsList className="flex gap-4 bg-gray-800 p-2 rounded-lg">
          <TabsTrigger value="wallet">Wallet Management</TabsTrigger>
          <TabsTrigger value="users">User Database</TabsTrigger>
          <TabsTrigger value="network">Train Network</TabsTrigger>
          <TabsTrigger value="db">Database Viewer</TabsTrigger>
        </TabsList>

        <TabsContent value="wallet">
          <div className="p-6 bg-[#1e2130] rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Wallet Management</h2>
            <div className="flex gap-4 items-end">
              <Input placeholder="Enter user email or ID" className="flex-1" />
              <Input placeholder="Amount to Add" className="w-1/3" />
              <Button className="bg-blue-500 hover:bg-blue-600">Add Funds</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="p-6 bg-[#1e2130] rounded-xl">User database table coming here.</div>
        </TabsContent>

        <TabsContent value="network">
          <div className="p-6 bg-[#1e2130] rounded-xl">Live metro map and traffic panel here.</div>
        </TabsContent>

        <TabsContent value="db">
          <div className="p-6 bg-[#1e2130] rounded-xl">Live MongoDB viewer goes here.</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard; 