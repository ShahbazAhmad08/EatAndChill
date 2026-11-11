"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { MARKET_LOCATIONS } from "@/lib/marketLocations";
import {
  Sparkles,
  Tag,
  Clock,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  ShoppingBag,
  Copy,
  ArrowRight,
  Flame,
  Percent,
} from "lucide-react";

export default function OffersView({ initialOffers = [] }) {
  const { selectedLocation, setSelectedLocation, addToCart, food_list } = useStore();
  const [offers, setOffers] = useState(initialOffers);
  const [loading, setLoading] = useState(false);
  const [activeLocationFilter, setActiveLocationFilter] = useState(
    selectedLocation ? selectedLocation.slug : "all"
  );

  const handleOrderCombo = (off) => {
    const matchingFood = food_list?.find(
      (f) => f.name?.toLowerCase() === off.title?.toLowerCase()
    );
    if (matchingFood) {
      addToCart(matchingFood._id || matchingFood.id);
    } else {
      toast.success(`Combo "${off.title}" selected! Check out our menu.`);
    }
  };

  useEffect(() => {
    if (selectedLocation) {
      setActiveLocationFilter(selectedLocation.slug);
    }
  }, [selectedLocation]);

  const fetchOffers = async (locSlug) => {
    try {
      setLoading(true);
      const url = locSlug && locSlug !== "all" ? `/api/offers?location=${locSlug}` : "/api/offers";
      const res = await fetch(url);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setOffers(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (slug) => {
    setActiveLocationFilter(slug);
    fetchOffers(slug);
    if (slug !== "all") {
      const loc = MARKET_LOCATIONS.find((l) => l.slug === slug);
      if (loc) setSelectedLocation(loc);
    }
  };

  const copyCode = (code) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    toast.success(`Coupon "${code}" copied to clipboard!`, { duration: 2000 });
  };

  return (
    <div className="min-h-screen bg-gray-50/70 pb-20">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-brand-950 text-white pt-14 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.2),transparent_50%)]" />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 text-orange-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>Special Value Combos &amp; Coupons</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-3xl mx-auto leading-tight">
            Exclusive <span className="text-brand-500">Combos &amp; Deals</span> Across Your City
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto">
            Save up to 40% with our curated meal trays, student midnight boxes, and corporate combo platters. Delivered hot in 30 minutes!
          </p>

          {/* Location Selector Bar */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 bg-white/10 p-2 rounded-2xl border border-white/15 backdrop-blur-md">
            <span className="text-xs font-bold text-gray-300 flex items-center gap-1.5 px-2">
              <MapPin className="w-3.5 h-3.5 text-brand-400" />
              <span>Area:</span>
            </span>
            <select
              value={activeLocationFilter}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="bg-gray-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="all">🌟 All Locations (Universal Deals)</option>
              {MARKET_LOCATIONS.map((loc) => (
                <option key={loc.slug} value={loc.slug}>
                  📍 {loc.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Offers Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        {loading ? (
          <div className="p-16 text-center text-xs font-bold text-gray-500">
            Updating combos &amp; deals...
          </div>
        ) : offers.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm max-w-md mx-auto">
            <Tag className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-900">No Exclusive Combos Right Now</h3>
            <p className="text-xs text-gray-500 mt-1">
              Check back soon or browse our full menu.
            </p>
            <Link
              href="/menu"
              className="mt-4 inline-block px-4 py-2 bg-brand-500 text-white rounded-xl text-xs font-bold"
            >
              Explore Full Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((off) => (
              <motion.div
                key={off._id || off.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-5 border border-gray-200/90 hover:border-brand-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-black uppercase tracking-wider text-brand-700 bg-orange-100/80 px-2.5 py-0.5 rounded-full border border-orange-200/60">
                      {off.tag}
                    </span>
                    <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-brand-500" />
                      <span>{off.locationName}</span>
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-base font-black text-gray-950 group-hover:text-brand-600 transition-colors">
                    {off.title}
                  </h2>
                  <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                    {off.description}
                  </p>

                  {/* Included Items Chips */}
                  {off.items && off.items.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block mb-1.5">
                        Items In This Combo:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {off.items.map((item, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-semibold bg-gray-50 text-gray-700 px-2 py-0.5 rounded-md border border-gray-100"
                          >
                            ✓ {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Coupon Code Pill */}
                  {off.couponCode && (
                    <div className="mt-4 p-2.5 rounded-xl bg-orange-50/70 border border-orange-200/80 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-brand-600" />
                        <span className="text-xs font-mono font-black text-brand-800 tracking-wider">
                          {off.couponCode}
                        </span>
                      </div>
                      <button
                        onClick={() => copyCode(off.couponCode)}
                        className="text-[11px] font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1 px-2 py-0.5 rounded hover:bg-orange-100 transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Pricing & CTA */}
                <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-gray-950">
                        ₹{off.offerPrice}
                      </span>
                      {off.originalPrice > off.offerPrice && (
                        <span className="text-xs text-gray-400 line-through font-semibold">
                          ₹{off.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold block">
                      Save ₹{off.originalPrice - off.offerPrice} ({off.discountPercent}%)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOrderCombo(off)}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-orange-500 hover:from-brand-600 hover:to-orange-600 text-white font-black text-xs transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add Combo</span>
                    </button>
                    <Link
                      href="/menu"
                      className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs transition-all active:scale-95 flex items-center gap-1"
                    >
                      <span>Menu</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* FAQs about Offers */}
        <section className="mt-16 bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm max-w-3xl mx-auto">
          <h2 className="text-lg font-black text-gray-950 mb-4 text-center">
            Offers &amp; Promo FAQs
          </h2>
          <div className="space-y-3 text-xs text-gray-600">
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
              <strong className="text-gray-900 block mb-1">
                How do I redeem a promo coupon code?
              </strong>
              <span>
                Simply copy the code above and enter it at checkout on the cart page before placing your order.
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
              <strong className="text-gray-900 block mb-1">
                Can I order a combo from any delivery area?
              </strong>
              <span>
                Universal combos are delivered across all covered cities and market areas. Area-specific combos are freshly dispatched from that locality&apos;s nearest cloud hub.
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

