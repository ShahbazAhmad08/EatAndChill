"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

  const subtotal = getTotalCartAmount();
  const freeThreshold = settings.freeDeliveryThreshold || 499;
  const deliveryFee = subtotal >= freeThreshold || subtotal === 0 ? 0 : settings.deliveryFee || 50;
  const remainingForFree = Math.max(0, freeThreshold - subtotal);
  const total = Math.max(0, subtotal + deliveryFee - discount);

  const handleApplyPromo = async (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (!code) return;

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
    <div className="py-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Title */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-orange-100/60 px-3 py-1 rounded-full">
            Review Order
          </span>
          <h1 className="text-3xl font-black text-gray-900 mt-2">
            Your Food Cart
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Express 30-min delivery prepared fresh in our Delhi kitchen
          </p>
        </div>

        {cartList.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm max-w-md mx-auto my-12">
            <div className="w-20 h-20 mx-auto mb-4 bg-orange-50 rounded-full flex items-center justify-center text-3xl">
              🛒
            </div>
            <h2 className="text-xl font-bold text-gray-900">Your cart is empty</h2>
            <p className="text-xs text-gray-500 mt-1 mb-6">
              Looks like you haven&apos;t added any Delhi rolls, curries or desserts yet.
            </p>
            <Link
              href="/#explore-menu"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-md transition-all"
            >
              <span>Explore Delhi Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Cart Items List */}
            <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
              {/* Free Delivery Progress Bar */}
              <div className="p-3.5 rounded-xl bg-orange-50 border border-orange-200/60">
                {remainingForFree > 0 ? (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-gray-800">
                      <span>Add ₹{remainingForFree} more for FREE Delhi Delivery!</span>
                      <span className="text-brand-600">₹{subtotal} / ₹{freeThreshold}</span>
                    </div>
                    <div className="w-full h-2 bg-orange-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-500 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(100, (subtotal / freeThreshold) * 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Awesome! You unlocked 100% Free Express Delivery across Delhi!</span>
                  </div>
                )}
              </div>

              {/* Items Table */}
              <div className="divide-y divide-gray-100">
                {cartList.map((item) => {
                  const id = item._id || item.id;
                  const qty = cartItems[id];
                  const imgSrc = item.image?.startsWith("http")
                    ? item.image
                    : item.image?.startsWith("/")
                    ? item.image
                    : `/uploads/${item.image}`;

                  return (
                    <div key={id} className="py-4 flex items-center justify-between gap-4">
                      {/* Image & Details */}
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-100">
                          <Image
                            src={imgSrc}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-sm sm:text-base text-gray-900 line-clamp-1">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-400 capitalize">{item.category}</p>
                          <p className="text-xs font-bold text-brand-600 sm:hidden mt-0.5">
                            ₹{item.price} each
                          </p>
                        </div>
                      </div>

                      {/* Quantity & Controls */}
                      <div className="flex items-center gap-4">
                        <span className="hidden sm:inline text-sm font-bold text-gray-700">
                          ₹{item.price}
                        </span>

                        <div className="flex items-center gap-2 border border-gray-200 rounded-full px-2 py-1 bg-gray-50">
                          <button
                            onClick={() => removeFromCart(id)}
                            className="p-1 text-gray-500 hover:text-brand-600 rounded-full"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-5 text-center text-xs font-bold text-gray-900">
                            {qty}
                          </span>
                          <button
                            onClick={() => addToCart(id)}
                            className="p-1 text-gray-500 hover:text-brand-600 rounded-full"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-sm font-black text-gray-900 w-16 text-right">
                          ₹{item.price * qty}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Order Summary & Coupon */}
            <div className="lg:col-span-4 space-y-4">
              {/* Promo Code Box */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 uppercase tracking-wider">
                  <Tag className="w-4 h-4 text-brand-500" />
                  <span>Have a Promo Coupon?</span>
                </div>
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code (e.g. DELHI50)"
                    className="flex-1 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 uppercase font-bold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </form>
                {promoApplied && (
                  <p className="text-[11px] font-semibold text-emerald-600">
                    ✓ {promoApplied}
                  </p>
                )}
              </div>

              {/* Bill Details */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
                <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
                  Bill Summary
                </h2>

                <div className="space-y-2.5 text-xs sm:text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Item Subtotal</span>
                    <span className="font-bold text-gray-900">₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delhi Delivery Fee</span>
                    <span className="font-bold text-gray-900">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-600">FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Promo Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}

                  <hr className="my-2 border-gray-100" />

                  <div className="flex justify-between text-base font-black text-gray-900">
                    <span>Grand Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-black text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Delhi Delivery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-gray-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Safe &amp; Contactless 30-Min Delivery</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

