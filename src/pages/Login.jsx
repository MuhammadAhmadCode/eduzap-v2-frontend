import { api, endpoints } from "../api/api";
import { motion } from "motion/react";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import LogoIcon from "../assets/LogoIcon";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(endpoints.auth.login, { email, password });
      setUser(res.data);
      navigate("/");
    } catch (error) {
      const errorMessage = error.response.data.message;
      console.log(errorMessage);
      setStatus(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.12),transparent_30%)] pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-xl rounded-4xl border border-white/10 bg-black/50 backdrop-blur-xl shadow-2xl p-8 md:p-10 overflow-hidden"
      >
        <div className="flex flex-col items-center gap-4 mb-8 text-center">
          <div className="flex items-center gap-3 justify-center">
            <LogoIcon width={42} height={42} />
            <div className="text-white text-2xl font-semibold tracking-tight">
              Sign In
            </div>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Secure access to your study workspace. Login to continue managing
            tasks and notes in one place.
          </p>
        </div>

        {status && (
          <div className="mb-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-200">
            {status}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@eduzap.com"
              className="w-full rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:brightness-105"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-emerald-300 hover:text-emerald-200"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
