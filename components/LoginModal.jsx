"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import toast from "react-hot-toast";
import { X, Lock, Mail, User, ArrowRight } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-600 to-amber-600 p-6 text-white relative">
          <button
            onClick={toggleLoginPopup}
            className="absolute top-4 right-4 p-1 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-xs uppercase tracking-wider font-semibold text-orange-200">
            Eat &amp; Chill Delhi
          </span>
          <h2 className="text-2xl font-black mt-1">
            {isLoginState ? "Welcome Back, Foodie!" : "Create an Account"}
          </h2>
          <p className="text-xs text-orange-100 mt-1">
            {isLoginState
              ? "Sign in to track orders & enjoy 30-min Delhi food delivery"
              : "Join Delhi's favorite food community for exclusive discounts"}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!isLoginState && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                required
                placeholder="foodie@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="password"
                required
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 text-xs text-gray-600">
            <input type="checkbox" required id="terms" className="rounded text-brand-600 focus:ring-brand-500" />
            <label htmlFor="terms">
              I agree to the Terms of Service &amp; Delhi Food Safety Policy
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <span>Please wait...</span>
            ) : (
              <>
                <span>{isLoginState ? "Sign In" : "Create Account"}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Toggle between Login and Register */}
          <div className="text-center pt-2 text-xs text-gray-600">
            {isLoginState ? (
              <p>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLoginState(false)}
                  className="text-brand-600 font-bold hover:underline"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLoginState(true)}
                  className="text-brand-600 font-bold hover:underline"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

