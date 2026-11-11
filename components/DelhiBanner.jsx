"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import {
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Flame,
  ShieldCheck,
  ArrowRight,
  Star,
  Zap,
  ExternalLink,
} from "lucide-react";

export default function DelhiBanner() {
  const { settings, selectedLocation } = useStore();
  const [pincode, setPincode] = useState("");
  const [pincodeResult, setPincodeResult] = useState(null);

  const checkPincode = (e) => {
    e.preventDefault();
    if (!pincode || pincode.length < 6) {
      setPincodeResult({
        success: false,
        message: "Please enter a valid 6-digit delivery pincode.",
      });
      return;
    }

    const serviceable = ["201301", "201304", "201307", "201305", "201306"];
    if (serviceable.includes(pincode) || pincode.startsWith("201")) {
      setPincodeResult({
        success: true,
        message: `🎉 Express 25-30 Min Delivery is ACTIVE in Pincode ${pincode} (Noida Hub)!`,
      });
    } else {
      setPincodeResult({
        success: true,
        message: `⚡ Delivery active for Pincode ${pincode}! Order hot food now.`,
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/70 via-white to-red-50/30 py-12 md:py-20 border-b border-amber-200/50">
      {/* Ambient background blur circles */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Heading, Value Props & Pincode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-amber-300 text-amber-900 text-xs font-black uppercase tracking-wider shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-brand-600 animate-ping" />
              <Flame className="w-3.5 h-3.5 text-brand-600 fill-brand-600" />
              <span>
                {selectedLocation
                  ? `⚡ 25-30 Min Delivery in ${selectedLocation.shortName || selectedLocation.name}`
                  : "Authentic Ghar Jaisa Swad • Estd. 2024"}
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight leading-[1.14]">
              {selectedLocation ? (
                <>
                  Order Ghar Jaisa Swad Online in{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 via-brand-600 to-amber-600">
                    {selectedLocation.name}
                  </span>
                </>
              ) : (
                <>
                  Real Taste, Pure Spices:{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 via-brand-600 to-amber-600">
                    Ghar Jaisa Swad
                  </span>{" "}
                  Delivered Hot
                </>
              )}
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-medium">
              {selectedLocation
                ? selectedLocation.description
                : "Craving sizzling Paneer Tikka Rolls, rich Dal Makhani, crispy Momos, or a hearty Indian Thali? Real Brother's Restaurant delivers freshly cooked, hygienic meals straight from Sarfabad, Sector 73 Noida to your doorstep in 30 minutes!"}
            </p>

            {/* Interactive Universal Pincode Checker */}
            <div className="bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-3xl shadow-xl shadow-brand-500/5 border border-amber-200/80 max-w-lg mx-auto lg:mx-0">
              <form onSubmit={checkPincode} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 text-brand-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value.replace(/\D/g, ""));
                      setPincodeResult(null);
                    }}
                    placeholder="Enter 6-digit Pincode (e.g. 201301, 201304)"
                    className="w-full pl-10 pr-3 py-3 text-xs sm:text-sm bg-gray-50/90 border border-gray-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-600 focus:bg-white font-medium transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-700 hover:to-amber-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl transition-all shadow-md shadow-brand-600/25 active:scale-95 shrink-0"
                >
                  Check Delivery
                </button>
              </form>

              <AnimatePresence>
                {pincodeResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`mt-3 p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                      pincodeResult.success
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {pincodeResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <span className="text-base leading-none">⚠️</span>
                    )}
                    <span>{pincodeResult.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-gray-100 text-[11px] text-gray-500 font-semibold px-1">
                <span className="flex items-center gap-1 text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Free Delivery on orders above ₹499
                </span>
                <a
                  href={settings.googleBusinessUrl || "https://share.google/UPOhBCowyPZ07exvK"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-700 hover:text-brand-600 font-bold underline flex items-center gap-1"
                >
                  <span>Google Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs font-bold text-gray-700">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200/60 shadow-2xs">
                <Clock className="w-4 h-4 text-brand-600" />
                <span>25-30 Min Hot Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200/60 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Hygienic Kitchen</span>
              </div>
              <a
                href={settings.googleBusinessUrl || "https://share.google/UPOhBCowyPZ07exvK"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 px-3 py-1.5 rounded-full border border-amber-300 shadow-2xs transition-colors"
              >
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>4.9 ★ Google Profile (1,200+ Reviews)</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual with Real Brother's Emblem & Signature Platter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            {/* Main Visual Circle & Glow */}
            <div className="relative w-80 sm:w-[420px] h-80 sm:h-[420px] flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/25 via-brand-600/20 to-red-600/20 blur-3xl animate-pulse-glow" />

              {/* Central Restaurant Badge with Grand Golden Emblem */}
              <div className="relative w-72 sm:w-88 h-72 sm:h-88 rounded-full border-4 border-amber-400/80 shadow-2xl overflow-hidden bg-gradient-to-tr from-stone-900 via-stone-950 to-stone-900 p-2 group">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/images/logo-square.jpg"
                    alt="Real Brother's Restaurant Emblem"
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 420px"
                  />
                </div>
              </div>

              {/* Floating Pill 1: Top Right - Speed */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -top-1 -right-1 sm:-right-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-amber-200 flex items-center gap-2.5 z-20"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm">
                  ⚡
                </div>
                <div>
                  <span className="text-[9px] text-gray-500 font-bold block uppercase tracking-wider">
                    Average Speed
                  </span>
                  <span className="text-xs font-black text-gray-900">
                    25-30 Mins Hot Drop
                  </span>
                </div>
              </motion.div>

              {/* Floating Pill 2: Bottom Left - Google Profile Reviews */}
              <motion.a
                href={settings.googleBusinessUrl || "https://share.google/UPOhBCowyPZ07exvK"}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute -bottom-2 -left-2 sm:-left-3 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl border border-amber-200 flex items-center gap-2.5 z-20 hover:scale-105 transition-transform"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                </div>
                <div>
                  <span className="text-[9px] text-gray-500 font-bold block uppercase tracking-wider flex items-center gap-1">
                    Google Business <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                  <span className="text-xs font-black text-gray-900">
                    4.9 ★ Rated by Foodies
                  </span>
                </div>
              </motion.a>

              {/* Floating Pill 3: Bottom Right - Tagline */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="absolute -bottom-3 right-4 bg-gradient-to-r from-brand-600 to-amber-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg shadow-brand-600/30 z-20 flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-amber-200" />
                <span>Ghar Jaisa Swad</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
