"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { Sparkles, Utensils, ArrowRight } from "lucide-react";

export const menu_categories = [
  { name: "All", image: "/assets/menu_1.png", tag: "All Flavours" },
  { name: "Delhi Specials", image: "/assets/menu_6.png", tag: "Dilli Favourites" },
  { name: "Salad", image: "/assets/menu_1.png", tag: "Fresh Greens" },
  { name: "Rolls", image: "/assets/menu_2.png", tag: "Kathi & Spring" },
  { name: "Desert", image: "/assets/menu_3.png", tag: "Sweet Treats" },
  { name: "Sandwich", image: "/assets/menu_4.png", tag: "Grilled & Club" },
  { name: "Cake", image: "/assets/menu_5.png", tag: "Bakery Slices" },
  { name: "Pure veg", image: "/assets/menu_6.png", tag: "100% Veggie" },
  { name: "Pasta", image: "/assets/menu_7.png", tag: "Italian Creamy" },
  { name: "Noodles", image: "/assets/menu_8.png", tag: "Wok Tossed" },
];

export default function ExploreMenu() {
  const { category, setCategory } = useStore();

  return (
    <section className="py-14 bg-white" id="explore-menu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-10 space-y-2"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-brand-700 text-xs font-black uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>Curated Delhi Categories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
            Explore Our Delicious Menu
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Handcrafted with authentic Delhi spices, farm-fresh ingredients, and delivered hot in 30 minutes. Select a category below or visit our dedicated menu page.
          </p>
        </motion.div>

        {/* Categories Horizontal Carousel (Fixed Left-clipping bug by using clean padding & safe scroll) */}
        <div className="relative">
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto py-3 px-4 no-scrollbar justify-start">
            {menu_categories.map((item, index) => {
              const isActive = category === item.name;
              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCategory(item.name)}
                  className={`flex flex-col items-center shrink-0 p-3.5 rounded-3xl transition-all duration-300 group focus:outline-none ${
                    isActive
                      ? "bg-gradient-to-b from-brand-500 to-orange-500 text-white shadow-xl shadow-brand-500/25 scale-105"
                      : "bg-gray-50/90 hover:bg-orange-50/70 text-gray-800 hover:text-brand-600 border border-gray-200/70"
                  }`}
                >
                  <div
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1.5 mb-2 transition-all duration-300 overflow-hidden ${
                      isActive
                        ? "ring-4 ring-white/60 bg-white shadow-md"
                        : "bg-white border border-gray-100 shadow-sm group-hover:shadow"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full rounded-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold truncate max-w-[95px]">
                    {item.name}
                  </span>
                  <span
                    className={`text-[10px] hidden sm:block font-medium ${
                      isActive ? "text-orange-100" : "text-gray-400"
                    }`}
                  >
                    {item.tag}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Link to dedicated menu page */}
        <div className="mt-8 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-brand-600 hover:text-brand-700 transition-colors"
          >
            <span>View Full Catalog with Filters &amp; Sorting</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
