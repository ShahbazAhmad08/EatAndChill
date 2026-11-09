"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import toast from "react-hot-toast";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Tag,
  ShieldCheck,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export default function CartPage() {
  const {
    cartItems,
    food_list,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getDeliveryFee,
    settings,
    token,
    toggleLoginPopup,
  } = useStore();

  const router = useRouter();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState("");
  const [validating, setValidating] = useState(false);

  const subtotal = getTotalCartAmount();
  const freeThreshold = settings.freeDeliveryThreshold || 499;
  const deliveryFee = subtotal >= freeThreshold || subtotal === 0 ? 0 : settings.deliveryFee || 50;
  const remainingForFree = Math.max(0, freeThreshold - subtotal);
  const total = Math.max(0, subtotal + deliveryFee - discount);

  const handleApplyPromo = async (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (!code) return;

    setValidating(true);
    try {
      const res = await fetch("/api/coupon/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, subtotal }),
      });

      const data = await res.json();
      if (data.success) {
        setDiscount(data.discount);
        setPromoApplied(`${data.coupon.code} (₹${data.discount} OFF)`);
        toast.success(data.message || "Coupon applied successfully!");
      } else {
        toast.error(data.message || "Invalid coupon code");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error validating coupon");
    } finally {
      setValidating(false);
    }
  };

  const handleCheckout = () => {
    if (!token) {
      toast.error("Please sign in to place your Delhi delivery order");
      toggleLoginPopup();
      return;
    }
    router.push("/place-order");
  };

  // Filter items in cart
  const cartList = food_list.filter((item) => {
    const id = item._id || item.id;
    return cartItems[id] && cartItems[id] > 0;
  });

  return (
    <div className="py-12 bg-slate-50/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-8">
          <span className="text-xs font-black uppercase tracking-widest text-brand-600 bg-orange-100/70 px-3.5 py-1 rounded-full border border-orange-200">
            Review Order
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-950 mt-2 tracking-tight">
            Your Food Cart
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 font-medium">
            Express 30-min delivery prepared fresh in our Delhi cloud kitchen
          </p>
        </div>

        {cartList.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-card max-w-md mx-auto my-12"
          >
            <div className="w-20 h-20 mx-auto mb-4 bg-orange-50 rounded-full flex items-center justify-center text-4xl shadow-inner">
              🛒
            </div>
            <h2 className="text-xl font-black text-gray-950">Your cart is empty</h2>
            <p className="text-xs text-gray-500 mt-1 mb-6">
              Looks like you haven&apos;t added any Delhi rolls, curries or desserts yet.
            </p>
            <Link
              href="/#explore-menu"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-brand-500 to-orange-500 hover:from-brand-600 hover:to-orange-600 text-white font-black text-xs shadow-lg shadow-brand-500/25 transition-all"
            >
              <span>Explore Delhi Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Cart Items List */}
            <div className="lg:col-span-8 bg-white rounded-3xl shadow-card border border-gray-100 p-6 sm:p-8 space-y-5">
              {/* Free Delivery Progress Bar */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/60 shadow-2xs">
                {remainingForFree > 0 ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-black text-gray-900">
                      <span>Add ₹{remainingForFree} more for 100% FREE Delhi Delivery!</span>
                      <span className="text-brand-600">₹{subtotal} / ₹{freeThreshold}</span>
                    </div>
                    <div className="w-full h-2.5 bg-orange-200/60 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min(100, (subtotal / freeThreshold) * 100)}%`,
                        }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-brand-500 to-orange-500 rounded-full"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-800">
                    <Sparkles className="w-4 h-4 text-emerald-600 animate-spin-slow" />
                    <span>Awesome! You unlocked 100% Free Express Delivery across Delhi!</span>
                  </div>
                )}
              </div>

              {/* Items Table */}
              <div className="divide-y divide-gray-100">
                <AnimatePresence>
                  {cartList.map((item) => {
                    const id = item._id || item.id;
                    const qty = cartItems[id];
                    const imgSrc = item.image?.startsWith("http")
                      ? item.image
                      : item.image?.startsWith("/")
                      ? item.image
                      : `/uploads/${item.image}`;

                    return (
                      <motion.div
                        key={id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="py-4 flex items-center justify-between gap-4"
                      >
                        {/* Image & Details */}
                        <div className="flex items-center gap-3.5">
                          <div className="relative w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden shrink-0 border border-gray-100 shadow-2xs">
                            <Image
                              src={imgSrc}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-black text-sm sm:text-base text-gray-950 line-clamp-1">
                              {item.name}
                            </h3>
                            <p className="text-xs text-gray-400 font-semibold capitalize">
                              {item.category}
                            </p>
                            <p className="text-xs font-black text-brand-600 sm:hidden mt-0.5">
                              ₹{item.price} each
                            </p>
                          </div>
                        </div>

                        {/* Quantity & Controls */}
                        <div className="flex items-center gap-4">
                          <span className="hidden sm:inline text-sm font-extrabold text-gray-800">
                            ₹{item.price}
                          </span>

                          <div className="flex items-center gap-2.5 border border-gray-200 rounded-full px-2.5 py-1 bg-gray-50/80 shadow-2xs">
                            <button
                              onClick={() => removeFromCart(id)}
                              className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-brand-600 rounded-full hover:bg-white transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-5 text-center text-xs font-black text-gray-950">
                              {qty}
                            </span>
                            <button
                              onClick={() => addToCart(id)}
                              className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-brand-600 rounded-full hover:bg-white transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="text-sm font-black text-gray-950 w-16 text-right">
                            ₹{item.price * qty}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Right: Order Summary & Coupon */}
            <div className="lg:col-span-4 space-y-5">
              {/* Promo Code Box */}
              <div className="bg-white rounded-3xl p-6 shadow-card border border-gray-100 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-black text-gray-900 uppercase tracking-wider">
                  <Tag className="w-4 h-4 text-brand-500" />
                  <span>Have a Promo Coupon?</span>
                </div>
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="e.g. DELHI100"
                    className="flex-1 px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 uppercase font-black tracking-wider"
                  />
                  <button
                    type="submit"
                    disabled={validating}
                    className="px-5 py-2.5 bg-gray-950 hover:bg-black text-white text-xs font-black rounded-xl transition-all active:scale-95 disabled:opacity-50"
                  >
                    {validating ? "..." : "Apply"}
                  </button>
                </form>
                {promoApplied && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>✓ {promoApplied}</span>
                  </motion.div>
                )}
              </div>

              {/* Bill Details */}
              <div className="bg-white rounded-3xl p-6 shadow-card border border-gray-100 space-y-4">
                <h2 className="text-base font-black text-gray-950 border-b border-gray-100 pb-3">
                  Bill Summary
                </h2>

                <div className="space-y-3 text-xs sm:text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Item Subtotal</span>
                    <span className="font-black text-gray-950">₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delhi Express Delivery</span>
                    <span className="font-black text-gray-950">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-600 font-extrabold">FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-black">
                      <span>Promo Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}

                  <hr className="my-2 border-gray-100" />

                  <div className="flex justify-between text-base font-black text-gray-950">
                    <span>Grand Total</span>
                    <span className="text-xl text-brand-600">₹{total}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-brand-500 to-orange-500 hover:from-brand-600 hover:to-orange-600 text-white font-black text-sm shadow-xl shadow-brand-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Delhi Delivery</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-gray-400 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>100% Contactless &amp; Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
