"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { Plus, Minus, Star, Flame, Sparkles, AlertCircle, ShoppingBag } from "lucide-react";

export default function FoodDisplay() {
  const {
    food_list,
    isLoading,
    category,
    searchQuery,
    cartItems,
    addToCart,
    removeFromCart,
    filterVeg,
    setFilterVeg,
  } = useStore();

  const filteredFoods = food_list.filter((item) => {
    // 1. Category Filter
    if (category !== "All") {
      if (category === "Delhi Specials") {
        if (!item.isDelhiSpecial) return false;
      } else if (item.category !== category) {
        return false;
      }
    }

    // 2. Veg / Non-Veg filter
    if (filterVeg === "veg" && !item.isVeg) return false;
    if (filterVeg === "delhi" && !item.isDelhiSpecial) return false;

    // 3. Search query filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchName = item.name?.toLowerCase().includes(q);
      const matchDesc = item.description?.toLowerCase().includes(q);
      const matchCat = item.category?.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat) return false;
    }

    return true;
  });

  return (
    <section className="py-14 bg-slate-50/70" id="food-display">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header & Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight flex items-center gap-2.5">
              <span>Top Dishes in Delhi NCR</span>
              {category !== "All" && (
                <span className="text-xs font-bold px-3 py-1 bg-gradient-to-r from-brand-500 to-orange-500 text-white rounded-full shadow-xs">
                  {category}
                </span>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
              Showing {filteredFoods.length} fresh culinary preparations across Delhi
            </p>
          </div>

          {/* Quick Dietary Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setFilterVeg("all")}
              className={`px-3.5 py-2 text-xs font-bold rounded-full transition-all active:scale-95 ${
                filterVeg === "all"
                  ? "bg-gray-950 text-white shadow-md shadow-gray-900/20"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setFilterVeg("veg")}
              className={`px-3.5 py-2 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 active:scale-95 ${
                filterVeg === "veg"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Pure Veg
            </button>
            <button
              onClick={() => setFilterVeg("delhi")}
              className={`px-3.5 py-2 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 active:scale-95 ${
                filterVeg === "delhi"
                  ? "bg-gradient-to-r from-brand-500 to-orange-500 text-white shadow-md shadow-orange-500/25"
                  : "bg-white text-brand-700 border border-orange-200 hover:bg-orange-50"
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-brand-500 fill-brand-500" />
              Delhi Specials
            </button>
          </div>
        </div>

        {/* Loading Skeletons */}
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
                  <div className="h-3 w-2/3 rounded-md shimmer" />
                </div>
                <div className="pt-2 flex justify-between items-center">
                  <div className="h-5 w-16 rounded-md shimmer" />
                  <div className="h-8 w-20 rounded-full shimmer" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredFoods.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center text-3xl">
              🍲
            </div>
            <h3 className="text-lg font-bold text-gray-900">No dishes found</h3>
            <p className="text-xs text-gray-500 mt-1">
              Try adjusting your search query or selecting &quot;All&quot; categories to see our complete menu.
            </p>
          </div>
        ) : (
          /* Food Grid with Staggered Entrance */
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.05 },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredFoods.map((food) => {
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
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col group ${
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
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>

                    {/* Sold Out Overlay if unavailable */}
                    {!isAvailable && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-4">
                        <span className="px-4 py-1.5 bg-red-600 text-white text-xs font-black uppercase tracking-wider rounded-full shadow-xl">
                          Sold Out Today
                        </span>
                      </div>
                    )}

                    {/* Badge: Delhi Special */}
                    {isAvailable && food.isDelhiSpecial && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-brand-600 to-orange-600 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                        <Flame className="w-3 h-3 fill-white" />
                        <span>Delhi Special</span>
                      </div>
                    )}

                    {/* Badge: Veg indicator */}
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

                    {/* Floating Add to Cart Pill Button */}
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

                  {/* Food Info */}
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
    </section>
  );
}
