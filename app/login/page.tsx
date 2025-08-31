﻿'use client';
import Link from 'next/link';
import React, { useState } from 'react';

export async function  sendRequest(method : string, url: string, body: any) {
  const response =  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const parsedResponse = await response.json();
  return parsedResponse;
}

const LoginForm = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('http://localhost:8000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userId, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.detail || 'Login failed');
    } else {
      const data = await res.json();
      alert('✅ Login successful!');
      console.log('User ID:', data.user_id);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Pane */}
      <div className="flex-1 bg-gradient-to-br from-[#311944] to-[#10b981] flex items-center justify-center">
        {/* Logo or graphic */}
      </div>

      {/* Right Pane */}
      <div className="flex-1 bg-white p-20 flex flex-col justify-center shadow-md rounded-md relative z-10">
        <h1 className="text-4xl font-extrabold text-[#10b981] mb-6">
          Real Estate Agent: Shop1
        </h1>

        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          <div>
            <label htmlFor="userId" className="text-xs text-gray-800 mb-1 block">
              User ID
            </label>
            <input
              type="text"
              id="userId" 
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="username"
              className="h-12 px-3 border border-gray-300 rounded-md w-full"
              required 
              placeholder="JohnDoe123"
              className="h-12 px-3 border border-gray-300 rounded-md text-base" 
            />
          </div>

          <div>
            <label htmlFor="password" className="text-xs text-gray-800 mb-1 block">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="h-12 px-3 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm font-poppins">
            <label className="flex items-center gap-2 text-gray-800">
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#" className="text-[#10b981] hover:underline">
              Forgot Password?
            </a>
          </div> 
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="h-12 bg-[#10b981] text-white rounded-md font-semibold hover:bg-[#059669] transition-colors"
          >
            Login
          </button>

          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#10b981] hover:text-[#059669] transition-colors">Sign Up</Link>
          </p> 
          
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
