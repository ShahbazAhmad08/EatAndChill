"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { Plus, Minus, ShoppingBag, Check } from "lucide-react";

export default function DishAddToCart({ foodId, isAvailable = true, price }) {
  const { cartItems, addToCart, removeFromCart } = useStore();
  const count = cartItems[foodId] || 0;

  if (!isAvailable) {
    return (
      <div className="bg-red-50 text-red-700 px-6 py-3.5 rounded-2xl font-bold text-center border border-red-200">
        Sold Out Today — Fresh batch prepares tomorrow at 11 AM
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {count === 0 ? (
        <button
          onClick={() => addToCart(foodId)}
          className="flex-1 bg-brand-500 hover:bg-brand-600 text-white font-extrabold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-brand-500/25 transition-all transform active:scale-95"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Add to Bag — ₹{price}</span>
        </button>
      ) : (
        <div className="flex-1 flex items-center justify-between bg-brand-500 text-white px-6 py-3 rounded-2xl shadow-lg">
          <span className="font-bold text-sm">In your order:</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => removeFromCart(foodId)}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center font-bold text-lg transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-extrabold text-lg">{count}</span>
            <button
              onClick={() => addToCart(foodId)}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center font-bold text-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

