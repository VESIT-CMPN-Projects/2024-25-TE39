

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { Mail, Lock } from 'lucide-react'; // Assuming you're using lucide-react for icons
import Header from "@/components/Header";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/signin', { email, password });
      const { token, farmer } = response.data;

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', token);
      localStorage.setItem('farmerData', JSON.stringify(farmer));

      navigate('/dashboard');
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* <Header /> */}

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-6 pt-32 md:pt-6">
          <div className="w-full max-w-md">
            <form onSubmit={handleLogin} className="space-y-6 p-8 bg-white shadow-lg rounded-lg animate-fadeIn">
              {error && <p className="text-red-500 text-sm animate-shake">{error}</p>}
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Sign In
              </Button>
            </form>
          </div>
        </div>

        {/* Right side - Image/Illustration */}
        <div className="flex-1 relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="text-center max-w-md animate-fadeIn">
                <h2 className="text-3xl font-bold tracking-tight mb-4 text-gray-800">
                  Welcome Back to AgriVision
                </h2>
                <p className="text-gray-600">
                  Log in to access personalized crop recommendations, weather insights, and market analysis for your farm.
                </p>
                <div className="mt-8 flex justify-center">
                  <div className="h-48 w-48 relative">
                    <div className="absolute inset-0 rounded-full bg-blue-200 animate-float [animation-delay:200ms]"></div>
                    <div className="absolute inset-4 rounded-full bg-blue-300 animate-float"></div>
                    <div className="absolute inset-8 rounded-full bg-blue-400 animate-float [animation-delay:400ms]"></div>
                    <div className="absolute inset-12 rounded-full bg-blue-500 animate-float [animation-delay:300ms]"></div>
                    <div className="absolute inset-16 rounded-full bg-blue-600"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
