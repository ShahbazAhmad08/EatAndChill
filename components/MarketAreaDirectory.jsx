"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MARKET_LOCATIONS,
  getAllZones,
} from "@/lib/marketLocations";
import { useStore } from "@/context/StoreContext";
import {
  MapPin,
  Clock,
  Search,
  CheckCircle2,
  Flame,
  ArrowRight,
  ShieldCheck,
  Zap,
  Phone,
  Sparkles,
  Filter,
} from "lucide-react";

export default function MarketAreaDirectory() {
  const { selectedLocation, setSelectedLocation } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeZone, setActiveZone] = useState("All Zones");

  const zones = useMemo(() => getAllZones(), []);

  // Filter locations based on search and zone
  const filteredLocations = useMemo(() => {
    return MARKET_LOCATIONS.filter((loc) => {
      const matchesZone =
        activeZone === "All Zones" || loc.zone === activeZone;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesZone;

      const matchesSearch =
        loc.name.toLowerCase().includes(q) ||
        loc.zone.toLowerCase().includes(q) ||
        loc.city.toLowerCase().includes(q) ||
        loc.hub.toLowerCase().includes(q) ||
        loc.pincodes.some((pin) => pin.includes(q)) ||
        (loc.landmarks && loc.landmarks.some((lm) => lm.toLowerCase().includes(q))) ||
        (loc.popularDishes && loc.popularDishes.some((dish) => dish.toLowerCase().includes(q)));

      return matchesZone && matchesSearch;
    });
  }, [searchQuery, activeZone]);

  return (
    <div className="min-h-screen bg-gray-50/60 pb-20">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-brand-950 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.18),transparent_50%)]" />
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 text-orange-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-5 backdrop-blur-md">
              <Flame className="w-3.5 h-3.5 text-brand-400" />
              <span>Programmatic Express Delivery Network</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
              Delhi NCR <span className="text-brand-500">Market Areas</span> &amp; Express Delivery Hubs
            </h1>

            <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Order fresh, authentic food delivered steaming hot in 25 to 30 minutes from our network of 22+ cloud kitchen hubs across Delhi, Noida, and Gurugram.
            </p>
          </motion.div>

          {/* Active Location Announcement Pill */}
          {selectedLocation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 inline-flex items-center gap-3 bg-brand-500/20 border border-brand-500/40 text-brand-200 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold backdrop-blur-md"
            >
              <MapPin className="w-4 h-4 text-brand-400 animate-pulse" />
              <span>
                Currently delivering to:{" "}
                <strong className="text-white underline">{selectedLocation.name}</strong>{" "}
                ({selectedLocation.avgDeliveryMinutes} mins avg)
              </span>
              <button
                onClick={() => setSelectedLocation(null)}
                className="ml-2 text-xs text-orange-300 hover:text-white underline font-semibold"
              >
                Reset
              </button>
            </motion.div>
          )}

          {/* Search & Filter Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by area (e.g. Connaught Place, Rohini, Noida, Saket) or pincode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 text-sm sm:text-base bg-white text-gray-900 rounded-2xl shadow-xl focus:outline-none focus:ring-4 focus:ring-brand-500/40 font-medium placeholder:text-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 text-sm font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Zone Filter Chips */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {zones.map((zone) => {
              const isSelected = activeZone === zone;
              return (
                <button
                  key={zone}
                  onClick={() => setActiveZone(zone)}
                  className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all border ${
                    isSelected
                      ? "bg-brand-500 text-white border-brand-500 shadow-md shadow-brand-500/30 scale-105"
                      : "bg-white/10 hover:bg-white/20 text-gray-300 border-white/10"
                  }`}
                >
                  {zone}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        {/* Results Counter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600 font-semibold">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-brand-500" />
            <span>
              Showing <strong className="text-gray-900 font-black">{filteredLocations.length}</strong> of{" "}
              {MARKET_LOCATIONS.length} Delivery Market Areas
            </span>
            {activeZone !== "All Zones" && (
              <span className="bg-orange-50 text-brand-700 font-bold px-2.5 py-0.5 rounded-full border border-orange-200">
                {activeZone}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 text-[11px] text-gray-500">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" /> Express 20-35 Mins
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Tamper-Proof Packs
            </span>
          </div>
        </div>

        {/* Empty State */}
        {filteredLocations.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm max-w-lg mx-auto">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900">No Market Area Found</h3>
            <p className="text-xs text-gray-500 mt-1">
              We couldn't find any location matching &ldquo;{searchQuery}&rdquo;. Try searching for another locality or clear your filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveZone("All Zones");
              }}
              className="mt-4 px-4 py-2 bg-brand-500 text-white rounded-xl text-xs font-bold hover:bg-brand-600"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLocations.map((loc) => {
            const isSelected = selectedLocation?.slug === loc.slug;

            return (
              <motion.div
                key={loc.slug}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`bg-white rounded-3xl p-5 border transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:border-brand-300 ${
                  isSelected
                    ? "border-brand-500 ring-2 ring-brand-500/20 shadow-md bg-gradient-to-b from-orange-50/40 to-white"
                    : "border-gray-200/80 shadow-xs"
                }`}
              >
                <div>
                  {/* Card Header: Zone Tag & Delivery Time */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-black uppercase tracking-wider text-brand-700 bg-orange-100/70 px-2.5 py-0.5 rounded-full border border-orange-200/60">
                      {loc.zone}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      {loc.avgDeliveryMinutes} Mins
                    </span>
                  </div>

                  {/* Locality Title & Tagline */}
                  <Link href={`/market-area/${loc.slug}`} className="block group-hover:text-brand-600 transition-colors">
                    <h2 className="text-lg font-black text-gray-950 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-brand-500 shrink-0" />
                      <span>{loc.name}</span>
                    </h2>
                    <p className="text-xs font-semibold text-gray-500 mt-1 line-clamp-1">
                      {loc.tagline}
                    </p>
                  </Link>

                  {/* Hub info & pincodes */}
                  <div className="mt-3.5 space-y-1.5 text-xs text-gray-600">
                    <p className="flex items-center gap-1.5 font-medium">
                      <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>Hub: <strong className="text-gray-800">{loc.hub}</strong></span>
                    </p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-bold text-gray-400">Pincodes:</span>
                      {loc.pincodes.slice(0, 3).map((pin) => (
                        <span
                          key={pin}
                          className="bg-gray-100 text-gray-700 text-[10px] font-bold px-1.5 py-0.5 rounded"
                        >
                          {pin}
                        </span>
                      ))}
                      {loc.pincodes.length > 3 && (
                        <span className="text-[10px] text-gray-400 font-semibold">
                          +{loc.pincodes.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Popular Dishes Tags */}
                  <div className="mt-3.5 pt-3 border-t border-gray-100">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block mb-1.5">
                      Popular Dishes:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {loc.popularDishes.slice(0, 3).map((dish) => (
                        <span
                          key={dish}
                          className="text-[11px] font-medium bg-gray-50 text-gray-700 px-2 py-0.5 rounded-lg border border-gray-100"
                        >
                          {dish}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions: Deliver Here & View Page */}
                <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedLocation(loc)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-orange-50 hover:bg-orange-100 text-brand-700 border border-orange-200/80 active:scale-95"
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Active Location</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Deliver Here</span>
                      </>
                    )}
                  </button>

                  <Link
                    href={`/market-area/${loc.slug}`}
                    className="p-2 rounded-xl bg-gray-100 hover:bg-brand-50 hover:text-brand-600 text-gray-700 transition-colors"
                    title={`View dedicated page for ${loc.name}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Value Proposition Highlights */}
        <section className="mt-16 bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-950">
              Why Foodies Across Delhi NCR Trust Eat &amp; Chill
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-600">
              High speed, pure ingredients, and authentic heritage recipes prepared with love.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-100">
              <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900">25-30 Min Rapid Guarantee</h3>
              <p className="text-xs text-gray-600 mt-1">
                Thermal insulated delivery backpacks ensure your curries, naans, and rolls reach steaming hot.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-100">
              <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Tamper-Proof Smart Packaging</h3>
              <p className="text-xs text-gray-600 mt-1">
                Every container is sealed with tamper-evident stickers and 100% spill-proof eco containers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-100">
              <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Authentic Delhi Taste</h3>
              <p className="text-xs text-gray-600 mt-1">
                From Old Delhi handi biryanis to Punjabi Bagh tandoori platters, we honor authentic capital recipes.
              </p>
            </div>
          </div>
        </section>

        {/* Global FAQs for Market Area Delivery */}
        <section className="mt-12 bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-black text-gray-950 mb-6 text-center">
            Frequently Asked Questions about Market Area Delivery
          </h2>

          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">
                Can I change my market delivery area after starting an order?
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Yes! You can click on any area card or tap the location badge in the top navigation bar at any time to switch your delivery locality.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">
                What are the delivery charges across different Delhi NCR hubs?
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Standard delivery is ₹50, and all orders above ₹499 enjoy 100% FREE doorstep delivery across all 22 covered market areas.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">
                Are late night deliveries available across all market areas?
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Most hubs including Connaught Place, Hauz Khas, Rohini, Noida, and Gurugram operate late night until 2:00 AM to 3:00 AM.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

