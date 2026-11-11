import React from "react";
import Image from "next/image";
import Link from "next/link";
import connectDB from "@/lib/db";
import Settings from "@/lib/models/Settings";
import { Sparkles, Heart, Award, ShieldCheck, MapPin, ArrowRight, ExternalLink } from "lucide-react";

export async function generateMetadata() {
  await connectDB();
  const settings = await Settings.findOne({}).lean();
  return {
    title: `About Us | ${settings?.storeName || "REAL BROTHER'S RESTAURANT"} Story & Mission`,
    description:
      settings?.metaDescription ||
      "Discover the story behind Real Brother's Restaurant, bringing authentic home-style Indian cuisine (Ghar Jaisa Swad) to Sarfabad, Sector 73 Noida with 25-30 min delivery.",
  };
}

export default async function AboutPage() {
  await connectDB();
  const settings = (await Settings.findOne({}).lean()) || {};

  return (
    <div className="py-12 bg-white min-h-screen w-full max-w-full overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-3.5 py-1.5 rounded-full border border-amber-300">
            Our Culinary Journey • Estd. 2024
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight">
            About {settings.storeName || "REAL BROTHER'S RESTAURANT"}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Serving true &quot;Ghar Jaisa Swad&quot; crafted with fresh ingredients, pure hand-ground spices, and 25-30 minute express delivery across Sector 73, 74 &amp; 76 Noida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gradient-to-br from-amber-50/60 to-red-50/40 rounded-3xl p-6 sm:p-10 border border-amber-200/70">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-amber-400/80 bg-stone-950 p-2">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image
                src="/images/logo-square.jpg"
                alt="Real Brother's Restaurant Logo"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-amber-300 text-amber-800 text-xs font-black">
              <span>⭐ 4.9 on Google Business Profile</span>
            </div>
            <h2 className="text-2xl font-black text-gray-900">
              Rooted in Authentic Ghar Jaisa Swad
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {settings.aboutText ||
                "Real Brother's Restaurant was established in 2024 in Sarfabad, Sector 73 Noida with a singular mission: serving genuine, hearty North Indian, Tandoori, and Chinese cuisine with restaurant hygiene and home-style warmth."}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              📍 <strong>Location:</strong> Gali Number 5, Vishal, Sarfabad Village, Sector 73, Noida - 201301. <br />
              ⏰ <strong>Hours:</strong> Daily {settings.storeTimings || "08:00 AM - 12:00 AM Midnight"}.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-700 hover:to-amber-700 text-white font-bold text-xs shadow-md transition-all"
              >
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={settings.googleBusinessUrl || "https://share.google/UPOhBCowyPZ07exvK"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-amber-50 text-amber-900 font-bold text-xs border border-amber-300 shadow-2xs transition-all"
              >
                <span>View Google Maps Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* 3 Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-amber-100 bg-amber-50/40 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-800 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">Authentic Ghar Jaisa Swad</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Fresh paneer, hand-ground spices, and traditional recipes cooked with care and minimal excess oil.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50/60 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">Strict Kitchen Hygiene</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Stainless-steel prep tables, sanitized cutlery, and spill-proof tamper-evident sealed packaging.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50/60 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">Express 25-30 Min Delivery</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Dedicated delivery fleet serving Sector 73, 74 (Capetown), 75, and 76 hot and fresh.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
