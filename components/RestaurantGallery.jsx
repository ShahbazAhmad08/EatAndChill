"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Star,
  ExternalLink,
  Flame,
  Clock,
  Phone,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Utensils,
} from "lucide-react";

export default function RestaurantGallery() {
  const [activeFilter, setActiveFilter] = useState("all");

  const galleryItems = [
    {
      id: 1,
      title: "Real Brother's Royal Emblem",
      tag: "Brand Legacy",
      category: "ambience",
      image: "/images/real-brothers-logo.jpg",
      description: "Established in 2024 with a singular mission: serving true 'Ghar Jaisa Swad' to food lovers in Noida.",
    },
    {
      id: 2,
      title: "Paneer Tikka Kathi Roll",
      tag: "Best Seller",
      category: "dishes",
      image: "/images/1748855744177-food_5.png",
      description: "Flaky whole-wheat layered paratha wrapped around smoky tandoori paneer cubes, mint chutney, and spiced onion rings.",
    },
    {
      id: 3,
      title: "Shahi Paneer Handi & Butter Naan",
      tag: "Chef Special",
      category: "dishes",
      image: "/images/1748856447325-food_7.png",
      description: "Slow-simmered cottage cheese in a velvety cashew and tomato gravy with pure aromatic Indian spices.",
    },
    {
      id: 4,
      title: "Dal Makhani Bukhara Handi",
      tag: "Slow Cooked 12 Hrs",
      category: "dishes",
      image: "/images/1748856495137-food_8.png",
      description: "Creamy black lentils slow-cooked overnight with churned butter and dried fenugreek leaves.",
    },
    {
      id: 5,
      title: "Crispy Kurkure & Steam Momos",
      tag: "Evening Snack",
      category: "snacks",
      image: "/images/1748857595206-food_16.png",
      description: "Crispy coated kurkure momos stuffed with juicy spiced filling and served with fiery red garlic dip.",
    },
    {
      id: 6,
      title: "Veg Hakka Noodles & Manchurian",
      tag: "Indo-Chinese",
      category: "chinese",
      image: "/images/1748855950554-food_9.png",
      description: "Wok-tossed noodles with crunchy julienned veggies, dark soy sauce, and aromatic garlic.",
    },
  ];

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 text-white relative overflow-hidden" id="gallery">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ghar Jaisa Swad • Our Story &amp; Gallery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              A Taste of Real Brother&apos;s
            </h2>
            <p className="text-stone-400 text-sm sm:text-base max-w-xl">
              Freshly prepared with pure ingredients, hand-ground spices, and traditional recipes in our Sarfabad, Sector 73 Noida kitchen.
            </p>
          </div>

          {/* Google Profile Connect Banner */}
          <a
            href="https://share.google/UPOhBCowyPZ07exvK"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3.5 bg-gradient-to-r from-stone-800/90 to-stone-800/50 hover:to-stone-700/60 border border-amber-500/30 hover:border-amber-400 px-5 py-3 rounded-2xl transition-all shadow-lg shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
              ⭐
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-white group-hover:text-amber-400 transition-colors">
                <span>Google Business Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <span className="text-[11px] text-amber-300/80 font-bold">
                ⭐ 4.9 Stars • 1,200+ Reviews
              </span>
            </div>
          </a>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "all", label: "All Photos & Specialties" },
            { id: "dishes", label: "Tandoor & Curries" },
            { id: "snacks", label: "Rolls & Momos" },
            { id: "chinese", label: "Indo-Chinese" },
            { id: "ambience", label: "Restaurant Emblem" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === cat.id
                  ? "bg-gradient-to-r from-brand-600 to-amber-600 text-white shadow-md shadow-brand-600/30 font-black"
                  : "bg-stone-800/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700/60"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-stone-900 border border-stone-800 hover:border-amber-500/50 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 w-full bg-stone-950 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 380px"
                />
                <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-black text-amber-300 border border-amber-500/30 flex items-center gap-1 shadow-sm">
                  <Flame className="w-3 h-3 text-brand-500" />
                  <span>{item.tag}</span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {item.description}
                </p>
                <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-500">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% Fresh Prep
                  </span>
                  <Link
                    href="/menu"
                    className="text-amber-400 hover:text-amber-300 font-bold inline-flex items-center gap-1"
                  >
                    <span>Order Now</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Business Profile & Showroom Information Box */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-3 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="bg-amber-500/20 text-amber-400 text-xs font-black px-3 py-1 rounded-full border border-amber-500/30">
                ⭐ 4.9 Verified on Google Maps
              </span>
              <span className="bg-emerald-500/20 text-emerald-400 text-xs font-black px-3 py-1 rounded-full border border-emerald-500/30">
                ⚡ Express Delivery Hub Active
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Real Brother&apos;s Restaurant — Sarfabad, Sector 73 Noida
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              📍 Gali Number 5, Vishal, Sarfabad Village, Sector 73, Noida, UP - 201301 (Near Tivoli / Sector 74) <br />
              📞 Hotline: <a href="tel:+917827118412" className="text-amber-400 font-bold hover:underline">+91 78271 18412</a> | Alt: +91 63664 14326 | ⏰ 08:00 AM - 12:00 AM Midnight
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="https://share.google/UPOhBCowyPZ07exvK"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/20 flex items-center gap-2 transition-all"
            >
              <MapPin className="w-4 h-4 text-stone-950" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://wa.me/917827118412?text=Namaste%20Real%20Brother%27s%20Restaurant%2C%20mujhe%20order%20place%20karna%20hai."
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-emerald-600/20 flex items-center gap-2 transition-all"
            >
              <span>WhatsApp Order</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

