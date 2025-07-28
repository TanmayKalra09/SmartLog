import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 px-6 py-12 text-white">
      <div className="w-full max-w-sm bg-slate-800 p-8 rounded-xl shadow-2xl border border-purple-500/30 space-y-6">
        <h2 className="text-2xl font-bold text-center">Login to SmartLog</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 text-white rounded-md outline-none border border-slate-600 focus:border-purple-500 transition duration-200"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 text-white rounded-md outline-none border border-slate-600 focus:border-pink-500 transition duration-200"
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white rounded-md font-semibold hover:scale-[1.02] hover:shadow-md transition-transform duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
}
