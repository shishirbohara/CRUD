"use client";
import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            User Login
          </h1>
          <form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm "
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm "
              />
            </div>

            <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-800 transition-colors text-white font-medium rounded-md shadow-sm">
              Login
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-green-500 hover:text-green-800 font-medium"
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
