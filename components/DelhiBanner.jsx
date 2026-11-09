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
  ShoppingBag,
} from "lucide-react";

export default function DelhiBanner() {
  const { settings } = useStore();
  const [pincode, setPincode] = useState("");
  const [pincodeResult, setPincodeResult] = useState(null);

  const checkPincode = (e) => {
    e.preventDefault();
    if (!pincode || pincode.length < 6) {
      setPincodeResult({
        success: false,
        message: "Please enter a valid 6-digit Delhi pincode.",
      });
      return;
    }

    if (pincode.startsWith("110")) {
      setPincodeResult({
        success: true,
        message: `🎉 Fast 30-Min Delivery is ACTIVE in Pincode ${pincode}! Order hot food now.`,
      });
    } else {
      setPincodeResult({
        success: true,
        message: `🚚 We deliver across Delhi NCR! Pincode ${pincode} is covered via our Express Courier Hub.`,
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/80 via-white to-slate-50/50 py-16 md:py-24 border-b border-orange-100/60">
      {/* Ambient background blur circles */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
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
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-orange-200/80 text-brand-700 text-xs font-black uppercase tracking-wider shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
              <Flame className="w-3.5 h-3.5 text-brand-500 fill-brand-500" />
              <span>{settings.heroTag || "Delhi NCR's #1 Cloud Kitchen Hub"}</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight leading-[1.12]">
              {settings.heroHeading ? (
                settings.heroHeading
              ) : (
                <>
                  Order Delicious Food Online in{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-orange-500 to-amber-500">
                    Delhi NCR
                  </span>
                </>
              )}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-medium">
              {settings.heroSubheading ||
                "Satisfy your cravings with Delhi's best Rolls, rich Butter Paneer, crispy Momos, fresh Sandwiches, Italian Pastas and chill Desserts. Fast 30-minute delivery to your doorstep, piping hot and fresh!"}
            </p>

            {/* Interactive Delhi Pincode Checker */}
            <div className="bg-white/90 backdrop-blur-md p-3.5 sm:p-4 rounded-3xl shadow-xl shadow-orange-500/5 border border-orange-200/60 max-w-lg mx-auto lg:mx-0">
              <form onSubmit={checkPincode} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 text-brand-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value.replace(/\D/g, ""));
                      setPincodeResult(null);
                    }}
                    placeholder="Enter Delhi Pincode (e.g. 110001)"
                    className="w-full pl-10 pr-3 py-3 text-sm bg-gray-50/80 border border-gray-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white font-medium transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-brand-500 to-orange-500 hover:from-brand-600 hover:to-orange-600 text-white font-extrabold text-sm rounded-2xl transition-all shadow-md shadow-brand-500/25 active:scale-95 shrink-0"
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
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>{pincodeResult.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-2.5 flex items-center justify-between text-[11px] text-gray-500 font-semibold px-1">
                <span>⚡ Express delivery across Delhi NCR</span>
                <Link
                  href="/market-area"
                  className="text-brand-600 hover:text-brand-700 font-bold underline flex items-center gap-1"
                >
                  <span>Explore 22+ Market Areas</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-2 text-xs font-bold text-gray-700">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200/60 shadow-xs">
                <Clock className="w-4 h-4 text-brand-500" />
                <span>30-Min Fast Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200/60 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Hygienic Kitchen</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200/60 shadow-xs">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>4.8 / 5.0 Delhi Rating</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual with Animated Floating Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            {/* Main Visual Circle & Glow */}
            <div className="relative w-72 sm:w-96 h-72 sm:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-400/20 to-brand-500/30 blur-2xl animate-pulse-glow" />

              <div className="relative w-full h-full rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white">
                <Image
                  src="/assets/header_img.png"
                  alt="Delicious food feast from Eat & Chill Delhi"
                  fill
                  priority
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>

              {/* Floating Pill 1: Top Right */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">
                  ⚡
                </div>
                <div>
                  <div className="text-[11px] font-black text-gray-900">28 Mins Avg</div>
                  <div className="text-[10px] text-gray-500 font-semibold">Delhi NCR Delivery</div>
                </div>
              </motion.div>

              {/* Floating Pill 2: Bottom Left */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <div className="text-[11px] font-black text-gray-900">18,500+ Orders</div>
                  <div className="text-[10px] text-gray-500 font-semibold">Loved Across Dilli</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
