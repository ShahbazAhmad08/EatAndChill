"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import {
  Flame,
  Star,
  Plus,
  Minus,
  Sparkles,
  ShieldCheck,
  Clock,
  MapPin,
  Award,
  ArrowRight,
} from "lucide-react";

function DelhiSpecialsContent() {
  const { food_list, isLoading, cartItems, addToCart, removeFromCart } = useStore();
  const [filterVegOnly, setFilterVegOnly] = useState(false);

  // Filter only Delhi Specials
  let delhiFoods = food_list.filter((f) => f.isDelhiSpecial);
  if (filterVegOnly) {
    delhiFoods = delhiFoods.filter((f) => f.isVeg);
  }

  return (
    <div className="py-12 bg-slate-50/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Hero Header */}
        <div className="relative rounded-3xl bg-gradient-to-r from-brand-600 via-orange-600 to-amber-600 p-8 sm:p-14 text-white overflow-hidden shadow-xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider text-orange-100">
              <Flame className="w-4 h-4 fill-white" />
              Dilli 6 Heritage Recipes
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Authentic Delhi Specials
            </h1>
            <p className="text-sm sm:text-base text-orange-100 leading-relaxed font-medium">
              Centuries of culinary heritage from Chandni Chowk, Karol Bagh and Jama Masjid. Prepared with farm-fresh dairy, slow charcoal simmering, and 100% Khari Baoli hand-ground spices.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3 text-xs font-bold text-white/90">
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-xl border border-white/20">
                <Clock className="w-4 h-4 text-amber-300" />
                30-Min Fast Dispatch
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-xl border border-white/20">
                <Award className="w-4 h-4 text-amber-300" />
                Pure Desi Ghee
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-xl border border-white/20">
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                Tamper-Proof Hot Seal
              </span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-3xl shadow-card border border-gray-100">
          <div>
            <h2 className="text-xl font-black text-gray-950">
              Dilli Signature Preparations
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              Showing {delhiFoods.length} iconic preparations loved by over 50,000 Delhi foodies
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterVegOnly(false)}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all ${
                !filterVegOnly
                  ? "bg-gray-950 text-white shadow-md shadow-gray-900/20"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Delhi Specials
            </button>
            <button
              onClick={() => setFilterVegOnly(true)}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 ${
                filterVegOnly
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Pure Veg Specials
            </button>
          </div>
        </div>

        {/* Dishes Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm p-4 space-y-4"
              >
                <div className="w-full h-44 rounded-2xl shimmer" />
                <div className="h-4 w-3/4 rounded-md shimmer" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.05 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {delhiFoods.map((food) => {
              const itemId = food._id || food.id;
              const count = cartItems[itemId] || 0;
              const isAvailable = food.available !== false;
              const imgSrc = food.image?.startsWith("http")
                ? food.image
                : food.image?.startsWith("/")
                ? food.image
                : `/uploads/${food.image}`;

              return (
                <motion.div
                  key={itemId}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    show: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-card hover:shadow-card-hover transition-all flex flex-col group ${
                    !isAvailable ? "opacity-75" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="relative w-full h-52 bg-gray-100 overflow-hidden">
                    <Link href={`/dish/${itemId}`} className="block w-full h-full">
                      <Image
                        src={imgSrc}
                        alt={food.name}
                        fill
                        className={`object-cover transition-transform duration-500 ${
                          !isAvailable ? "grayscale contrast-125" : "group-hover:scale-108"
                        }`}
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>

                    {/* Sold out overlay */}
                    {!isAvailable && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-4">
                        <span className="px-4 py-1.5 bg-red-600 text-white text-xs font-black uppercase tracking-wider rounded-full shadow-xl">
                          Sold Out Today
                        </span>
                      </div>
                    )}

                    {/* Delhi Special Badge */}
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-brand-600 to-orange-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                      <Flame className="w-3 h-3 fill-white" />
                      <span>Delhi Special</span>
                    </div>

                    {/* Veg Indicator */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md p-1.5 rounded-xl shadow-md">
                      <div
                        className={`w-3.5 h-3.5 border-2 flex items-center justify-center rounded-sm ${
                          food.isVeg ? "border-emerald-600" : "border-red-600"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            food.isVeg ? "bg-emerald-600" : "bg-red-600"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Add to Cart Floating Button */}
                    <div className="absolute bottom-3 right-3">
                      {!isAvailable ? (
                        <span className="px-3 py-1.5 rounded-full bg-gray-900/80 backdrop-blur-md text-gray-200 text-xs font-bold shadow-md">
                          Unavailable
                        </span>
                      ) : count === 0 ? (
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => addToCart(itemId)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-brand-500 hover:text-white text-gray-900 font-extrabold text-xs shadow-lg border border-gray-100 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5 text-brand-600 group-hover:text-white" />
                          <span>ADD</span>
                        </motion.button>
                      ) : (
                        <motion.div
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-brand-500 to-orange-500 text-white shadow-xl text-xs font-black"
                        >
                          <button
                            onClick={() => removeFromCart(itemId)}
                            className="w-5 h-5 flex items-center justify-center hover:bg-black/20 rounded-full transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-4 text-center font-black">{count}</span>
                          <button
                            onClick={() => addToCart(itemId)}
                            className="w-5 h-5 flex items-center justify-center hover:bg-black/20 rounded-full transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Food Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <Link
                          href={`/dish/${itemId}`}
                          className="font-black text-base text-gray-950 group-hover:text-brand-600 transition-colors line-clamp-1"
                        >
                          {food.name}
                        </Link>
                        <div className="flex items-center gap-1 text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg shrink-0 border border-amber-100">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{food.rating || "4.9"}</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-normal">
                        {food.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        {food.category}
                      </span>
                      <span className="text-xl font-black text-gray-950">
                        ₹{food.price}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function DelhiSpecialsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-sm text-gray-500 font-bold">Loading Delhi Specials...</p>
        </div>
      }
    >
      <DelhiSpecialsContent />
    </Suspense>
  );
}

