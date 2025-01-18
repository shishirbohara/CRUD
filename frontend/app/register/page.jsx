"use client";

import { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Registration() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [togglePassword, setTogglePassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const togglePass = () => {
    setTogglePassword(!togglePassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Error connecting to the server. Please try again.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            User Registration
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type={togglePassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              <button
                className="absolute top-9 right-5"
                type="button"
                onClick={togglePass}
              >
                {togglePassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 transition-colors text-white font-medium"
            >
              Register
            </button>

            {successMessage && (
              <div className="mt-4 text-green-600">{successMessage}</div>
            )}
            {error && <div className="mt-4 text-red-600">{error}</div>}

            <div className="flex justify-between mt-2">
              <p>Already have an account?</p>
              <Link href={"/login"} className="cursor-pointer underline">
                Login here!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
