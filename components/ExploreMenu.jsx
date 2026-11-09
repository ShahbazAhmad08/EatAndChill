"use client";

import React from "react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { Sparkles } from "lucide-react";

export const menu_categories = [
  { name: "All", image: "/assets/menu_1.png", tag: "All Cuisines" },
  { name: "Delhi Specials", image: "/assets/menu_6.png", tag: "Dilli Favourites" },
  { name: "Salad", image: "/assets/menu_1.png", tag: "Fresh Greens" },
  { name: "Rolls", image: "/assets/menu_2.png", tag: "Kathi & Spring" },
  { name: "Desert", image: "/assets/menu_3.png", tag: "Sweet Cravings" },
  { name: "Sandwich", image: "/assets/menu_4.png", tag: "Grilled & Club" },
  { name: "Cake", image: "/assets/menu_5.png", tag: "Celebration Slices" },
  { name: "Pure veg", image: "/assets/menu_6.png", tag: "100% Shahi Veg" },
  { name: "Pasta", image: "/assets/menu_7.png", tag: "Italian Gourmet" },
  { name: "Noodles", image: "/assets/menu_8.png", tag: "Wok Stir-Fried" },
];

export default function ExploreMenu() {
  const { category, setCategory } = useStore();

  return (
    <section className="py-12 bg-white" id="explore-menu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-brand-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            Curated Categories
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Explore Our Delicious Menu
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Handpicked specialties crafted with fresh ingredients, authentic Delhi spices, and culinary love. Select a category below to filter.
          </p>
        </div>

        {/* Categories Horizontal Scroll / Grid */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-4 no-scrollbar justify-start md:justify-center">
          {menu_categories.map((item, index) => {
            const isActive = category === item.name;
            return (
              <button
                key={index}
                onClick={() => setCategory(item.name)}
                className={`flex flex-col items-center shrink-0 p-3 rounded-2xl transition-all group focus:outline-none ${
                  isActive
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105"
                    : "bg-gray-50 hover:bg-orange-50 text-gray-700 hover:text-brand-600 border border-gray-200/60"
                }`}
              >
                <div
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-2 mb-2 transition-transform duration-300 group-hover:scale-110 overflow-hidden ${
                    isActive ? "ring-4 ring-white/50 bg-white" : "bg-white border border-gray-200 shadow-sm"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                <span className="text-xs sm:text-sm font-bold truncate max-w-[90px]">
                  {item.name}
                </span>
                <span
                  className={`text-[10px] hidden sm:block ${
                    isActive ? "text-orange-100" : "text-gray-400"
                  }`}
                >
                  {item.tag}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

