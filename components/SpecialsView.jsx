"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { MARKET_LOCATIONS } from "@/lib/marketLocations";
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
  ShoppingBag,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

export default function SpecialsView() {
  const {
    food_list,
    isLoading,
    cartItems,
    addToCart,
    removeFromCart,
    selectedLocation,
    setSelectedLocation,
  } = useStore();

  const [filterVegOnly, setFilterVegOnly] = useState(false);
  const [locationPickerOpen, setLocationPickerOpen] = useState(false);

  // Dynamic location-derived text
  const currentAreaName = selectedLocation ? selectedLocation.name : "All Locations";
  const currentHub = selectedLocation
    ? selectedLocation.hub
    : "Express Cloud Kitchen Hubs";
  const deliveryTime = selectedLocation ? selectedLocation.avgDeliveryMinutes : "25-30";
  const popularDishNames = selectedLocation ? selectedLocation.popularDishes : [];

  // Filter special dishes:
  // If location has popular dishes, prioritize them, plus all isDelhiSpecial items
  let specialFoods = food_list.filter((f) => {
    if (f.isDelhiSpecial) return true;
    if (popularDishNames && popularDishNames.length > 0) {
      return popularDishNames.some(
        (name) =>
          f.name.toLowerCase().includes(name.toLowerCase()) ||
          name.toLowerCase().includes(f.name.toLowerCase())
      );
    }
    return false;
  });

  if (specialFoods.length === 0) {
    specialFoods = food_list.filter((f) => f.isDelhiSpecial);
  }

  if (filterVegOnly) {
    specialFoods = specialFoods.filter((f) => f.isVeg);
  }

  return (
    <div className="py-10 sm:py-14 bg-slate-50/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Dynamic Hero Header */}
        <div className="relative rounded-3xl bg-gradient-to-r from-brand-600 via-orange-600 to-amber-600 p-8 sm:p-12 text-white overflow-hidden shadow-xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 max-w-3xl space-y-4">
            {/* Location Switcher Pill */}
            <div className="relative inline-block">
              <button
                onClick={() => setLocationPickerOpen(!locationPickerOpen)}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-black uppercase tracking-wider text-orange-100 transition-all border border-white/20"
              >
                <MapPin className="w-3.5 h-3.5 text-white" />
                <span>📍 Area: {currentAreaName}</span>
                <ChevronDown className="w-3 h-3 text-orange-200" />
              </button>

              <AnimatePresence>
                {locationPickerOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute left-0 mt-2 w-72 max-h-60 overflow-y-auto bg-white rounded-2xl shadow-2xl p-2 z-50 text-gray-800 text-xs font-bold divide-y divide-gray-100 border border-gray-100"
                  >
                    <button
                      onClick={() => {
                        setSelectedLocation(null);
                        setLocationPickerOpen(false);
                      }}
                      className="w-full text-left p-2 rounded-xl hover:bg-orange-50 text-brand-700 font-black"
                    >
                      🌟 All Locations (Universal)
                    </button>
                    {MARKET_LOCATIONS.map((loc) => (
                      <button
                        key={loc.slug}
                        onClick={() => {
                          setSelectedLocation(loc);
                          setLocationPickerOpen(false);
                        }}
                        className={`w-full text-left p-2 rounded-xl hover:bg-orange-50 transition-colors ${
                          selectedLocation?.slug === loc.slug
                            ? "bg-orange-100/70 text-brand-700"
                            : "text-gray-700"
                        }`}
                      >
                        📍 {loc.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dynamic Title */}
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {selectedLocation ? `${currentAreaName} Specials` : "Chef's Signature Specials"}
            </h1>

            {/* Dynamic Tagline & Description */}
            <p className="text-sm sm:text-base text-orange-100 leading-relaxed font-medium">
              {selectedLocation
                ? selectedLocation.description
                : "Authentic culinary heritage recipes prepared fresh with signature spices, pure desi ghee, and slow-charcoal simmering. Delivered steaming hot to your doorstep."}
            </p>

            {/* Key Delivery & Hub Metrics */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-bold text-white/90">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/20">
                <Clock className="w-4 h-4 text-amber-300" />
                ⚡ {deliveryTime} Mins Fast Dispatch
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 truncate max-w-xs">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="truncate">Hub: {currentHub}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/20">
                <Award className="w-4 h-4 text-amber-300" />
                Pure Desi Ghee
              </span>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-3xl shadow-sm border border-gray-100">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2">
              <Flame className="w-5 h-5 text-brand-500 fill-brand-500" />
              <span>Iconic Specials for {currentAreaName}</span>
            </h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Showing {specialFoods.length} handcrafted preparations freshly dispatched to your area
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
              All Specials
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
              Pure Veg Only
            </button>
          </div>
        </div>

        {/* Food Items Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-4 border border-gray-100 animate-pulse space-y-3">
                <div className="w-full h-48 bg-gray-200 rounded-2xl" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : specialFoods.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm max-w-md mx-auto">
            <Flame className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-900">No Specials Found for this Filter</h3>
            <p className="text-xs text-gray-500 mt-1">Try turning off Pure Veg filter or view our complete menu.</p>
            <button
              onClick={() => setFilterVegOnly(false)}
              className="mt-4 px-4 py-2 bg-brand-500 text-white rounded-xl text-xs font-bold"
            >
              Show All Specials
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {specialFoods.map((item) => {
              const qty = cartItems[item._id] || 0;

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-3xl border border-gray-200/80 hover:border-brand-300 p-4 transition-all duration-300 hover:shadow-xl flex flex-col justify-between group"
                >
                  <div>
                    {/* Image with Badges */}
                    <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-3 bg-gray-100">
                      <Image
                        src={item.image || "/assets/food_1.png"}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-red-600 to-brand-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                        {currentAreaName} Special
                      </div>
                      <div className="absolute top-2 right-2">
                        <span
                          className={`w-3.5 h-3.5 rounded-sm border-2 flex items-center justify-center p-0.5 ${
                            item.isVeg ? "border-green-600 bg-white" : "border-red-600 bg-white"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.isVeg ? "bg-green-600" : "bg-red-600"
                            }`}
                          />
                        </span>
                      </div>
                    </div>

                    <Link href={`/dish/${item._id}`} className="block group-hover:text-brand-600">
                      <h3 className="font-extrabold text-gray-900 text-sm line-clamp-1">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-base font-black text-gray-950">₹{item.price}</span>
                      <span className="text-[10px] text-gray-400 block font-medium">Taxes included</span>
                    </div>

                    {qty === 0 ? (
                      <button
                        onClick={() => addToCart(item._id)}
                        className="px-3.5 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-brand-700 border border-orange-200/80 font-black text-xs transition-all flex items-center gap-1 active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 bg-brand-500 text-white px-2 py-1 rounded-xl shadow-xs">
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="hover:scale-110 active:scale-90"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-black text-xs w-4 text-center">{qty}</span>
                        <button
                          onClick={() => addToCart(item._id)}
                          className="hover:scale-110 active:scale-90"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Why Specials section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
          <h2 className="text-base sm:text-lg font-black text-gray-900">
            Why Our Specials Taste Distinctively Authentic
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-gray-600">
            <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100">
              <strong className="text-gray-900 block mb-1">Slow Dum Charcoal Cooking</strong>
              <span>Our gravies and biryanis are simmered on low embers for hours to lock in deep spice layers.</span>
            </div>
            <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100">
              <strong className="text-gray-900 block mb-1">Local Cloud Kitchen Dispatch</strong>
              <span>Cooked fresh and packaged in thermal insulated containers from {currentHub}.</span>
            </div>
            <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100">
              <strong className="text-gray-900 block mb-1">100% Khari Baoli Spices</strong>
              <span>Real roasted cumin, stone-flower dagad phool, and Kashmiri deghi mirch for genuine aroma.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

