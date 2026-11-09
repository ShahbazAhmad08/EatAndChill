"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import {
  Search,
  Plus,
  Minus,
  Star,
  Flame,
  Sparkles,
  Filter,
  ArrowUpDown,
  UtensilsCrossed,
  SlidersHorizontal,
} from "lucide-react";
import { menu_categories } from "@/components/ExploreMenu";

function MenuContent() {
  const {
    food_list,
    isLoading,
    category,
    setCategory,
    searchQuery,
    setSearchQuery,
    cartItems,
    addToCart,
    removeFromCart,
    filterVeg,
    setFilterVeg,
  } = useStore();

  const [sortBy, setSortBy] = useState("recommended"); // 'recommended', 'price-low', 'price-high', 'rating'

  // Filter foods
  let filtered = food_list.filter((item) => {
    // 1. Category Filter
    if (category !== "All") {
      if (category === "Delhi Specials") {
        if (!item.isDelhiSpecial) return false;
      } else if (item.category !== category) {
        return false;
      }
    }

    // 2. Veg / Non-Veg Filter
    if (filterVeg === "veg" && !item.isVeg) return false;
    if (filterVeg === "delhi" && !item.isDelhiSpecial) return false;

    // 3. Search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchName = item.name?.toLowerCase().includes(q);
      const matchDesc = item.description?.toLowerCase().includes(q);
      const matchCat = item.category?.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat) return false;
    }

    return true;
  });

  // Sort foods
  if (sortBy === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filtered.sort((a, b) => (b.rating || 4.8) - (a.rating || 4.8));
  }

  return (
    <div className="py-10 bg-slate-50/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-brand-600 bg-orange-100/70 px-4 py-1.5 rounded-full border border-orange-200">
            Delhi NCR Cloud Menu
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight">
            Our Complete Culinary Menu
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Explore 24+ mouth-watering dishes crafted with authentic spices, fresh ingredients, and rapid 30-minute delivery.
          </p>
        </div>

        {/* Filter & Search Control Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-card border border-gray-100 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search dish by name, ingredients, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Dietary Pills & Sort Dropdown */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setFilterVeg("all")}
                className={`px-3.5 py-2 text-xs font-bold rounded-2xl transition-all ${
                  filterVeg === "all"
                    ? "bg-gray-950 text-white shadow-md shadow-gray-950/20"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Diets
              </button>
              <button
                onClick={() => setFilterVeg("veg")}
                className={`px-3.5 py-2 text-xs font-bold rounded-2xl transition-all flex items-center gap-1.5 ${
                  filterVeg === "veg"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                    : "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Pure Veg
              </button>
              <button
                onClick={() => setFilterVeg("delhi")}
                className={`px-3.5 py-2 text-xs font-bold rounded-2xl transition-all flex items-center gap-1.5 ${
                  filterVeg === "delhi"
                    ? "bg-gradient-to-r from-brand-500 to-orange-500 text-white shadow-md shadow-brand-500/25"
                    : "bg-orange-50 text-brand-700 border border-orange-200 hover:bg-orange-100"
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-brand-500 fill-brand-500" />
                Delhi Specials
              </button>

              {/* Sort selector */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-100 text-gray-800 text-xs font-bold px-3.5 py-2 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
                >
                  <option value="recommended">Sort: Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated (★ 4.8+)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Horizontal Pills */}
          <div className="pt-2 border-t border-gray-100 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {menu_categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setCategory(cat.name)}
                className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                  category === cat.name
                    ? "bg-gradient-to-r from-brand-500 to-orange-500 text-white shadow-md shadow-brand-500/20"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200/60"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-bold text-gray-500 px-1">
          <span>Showing {filtered.length} culinary preparations</span>
          {category !== "All" && (
            <button
              onClick={() => {
                setCategory("All");
                setFilterVeg("all");
                setSearchQuery("");
              }}
              className="text-brand-600 hover:underline"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Dishes Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div
                key={n}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm p-4 space-y-4"
              >
                <div className="w-full h-44 rounded-2xl shimmer" />
                <div className="space-y-2">
                  <div className="h-4 w-3/4 rounded-md shimmer" />
                  <div className="h-3 w-full rounded-md shimmer" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-card max-w-md mx-auto my-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center text-3xl">
              🍲
            </div>
            <h3 className="text-lg font-black text-gray-950">No dishes found</h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">
              Try searching for another dish or clearing your active filters.
            </p>
            <button
              onClick={() => {
                setCategory("All");
                setFilterVeg("all");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 rounded-xl bg-brand-500 text-white font-bold text-xs"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.04 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((food) => {
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
                  {/* Image Container */}
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
                    {isAvailable && food.isDelhiSpecial && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-brand-600 to-orange-600 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                        <Flame className="w-3 h-3 fill-white" />
                        <span>Delhi Special</span>
                      </div>
                    )}

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
                          <span>{food.rating || "4.8"}</span>
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

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-sm text-gray-500 font-bold">Loading Eat &amp; Chill Delhi Menu...</p>
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}

