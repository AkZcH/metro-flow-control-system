import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/auth/login",
        { email, password },
        { withCredentials: true } // for cookies
      );
      if (res.status === 200) {
        navigate("/portal"); // redirect to user dashboard
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1c1c1c] text-white">
      <form
        onSubmit={handleLogin}
        className="bg-[#2b2b2b] p-8 rounded-xl w-full max-w-md shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-bold">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 rounded bg-[#333] border border-gray-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 rounded bg-[#333] border border-gray-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-2 rounded bg-gradient-to-r from-[#00e0ff] to-[#0066ff] font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login; 