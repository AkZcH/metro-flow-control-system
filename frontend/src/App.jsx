import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import UserLayout from './components/user/UserLayout.jsx';
import Dashboard from './pages/user/Dashboard.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import PrivateRoute from './components/common/PrivateRoute.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected user routes */}
          <Route element={<PrivateRoute><UserLayout /></PrivateRoute>}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="book-ticket" element={<div>Book Ticket Page</div>} />
            <Route path="wallet" element={<div>Wallet Page</div>} />
            <Route path="trip-history" element={<div>Trip History Page</div>} />
            <Route path="profile" element={<div>Profile Page</div>} />
          </Route>

          {/* Protected admin routes */}
          <Route
            path="/admin/panel"
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            }
          />

          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 