import React from "react";
import Image from "next/image";
import Link from "next/link";
import connectDB from "@/lib/db";
import Settings from "@/lib/models/Settings";
import { Sparkles, Heart, Award, ShieldCheck, MapPin, ArrowRight } from "lucide-react";

export async function generateMetadata() {
  await connectDB();
  const settings = await Settings.findOne({}).lean();
  return {
    title: `About Us | ${settings?.storeName || "Eat & Chill Delhi"} Story & Mission`,
    description:
      settings?.metaDescription ||
      "Discover the story behind Eat & Chill, Delhi's trusted food brand combining traditional Dilli recipes with modern cloud kitchen hygiene.",
  };
}

export default async function AboutPage() {
  await connectDB();
  const settings = (await Settings.findOne({}).lean()) || {};

  return (
    <div className="py-12 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-orange-100/70 px-3.5 py-1.5 rounded-full">
            Our Delhi Culinary Journey
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
            About {settings.storeName || "Eat & Chill"}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Crafting memorable food moments with fresh ingredients, signature spices, and 30-minute delivery across Delhi NCR.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-orange-50/50 rounded-3xl p-6 sm:p-10 border border-orange-100">
          <div className="relative aspect-video sm:aspect-square rounded-2xl overflow-hidden shadow-lg border-2 border-white">
            <Image
              src="/assets/header_img.png"
              alt="Eat and Chill kitchen cooking"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-gray-900">
              Rooted in Delhi&apos;s Rich Flavors
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {settings.aboutText ||
                "Eat & Chill was founded with a single mission: to bring authentic Delhi cuisine and contemporary global favorites to food lovers with restaurant-grade quality and fast, dependable delivery."}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Serving with pride from our central hubs in {settings.storeAddress || "Connaught Place & South Delhi"}. Operating daily: {settings.storeTimings || "11:00 AM - 3:00 AM"}.
            </p>
            <div className="pt-2">
              <Link
                href="/#explore-menu"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md transition-all"
              >
                <span>View Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50/60 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-brand-600 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">Signature Delhi Spices</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Hand-ground masalas sourced directly from Khari Baoli, roasted fresh to deliver unforgettable aromas.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50/60 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">Hygienic Cloud Kitchens</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              FSSAI compliant, stainless-steel prep stations, temperature-checked staff, and tamper-proof packaging.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50/60 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">Express 30-Min Promise</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Smart route dispatching ensures your meal arrives piping hot without long waits.
            </p>
          </div>
        </div>

        {/* Quick About FAQs */}
        <div className="bg-gray-50/70 rounded-3xl p-6 sm:p-8 border border-gray-200/80">
          <h2 className="text-lg font-black text-gray-900 mb-4 text-center">
            About Eat &amp; Chill FAQs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
            <div className="p-4 rounded-xl bg-white border border-gray-100">
              <strong className="text-gray-900 block mb-1">
                Where are your cloud kitchens located?
              </strong>
              <span>
                We operate multiple delivery kitchens across Delhi NCR including Central Delhi (CP), South Delhi (Green Park &amp; Saket), West Delhi, Noida, and Gurugram.
              </span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-gray-100">
              <strong className="text-gray-900 block mb-1">
                Is your food 100% prepared fresh on order?
              </strong>
              <span>
                Yes! Every curry, roll, pizza, and shake is prepared fresh only after you place your order with 0 artificial preservatives.
              </span>
            </div>
          </div>
        </div>

        {/* Internal Links to Popular Localities */}
        <div className="pt-4 text-center space-y-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
            Delivering Across Popular Delhi NCR Hubs:
          </span>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            {[
              { name: "Connaught Place", slug: "connaught-place" },
              { name: "Hauz Khas", slug: "hauz-khas" },
              { name: "Saket", slug: "saket" },
              { name: "Dwarka", slug: "dwarka" },
              { name: "Rohini", slug: "rohini" },
              { name: "Noida Hub", slug: "noida-sector-18" },
              { name: "Gurugram Cyber City", slug: "gurugram-cyber-city" },
            ].map((hub) => (
              <Link
                key={hub.slug}
                href={`/${hub.slug}`}
                className="bg-orange-50 text-brand-700 hover:bg-orange-100 px-3 py-1 rounded-full border border-orange-200/60 font-semibold transition-colors"
              >
                📍 {hub.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
