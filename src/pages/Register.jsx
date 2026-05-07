import { api, endpoints } from "../api/api";
import { motion } from "motion/react";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import LogoIcon from "../assets/LogoIcon";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const MotionForm = motion.form;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(endpoints.auth.register, { fullName, email, password });
      setUser(res.data);
      navigate("/");
    } catch (err) {
      console.error(err);
      setStatus("Unable to register. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-10">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at top left, rgba(34,197,94,0.12), transparent 25%), radial-gradient(circle at bottom right, rgba(37,99,235,0.10), transparent 30%)",
        }}
      />
      <MotionForm
        onSubmit={handleSubmit}
        whileHover={{ y: -4 }}
        className="relative w-full max-w-xl rounded-4xl border border-white/10 bg-black/50 backdrop-blur-xl shadow-2xl p-8 md:p-10 overflow-hidden"
      >
        <div className="flex flex-col items-center gap-3 mb-8 text-center">
          <div className="flex items-center gap-3 justify-center">
            <LogoIcon width={42} height={42} />
            <div className="text-white text-2xl font-semibold tracking-tight">Create Account</div>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Join EduZap and organize your tasks, notes, and study flow in one modern workspace.
          </p>
        </div>

        {status && (
          <div className="mb-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-200">
            {status}
          </div>
        )}

        <div className="grid gap-5">
          <label className="grid gap-2 text-sm text-slate-300">
            <span>Full Name</span>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your Full Name"
              type="text"
              className="rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
              required
            />
          </label>

          <label className="grid gap-2 text-sm text-slate-300">
            <span>Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@eduzap.com"
              type="email"
              className="rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
              required
            />
          </label>

          <label className="grid gap-2 text-sm text-slate-300">
            <span>Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              type="password"
              className="rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
              required
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:brightness-105"
        >
          Register
        </button>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link className="font-semibold text-emerald-300 hover:text-emerald-200" to="/login">
            Sign In
          </Link>
        </p>
      </MotionForm>
    </div>
  );
};

export default Register;
