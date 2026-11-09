"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { Plus, Minus, Star, Flame, Sparkles, AlertCircle } from "lucide-react";

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
    <section className="py-12 bg-gray-50/60" id="food-display">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header & Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <span>Top Dishes in Delhi NCR</span>
              {category !== "All" && (
                <span className="text-sm font-semibold px-3 py-1 bg-orange-100 text-brand-700 rounded-full">
                  {category}
                </span>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Showing {filteredFoods.length} fresh culinary preparations
            </p>
          </div>

          {/* Quick Dietary Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setFilterVeg("all")}
              className={`px-3 py-1.5 text-xs font-bold rounded-full transition-colors ${
                filterVeg === "all"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setFilterVeg("veg")}
              className={`px-3 py-1.5 text-xs font-bold rounded-full transition-colors flex items-center gap-1.5 ${
                filterVeg === "veg"
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Pure Veg
            </button>
            <button
              onClick={() => setFilterVeg("delhi")}
              className={`px-3 py-1.5 text-xs font-bold rounded-full transition-colors flex items-center gap-1.5 ${
                filterVeg === "delhi"
                  ? "bg-brand-600 text-white"
                  : "bg-white text-brand-700 border border-orange-200 hover:bg-orange-50"
              }`}
            >
              <Flame className="w-3 h-3 text-brand-500" />
              Delhi Specials
            </button>
          </div>
        </div>

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="py-24 text-center">
            <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-sm font-medium text-gray-600">
              Fetching freshly prepared dishes...
            </p>
          </div>
        ) : filteredFoods.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
              🍲
            </div>
            <h3 className="text-lg font-bold text-gray-900">No dishes found</h3>
            <p className="text-sm text-gray-500 mt-1">
              Try adjusting your search query or selecting &quot;All&quot; categories to see our complete menu.
            </p>
          </div>
        ) : (
          /* Food Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                <div
                  key={itemId}
                  className={`bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1 ${
                    !isAvailable ? "opacity-75" : ""
                  }`}
                >
                  {/* Image Container */}
                  <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                    <Link href={`/dish/${itemId}`} className="block w-full h-full">
                      <Image
                        src={imgSrc}
                        alt={food.name}
                        fill
                        className={`object-cover transition-transform duration-500 ${
                          !isAvailable ? "grayscale contrast-125" : "group-hover:scale-105"
                        }`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </Link>

                    {/* Sold Out Overlay if unavailable */}
                    {!isAvailable && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="px-3 py-1 bg-red-600 text-white text-xs font-black uppercase tracking-wider rounded-full shadow-lg">
                          Sold Out Today
                        </span>
                      </div>
                    )}

                    {/* Badge: Delhi Special */}
                    {isAvailable && food.isDelhiSpecial && (
                      <div className="absolute top-3 left-3 bg-brand-600/90 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                        <Flame className="w-3 h-3 fill-white" />
                        <span>Delhi Special</span>
                      </div>
                    )}

                    {/* Badge: Veg indicator */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1 rounded-md shadow-sm">
                      <div
                        className={`w-3 h-3 border flex items-center justify-center ${
                          food.isVeg ? "border-emerald-600" : "border-red-600"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            food.isVeg ? "bg-emerald-600" : "bg-red-600"
                          }`}
                        ></div>
                      </div>
                    </div>

                    {/* Add to Cart / Counter Floating Pill */}
                    <div className="absolute bottom-3 right-3">
                      {!isAvailable ? (
                        <span className="px-2.5 py-1 rounded-full bg-gray-800/80 text-gray-200 text-[11px] font-bold">
                          Unavailable
                        </span>
                      ) : count === 0 ? (
                        <button
                          onClick={() => addToCart(itemId)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-brand-500 hover:text-white text-gray-900 font-bold text-xs shadow-md border border-gray-100 transition-all active:scale-95"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>ADD</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-brand-500 text-white shadow-lg text-xs font-bold">
                          <button
                            onClick={() => removeFromCart(itemId)}
                            className="p-1 hover:bg-black/20 rounded-full transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-4 text-center">{count}</span>
                          <button
                            onClick={() => addToCart(itemId)}
                            className="p-1 hover:bg-black/20 rounded-full transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Food Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <Link
                          href={`/dish/${itemId}`}
                          className="font-extrabold text-base text-gray-900 hover:text-brand-600 transition-colors line-clamp-1"
                        >
                          {food.name}
                        </Link>
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded shrink-0">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{food.rating || "4.8"}</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                        {food.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {food.category}
                      </span>
                      <span className="text-lg font-black text-gray-900">
                        ₹{food.price}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

