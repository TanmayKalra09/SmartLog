import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import React, { useState } from "react";

export default function SignIn() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, skip API call and just navigate
    navigate("/dashboard");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-white">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl border border-violet-300 rounded-2xl p-8 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-violet-700">
              Welcome Back!
            </h1>
            <p className="text-gray-600">
              Please login to continue your reading journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
             
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none bg-gray-50 focus:bg-white"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
             
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none bg-gray-50 focus:bg-white"
                  value={userInfo.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm font-medium text-violet-600 hover:text-violet-800"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg"
            >
              Login
            </button>
          </form>

          <div className="text-center pt-4 border-t border-gray-100">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-violet-600 hover:text-violet-800"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
