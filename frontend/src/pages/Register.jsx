// src/pages/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg("");
    
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", 
        { email, password, firstname, lastname },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      setMsg("Registration successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Registration error:", err);
      setMsg(err.response?.data?.message || "Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1c1c1c] text-white">
      <form
        onSubmit={handleRegister}
        className="bg-[#2b2b2b] p-8 rounded-xl w-full max-w-md shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-bold">Register</h2>
        {msg && (
          <p className={`text-sm ${msg.includes("successful") ? "text-green-400" : "text-yellow-400"}`}>
            {msg}
          </p>
        )}
        <input
          type="text"
          placeholder="First Name"
          className="w-full px-4 py-2 rounded bg-[#333] border border-gray-600"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
          disabled={isLoading}
        />
        <input
          type="text"
          placeholder="Last Name (optional)"
          className="w-full px-4 py-2 rounded bg-[#333] border border-gray-600"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          disabled={isLoading}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 rounded bg-[#333] border border-gray-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-4 py-2 rounded bg-[#333] border border-gray-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button
          type="submit"
          className={`w-full py-2 rounded bg-gradient-to-r from-[#00e0ff] to-[#0066ff] font-semibold ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
