"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export const menu_categories = [
  { name: "All", image: "/assets/menu_1.png", tag: "All Flavours" },
  { name: "Specials", image: "/assets/menu_6.png", tag: "Chef's Picks" },
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
  const scrollContainerRef = useRef(null);

  const allCategory = menu_categories[0];
  const otherCategories = menu_categories.slice(1);
  const isAllActive = category === "All";

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-14 bg-white" id="explore-menu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-10 space-y-2"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-brand-700 text-xs font-black uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>Fresh &amp; Delicious Categories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
            Explore Our Delicious Menu
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Handcrafted with aromatic spices, farm-fresh ingredients, and delivered hot in 30 minutes. Select a category below or visit our dedicated menu page.
          </p>
        </motion.div>

        {/* Carousel Wrapper with Sticky "All" on Left */}
        <div className="relative group/carousel">
          {/* Desktop Scroll Left Button */}
          <button
            onClick={() => handleScroll("left")}
            aria-label="Scroll categories left"
            className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white shadow-lg border border-gray-200 items-center justify-center text-gray-700 hover:text-brand-600 hover:scale-110 active:scale-95 transition-all opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Desktop Scroll Right Button */}
          <button
            onClick={() => handleScroll("right")}
            aria-label="Scroll categories right"
            className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white shadow-lg border border-gray-200 items-center justify-center text-gray-700 hover:text-brand-600 hover:scale-110 active:scale-95 transition-all opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Horizontal Scroll Track */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-4 sm:gap-6 overflow-x-auto py-3 px-2 sm:px-4 no-scrollbar scroll-smooth relative"
          >
            {/* 1. STICKY "ALL" CATEGORY CARD (Stays stuck on the left when scrolling, other cards slide under it) */}
            <div className="sticky left-0 z-20 shrink-0 bg-white/95 backdrop-blur-md pl-1 pr-3.5 py-1 rounded-3xl shadow-[8px_0_16px_-4px_rgba(0,0,0,0.12)]">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setCategory("All")}
                className={`flex flex-col items-center shrink-0 p-3.5 rounded-3xl transition-all duration-300 focus:outline-none ${
                  isAllActive
                    ? "bg-gradient-to-b from-brand-500 to-orange-500 text-white shadow-xl shadow-brand-500/30 scale-105"
                    : "bg-gray-50/90 hover:bg-orange-50/70 text-gray-800 hover:text-brand-600 border border-gray-200/80"
                }`}
              >
                <div
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1.5 mb-2 transition-all duration-300 overflow-hidden ${
                    isAllActive
                      ? "ring-4 ring-white/60 bg-white shadow-md"
                      : "bg-white border border-gray-100 shadow-sm"
                  }`}
                >
                  <Image
                    src={allCategory.image}
                    alt={allCategory.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                <span className="text-xs sm:text-sm font-extrabold truncate max-w-[95px]">
                  {allCategory.name}
                </span>
                <span
                  className={`text-[10px] hidden sm:block font-medium ${
                    isAllActive ? "text-orange-100" : "text-gray-400"
                  }`}
                >
                  {allCategory.tag}
                </span>
              </motion.button>
            </div>

            {/* 2. REMAINING CATEGORIES (Slide underneath the sticky "All" card) */}
            {otherCategories.map((item, index) => {
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
