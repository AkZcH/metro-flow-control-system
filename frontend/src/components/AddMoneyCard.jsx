import React, { useState } from 'react';
import axios from 'axios';

const AddMoneyCard = () => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await axios.post('/api/admin/add-money', {
        email,
        amount: parseFloat(amount),
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      setMessage(res.data.message + ` New balance: ₹${res.data.newBalance}`);
      setEmail('');
      setAmount('');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="bg-[#10151e] p-6 rounded-2xl shadow-md w-full max-w-xl">
      <h2 className="text-2xl font-semibold text-white mb-4">Add Money to User Wallet</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            User Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter user's email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#1e2a38] text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">
            Amount (₹)
          </label>
          <input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.01"
            className="w-full px-4 py-2 rounded-lg bg-[#1e2a38] text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#00e0ff] to-[#0066ff] text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg hover:scale-105 transition-all"
        >
          Add Money
        </button>
      </form>
      {message && (
        <div className="mt-4 p-3 bg-green-900/50 border border-green-500 rounded-lg">
          <p className="text-green-400">{message}</p>
        </div>
      )}
      {error && (
        <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
};

export default AddMoneyCard; 