"use client";
import Link from "next/link";
import { useState } from "react";

export default function RegisterForm() {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!userId || !password || !email) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      alert("Registration successful!");
    } catch (err) {
      setError(err.message);
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
        <h1 className="text-4xl font-extrabold text-[#10b981] mb-6">Create an account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="userId" className="text-xs text-gray-800 mb-1 block">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Ex. abc123"
              className="h-12 px-3 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="text-xs text-gray-800 mb-1 block">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex. abc@xyz.com"
              className="h-12 px-3 border border-gray-300 rounded-md w-full"
              required
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

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full h-12 bg-[#10b981] text-white py-2 rounded-md hover:bg-[#059669] transition-colors">
            Sign Up
          </button>
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

{
  /* <form onSubmit={handleSubmit} className="space-y-4">
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

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">
                Sign Up
                </button>
                <p className="text-center text-sm mt-4">
                Already have an account?{" "}
                <Link href="/login" className="text-green-600 hover:underline">
                    Login
                </Link>
                </p>
            </form> */
}
