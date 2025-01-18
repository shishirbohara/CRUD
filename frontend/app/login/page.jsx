"use client";
import { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [togglePassword, setTogglePassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMsg(data.message);
      } else {
        setErrorMsg(data.error);
      }
    } catch (error) {
      setErrorMsg("Error connecting to the server. Please try again");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            User Login
          </h1>
          <form onSubmit={handleSubmit}>
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm "
              />
              <button
                className="absolute top-10 right-5"
                type="button"
                onClick={togglePass}
              >
                {togglePassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-500 hover:bg-green-800 transition-colors text-white font-medium rounded-md shadow-sm"
            >
              Login
            </button>
            {successMsg && (
              <div className="mt-4 text-green-600">{successMsg}</div>
            )}

            {errorMsg && <div className="mt-5 text-red-600">{errorMsg}</div>}
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-green-500 hover:text-green-800 font-medium"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
