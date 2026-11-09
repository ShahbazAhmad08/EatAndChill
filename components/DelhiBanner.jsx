"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import {
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Flame,
  ShieldCheck,
  ArrowRight,
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
        message: `🎉 Great news! Fast 30-Min Delivery is ACTIVE in Pincode ${pincode}! Order hot food now.`,
      });
    } else {
      setPincodeResult({
        success: true,
        message: `🚚 We deliver across Delhi NCR! Pincode ${pincode} is covered via our Express Courier Hub.`,
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/70 via-white to-white py-12 md:py-20 border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Value Prop */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 text-brand-700 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-brand-600 fill-brand-600 animate-pulse" />
              <span>{settings.heroTag || "Delhi NCR's #1 Food Ordering Hub"}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.15]">
              {settings.heroHeading || (
                <>
                  Order Delicious Food Online in{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-amber-500">
                    Delhi NCR
                  </span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {settings.heroSubheading ||
                "Satisfy your cravings with Delhi's best Rolls, rich Butter Paneer, crispy Momos, fresh Sandwiches, Italian Pastas and chill Desserts. Fast 30-minute delivery to your doorstep, piping hot and fresh!"}
            </p>

            {/* Interactive Delhi Pincode Checker */}
            <div className="bg-white p-4 rounded-2xl shadow-lg border border-orange-100 max-w-lg mx-auto lg:mx-0">
              <form onSubmit={checkPincode} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 text-brand-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value.replace(/\D/g, ""));
                      setPincodeResult(null);
                    }}
                    placeholder="Enter Delhi Pincode (e.g. 110001)"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-xl transition-all shadow-sm shrink-0"
                >
                  Check Delivery
                </button>
              </form>

              {pincodeResult && (
                <div
                  className={`mt-2.5 p-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 ${
                    pincodeResult.success
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {pincodeResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <span className="text-red-500">⚠️</span>
                  )}
                  <span>{pincodeResult.message}</span>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#explore-menu"
                className="px-7 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all flex items-center gap-2 group"
              >
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/delhi-delivery"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm border border-gray-200 shadow-sm transition-all"
              >
                Delhi Delivery Areas
              </Link>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-orange-100/60 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                <Clock className="w-4 h-4 text-brand-500 shrink-0" />
                <span>30-Min Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Hygienic Packing</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Open till 3 AM</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                <span>UPI &amp; COD Available</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-tr from-orange-400 to-amber-300 p-2">
              <Image
                src="/assets/header_img.png"
                alt="Delicious Delhi Food Platter - Eat & Chill"
                fill
                className="object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
                priority
              />
              {/* Floating Badge 1 */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm py-2 px-3.5 rounded-2xl shadow-lg border border-orange-100 flex items-center gap-2">
                <span className="text-xl">🌶️</span>
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Top Rated</p>
                  <p className="text-xs font-extrabold text-gray-900">Old Delhi Rolls</p>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm py-2 px-3.5 rounded-2xl shadow-lg border border-orange-100 flex items-center gap-2">
                <span className="text-xl">⚡</span>
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">Live Tracking</p>
                  <p className="text-xs font-extrabold text-gray-900">Delivery in 30 Min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

