"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/StoreContext";
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
  ChevronRight,
  Heart,
} from "lucide-react";

export default function LocalizedMarketAreaView({
  location,
  nearbyLocations = [],
  dishes = [],
}) {
  const { selectedLocation, setSelectedLocation, addToCart, cartItems } = useStore();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const isCurrentActive = selectedLocation?.slug === location.slug;

  const handleSetLocation = () => {
    setSelectedLocation(location);
  };

  return (
    <div className="min-h-screen bg-gray-50/70 pb-20">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-100 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold text-gray-500">
          <Link href="/" className="hover:text-brand-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/market-area" className="hover:text-brand-600 transition-colors">
            Market Areas
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold truncate">{location.name}</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-brand-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.22),transparent_55%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Zone & Delivery Speed Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-brand-500/20 border border-brand-500/40 text-brand-300 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-brand-400" />
              <span>{location.zone}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-md">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>⚡ {location.avgDeliveryMinutes} Mins Doorstep Delivery</span>
            </span>

            <span className="inline-flex items-center gap-1.5 bg-white/10 text-gray-300 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md">
              <span>Pincodes: {location.pincodes.join(", ")}</span>
            </span>
          </div>

          {/* Heading & Tagline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl leading-tight">
            Best Food Delivery in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-brand-400 to-amber-300">
              {location.name}
            </span>
          </h1>

          <p className="mt-3 text-lg sm:text-xl font-bold text-orange-200/90 max-w-2xl">
            {location.tagline}
          </p>

          <p className="mt-4 text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
            {location.description}
          </p>

          {/* Cloud Kitchen Hub Indicator */}
          <div className="mt-6 p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md max-w-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500/30 border border-brand-500/50 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-brand-300" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block">
                  Serving Kitchen Hub
                </span>
                <span className="text-xs sm:text-sm font-black text-white">
                  {location.hub}
                </span>
              </div>
            </div>

            {/* Set as Active Delivery Area Button */}
            <button
              onClick={handleSetLocation}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 ${
                isCurrentActive
                  ? "bg-emerald-500 text-white shadow-emerald-500/30"
                  : "bg-gradient-to-r from-brand-500 to-orange-500 hover:from-brand-600 hover:to-orange-600 text-white shadow-brand-500/30"
              }`}
            >
              {isCurrentActive ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Delivering to {location.shortName || location.name}</span>
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4" />
                  <span>Set as My Delivery Location</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
              <span className="text-lg sm:text-xl font-black text-white block">
                {location.avgDeliveryMinutes}m
              </span>
              <span className="text-[11px] text-gray-400 font-semibold">
                Avg. Delivery Speed
              </span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
              <span className="text-lg sm:text-xl font-black text-white block">
                4.9 ★
              </span>
              <span className="text-[11px] text-gray-400 font-semibold">
                Local Rating (1.2k+)
              </span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
              <span className="text-lg sm:text-xl font-black text-white block">
                ₹499
              </span>
              <span className="text-[11px] text-gray-400 font-semibold">
                Free Delivery Above
              </span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
              <span className="text-lg sm:text-xl font-black text-white block">
                100%
              </span>
              <span className="text-[11px] text-gray-400 font-semibold">
                Spill-Proof Packaging
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Page Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-12">
        {/* Popular Dishes Ordered in This Location */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-600 mb-1">
                <Flame className="w-3.5 h-3.5 text-brand-500 fill-brand-500" />
                <span>Locality Favorites</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-950">
                Top Dishes Ordered in {location.name}
              </h2>
            </div>
            <Link
              href="/menu"
              className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 hover:underline"
            >
              <span>Explore Full Menu (24+ Dishes)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Dishes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {dishes.slice(0, 6).map((item) => {
              const qty = cartItems[item._id] || 0;

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl border border-gray-200/80 hover:border-brand-300 p-4 transition-all duration-300 hover:shadow-lg flex flex-col justify-between group"
                >
                  <div>
                    {/* Dish Image */}
                    <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3 bg-gray-100">
                      <Image
                        src={item.image || "/assets/food_1.png"}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      {item.isDelhiSpecial && (
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-red-600 to-brand-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                          Delhi Special
                        </div>
                      )}
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
                      <span className="text-base font-black text-gray-950">
                        ₹{item.price}
                      </span>
                      <span className="text-[10px] text-gray-400 block font-medium">
                        Taxes included
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(item._id)}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 active:scale-95 ${
                        qty > 0
                          ? "bg-brand-500 text-white shadow-xs"
                          : "bg-orange-50 hover:bg-orange-100 text-brand-700 border border-orange-200/80"
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{qty > 0 ? `Added (${qty})` : "Add to Cart"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why Foodies in {location.name} Choose Eat & Chill */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-black text-gray-950 mb-3">
            Why Foodies in {location.name} Order from Eat &amp; Chill
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-6 max-w-3xl">
            Delivering piping hot street eats, slow-simmered curries, and gourmet shakes directly to residences, corporate offices, and student hostels in {location.name}.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {location.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-orange-50/40 border border-orange-100/80 flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-brand-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900">
                    {highlight}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Direct delivery route from our {location.hub} to your doorstep.
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Landmarks Covered in Locality */}
          {location.landmarks && location.landmarks.length > 0 && (
            <div className="mt-6 pt-5 border-t border-gray-100">
              <span className="text-xs font-black uppercase tracking-wider text-gray-400 block mb-2">
                Key Landmarks &amp; Colonies Covered in {location.name}:
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
        </section>

        {/* Localized Verified Customer Reviews */}
        {location.reviews && location.reviews.length > 0 && (
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                ★
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-950">
                  Customer Reviews from {location.name}
                </h2>
                <span className="text-xs text-gray-500 font-semibold">
                  Verified orders delivered in {location.name}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {location.reviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-gradient-to-br from-amber-50/40 to-orange-50/30 border border-orange-100/80"
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
          </section>
        )}

        {/* Localized FAQs Accordion */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-black text-gray-950 mb-2">
            Frequently Asked Questions about Food Delivery in {location.name}
          </h2>
          <p className="text-xs text-gray-500 mb-6 font-medium">
            Everything you need to know about ordering in {location.name}
          </p>

          <div className="space-y-3">
            {location.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-200/90 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full text-left p-4 flex items-center justify-between gap-3 bg-gray-50/50 hover:bg-orange-50/40 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-bold text-gray-900">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-200 ${
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
                        transition={{ duration: 0.2 }}
                        className="p-4 bg-white text-xs text-gray-600 leading-relaxed border-t border-gray-100"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* Internal Link Engine (Layer 5 of Programmatic SEO Blueprint) */}
        {nearbyLocations && nearbyLocations.length > 0 && (
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-brand-600 block">
                  Crawl &amp; Explore Hubs
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-gray-950">
                  Nearby Delivery Areas near {location.shortName || location.name}
                </h2>
              </div>
              <Link
                href="/market-area"
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 hover:underline"
              >
                <span>View All 22+ Hubs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {nearbyLocations.map((nearby) => (
                <Link
                  key={nearby.slug}
                  href={`/market-area/${nearby.slug}`}
                  className="p-4 rounded-2xl bg-gray-50/70 hover:bg-orange-50/60 border border-gray-200/70 hover:border-brand-300 transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-brand-700 bg-orange-100/70 px-2 py-0.5 rounded-full">
                      {nearby.zone}
                    </span>
                    <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      {nearby.avgDeliveryMinutes}m
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-gray-900 group-hover:text-brand-600 transition-colors flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                    <span>{nearby.name}</span>
                  </h3>

                  <p className="text-[11px] text-gray-500 mt-1 line-clamp-1">
                    {nearby.tagline}
                  </p>

                  <div className="mt-3 pt-2 border-t border-gray-200/50 flex items-center justify-between text-[11px] font-bold text-brand-600">
                    <span>Order in {nearby.shortName || nearby.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

