"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import toast from "react-hot-toast";
import { X, Lock, Mail, User, ArrowRight, Sparkles } from "lucide-react";

export default function LoginModal() {
  const { loginPopup, toggleLoginPopup, setToken, setUser, setCartItems } = useStore();
  const [isLoginState, setIsLoginState] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  if (!loginPopup) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLoginState ? "/api/user/login" : "/api/user/register";
      const payload = isLoginState
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId || (data.user && data.user.id));
        if (data.user) {
          localStorage.setItem("userName", data.user.name);
          setUser(data.user);
        }

        toast.success(isLoginState ? "Welcome back!" : "Account created successfully!");
        toggleLoginPopup();

        // Refresh user cart
        const cartRes = await fetch("/api/cart/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: data.token,
          },
        });
        const cartData = await cartRes.json();
        if (cartData.success && cartData.cartData) {
          setCartItems(cartData.cartData);
        }
      } else {
        toast.error(data.message || "Authentication failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-600 via-orange-600 to-amber-600 p-7 text-white relative">
          <button
            onClick={toggleLoginPopup}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-[10px] uppercase tracking-widest font-black text-orange-200 bg-white/10 px-2.5 py-0.5 rounded-full">
            Eat &amp; Chill Delhi
          </span>
          <h2 className="text-2xl font-black mt-2 tracking-tight">
            {isLoginState ? "Welcome Back, Foodie!" : "Join Delhi's Foodies"}
          </h2>
          <p className="text-xs text-orange-100 mt-1">
            {isLoginState
              ? "Sign in to track live orders & enjoy 30-min express delivery"
              : "Create your account for special Delhi coupons & instant checkout"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-100 bg-gray-50/50">
          <button
            type="button"
            onClick={() => setIsLoginState(true)}
            className={`flex-1 py-3 text-xs font-black transition-colors ${
              isLoginState
                ? "text-brand-600 border-b-2 border-brand-500 bg-white"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsLoginState(false)}
            className={`flex-1 py-3 text-xs font-black transition-colors ${
              !isLoginState
                ? "text-brand-600 border-b-2 border-brand-500 bg-white"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!isLoginState && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Your Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="foodie@example.com"
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                required
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-500 to-orange-500 hover:from-brand-600 hover:to-orange-600 text-white font-black text-xs shadow-lg shadow-brand-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{isLoginState ? "Sign In to Eat & Chill" : "Complete Registration"}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-[11px] text-gray-500 text-center pt-2">
            By signing in, you agree to Eat &amp; Chill&apos;s Terms of Service and Privacy Policy.
          </p>
        </form>
      </motion.div>
    </div>
  );
}
