"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import ExploreMenu from "@/components/ExploreMenu";
import FoodDisplay from "@/components/FoodDisplay";
import {
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  Phone,
  Flame,
  Star,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Tag,
  Copy,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";

export default function LocalizedHomePage({
  location,
  nearbyLocations = [],
  dishes = [],
  offers = [],
}) {
  const { selectedLocation, setSelectedLocation, addToCart, cartItems } = useStore();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Sync selectedLocation in StoreContext on mount
  useEffect(() => {
    if (!selectedLocation || selectedLocation.slug !== location.slug) {
      setSelectedLocation(location);
    }
  }, [location]);

  const copyCode = (code) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    toast.success(`Coupon "${code}" copied!`, { duration: 2000 });
  };

  return (
    <div className="min-h-screen bg-gray-50/70 pb-20">
      {/* Localized Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/80 via-white to-slate-50/50 py-14 sm:py-20 border-b border-orange-100/60">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-5 text-center lg:text-left"
            >
              {/* Locality & Zone Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-black uppercase tracking-wider shadow-2xs">
                  <MapPin className="w-3.5 h-3.5 text-brand-500 animate-pulse" />
                  <span>{location.zone}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>⚡ {location.avgDeliveryMinutes} Mins Delivery</span>
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight leading-[1.14]">
                Order Delicious Food Online in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-orange-500 to-amber-500">
                  {location.name}
                </span>
              </h1>

              {/* Tagline & Narrative */}
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-medium">
                {location.description}
              </p>

              {/* Serving Kitchen Hub Badge */}
              <div className="p-4 rounded-2xl bg-white/90 border border-orange-200/80 shadow-md shadow-orange-500/5 max-w-lg mx-auto lg:mx-0 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-brand-600 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-brand-500" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                      Local Cloud Hub
                    </span>
                    <strong className="text-xs sm:text-sm font-black text-gray-900 block">
                      {location.hub}
                    </strong>
                  </div>
                </div>

                <div className="text-right sm:text-right">
                  <span className="text-[10px] text-gray-500 font-bold block">Pincodes:</span>
                  <span className="text-xs font-black text-brand-600">
                    {location.pincodes.slice(0, 3).join(", ")}
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs font-bold text-gray-700">
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200/60 shadow-2xs">
                  <Clock className="w-4 h-4 text-brand-500" />
                  <span>{location.avgDeliveryMinutes} Mins Express</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200/60 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Hygienic</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200/60 shadow-2xs">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>4.9 / 5.0 Rating</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Visual with Animated Food Circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5 relative flex justify-center items-center"
            >
              <div className="relative w-64 sm:w-80 h-64 sm:h-80">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/25 to-brand-600/30 blur-2xl animate-pulse-glow" />
                <div className="relative w-full h-full rounded-full border-4 border-amber-400/80 shadow-2xl overflow-hidden bg-stone-950 p-1 group">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src="/images/logo-square.jpg"
                      alt={`Real Brother's Restaurant in ${location.name}`}
                      fill
                      priority
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 360px"
                    />
                  </div>
                </div>

                {/* Floating Metric Pill */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute -bottom-3 -left-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-amber-200 flex items-center gap-2 z-20"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-xs">
                    ⚡
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 font-bold block">Delivering to</span>
                    <strong className="text-xs font-black text-gray-900">{location.shortName || location.name}</strong>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Deals & Combos Section */}
      {offers && offers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-600 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                <span>Special Deals For {location.shortName || location.name}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-950">
                Exclusive Combos &amp; Offers
              </h2>
            </div>
            <Link
              href="/offers"
              className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 hover:underline"
            >
              <span>View All Deals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {offers.slice(0, 3).map((off) => (
              <div
                key={off._id || off.title}
                className="bg-white rounded-3xl p-5 border border-orange-100/80 hover:border-brand-300 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-brand-700 bg-orange-100/80 px-2.5 py-0.5 rounded-full">
                      {off.tag}
                    </span>
                    <span className="text-[10px] font-bold text-gray-500">
                      {off.locationName}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-gray-950">
                    {off.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {off.description}
                  </p>

                  {off.couponCode && (
                    <div className="mt-3 p-2 rounded-xl bg-orange-50 border border-orange-200/80 flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-brand-800">
                        {off.couponCode}
                      </span>
                      <button
                        onClick={() => copyCode(off.couponCode)}
                        className="text-[11px] font-bold text-brand-600 hover:text-brand-800"
                      >
                        Copy
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-base font-black text-gray-950">
                      ₹{off.offerPrice}
                    </span>
                    {off.originalPrice > off.offerPrice && (
                      <span className="text-xs text-gray-400 line-through ml-1.5 font-medium">
                        ₹{off.originalPrice}
                      </span>
                    )}
                  </div>
                  <Link
                    href="/menu"
                    className="px-3 py-1.5 rounded-xl bg-brand-500 text-white font-bold text-xs hover:bg-brand-600"
                  >
                    Order Combo
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Categories Carousel */}
      <div className="mt-12">
        <ExploreMenu />
      </div>

      {/* Featured Dishes on Home Page for this Locality */}
      <div className="mt-6">
        <FoodDisplay isHome={true} limit={6} />
      </div>

      {/* Why Foodies in {location.name} Love Eat & Chill */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-brand-600 block">
                Local Fast Delivery Guarantee
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-gray-950">
                Why Foodies in {location.name} Choose Eat &amp; Chill
              </h2>
            </div>
            <a
              href="tel:+917755013772"
              className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Local Hub (+91 7755013772)</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {location.highlights.map((h, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-orange-50/40 border border-orange-100 flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-brand-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900">{h}</h3>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Direct express transit from our {location.hub}.
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Landmarks in locality */}
          {location.landmarks && location.landmarks.length > 0 && (
            <div className="mt-6 pt-5 border-t border-gray-100">
              <span className="text-xs font-black uppercase tracking-wider text-gray-400 block mb-2">
                Delivering Across {location.name} Landmarks &amp; Societies:
              </span>
              <div className="flex flex-wrap gap-2">
                {location.landmarks.map((lm) => (
                  <span
                    key={lm}
                    className="bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full border border-gray-200/60"
                  >
                    📍 {lm}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Localized Customer Reviews */}
      {location.reviews && location.reviews.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black text-gray-950 mb-6">
              What Foodies in {location.name} Are Saying
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {location.reviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-gradient-to-br from-amber-50/40 to-orange-50/30 border border-orange-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-brand-700 bg-white px-2 py-0.5 rounded-full border border-orange-200">
                      {rev.dish}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 font-medium italic mt-2">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                  <span className="text-[11px] font-extrabold text-gray-900 block mt-3">
                    — {rev.author}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Localized FAQs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-black text-gray-950 mb-2">
            Frequently Asked Questions - Food Delivery in {location.name}
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            Timings, delivery charges, COD &amp; online payment in {location.name}
          </p>

          <div className="space-y-3">
            {location.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-200/90 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full text-left p-4 flex items-center justify-between gap-3 bg-gray-50/50 hover:bg-orange-50/40 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-bold text-gray-900">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${
                        isOpen ? "rotate-180 text-brand-600" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 bg-white text-xs text-gray-600 border-t border-gray-100"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Internal Links to Nearby Hubs */}
      {nearbyLocations && nearbyLocations.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
            <h2 className="text-lg font-black text-gray-950 mb-4">
              Explore Nearby Delivery Areas in {location.zone || "the Region"}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {nearbyLocations.map((nearby) => (
                <Link
                  key={nearby.slug}
                  href={`/${nearby.slug}`}
                  className="p-3 rounded-2xl bg-gray-50 hover:bg-orange-50 border border-gray-100 hover:border-brand-300 transition-all text-center block group"
                >
                  <MapPin className="w-4 h-4 text-brand-500 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-gray-800 group-hover:text-brand-600 block truncate">
                    {nearby.shortName || nearby.name}
                  </span>
                  <span className="text-[10px] text-gray-500 block">
                    {nearby.avgDeliveryMinutes}m
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

