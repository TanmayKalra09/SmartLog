import React, { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Password match check
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Directly navigate without authentication
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-violet-700 text-center">
          Create Account
        </h2>
        <br />

        {error && (
          <p className="mb-4 text-red-500 text-sm text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
            <User className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full outline-none bg-transparent text-gray-700"
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
            <Mail className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full outline-none bg-transparent text-gray-700"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
            <Lock className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full outline-none bg-transparent text-gray-700"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="ml-2 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-gray-500" />
              ) : (
                <Eye className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
            <Lock className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full outline-none bg-transparent text-gray-700"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="ml-2 focus:outline-none"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5 text-gray-500" />
              ) : (
                <Eye className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm font-medium text-violet-600 hover:text-violet-800"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-violet-600 hover:text-violet-800"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
