"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { MessageCircle, ShoppingBag, Phone, Sparkles, AlertTriangle } from "lucide-react";

export default function WhatsAppOrderFloating() {
  const pathname = usePathname();
  const {
    settings,
    selectedLocation,
    cartItems,
    food_list,
    getTotalCartCount,
    getTotalCartAmount,
    userDistanceKm,
  } = useStore();

  // Hide in admin panel
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const maxRadius = settings.maxDeliveryDistanceKm !== undefined ? settings.maxDeliveryDistanceKm : 3;
  const isBeyondRadius = userDistanceKm !== null && userDistanceKm > maxRadius;

  const storePhone = (settings.storePhone || "+91 78271 18412").replace(/[^0-9]/g, "");
  const cartCount = getTotalCartCount();
  const cartAmount = getTotalCartAmount();

  // Filter items in cart
  const cartList = food_list.filter((item) => {
    const id = item._id || item.id;
    return cartItems[id] && cartItems[id] > 0;
  });

  const generateWhatsAppUrl = () => {
    const locText = selectedLocation
      ? selectedLocation.name
      : "Sarfabad (Sector 73 Noida)";

    let message = "";
    if (cartList.length > 0) {
      const itemsText = cartList
        .map((item) => {
          const id = item._id || item.id;
          const qty = cartItems[id];
          return `• ${item.name} x ${qty} = ₹${item.price * qty}`;
        })
        .join("\n");

      const distanceLine = userDistanceKm
        ? `*Distance from Kitchen:* ${userDistanceKm} KM ${isBeyondRadius ? "(Special Distance Order)" : ""}\n`
        : "";

      message =
        `*🛒 NEW FOOD ORDER - REAL BROTHER'S RESTAURANT*\n` +
        `--------------------------------\n` +
        `*Items Ordered:*\n${itemsText}\n` +
        `--------------------------------\n` +
        `*Total Amount:* ₹${cartAmount}\n` +
        `*Delivery Location:* ${locText}\n` +
        distanceLine +
        `--------------------------------\n` +
        `Please confirm my order & share delivery time!`;
    } else if (isBeyondRadius) {
      message =
        `*📍 SPECIAL DISTANCE DELIVERY INQUIRY*\n` +
        `Namaste Real Brother's Restaurant,\n` +
        `Meri location Sarfabad kitchen se lagbhag ${userDistanceKm} KM door hai (Standard radius: ${maxRadius} KM).\n` +
        `Kripya batayein kya aap mere yahan order deliver kar sakte hain?`;
    } else {
      message =
        `Namaste Real Brother's Restaurant,\n` +
        `Mujhe ${locText} me food order karna hai. Kripya menu aur delivery details share karein.`;
    }

    return `https://wa.me/${storePhone}?text=${encodeURIComponent(message)}`;
  };

  const whatsappUrl = generateWhatsAppUrl();

  return (
    <>
      {/* =========================================
          1. DESKTOP FLOATING WHATSAPP BUTTON (md:flex)
          Floating bubble in bottom right corner with pulse glow
          ========================================= */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-50 flex-col items-end gap-2 group">
        {/* Tooltip Pill */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-stone-900 text-white text-xs font-bold py-1.5 px-3 rounded-xl shadow-xl pointer-events-none flex items-center gap-1.5 border border-amber-500/30">
          {isBeyondRadius ? (
            <>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>{userDistanceKm} km away — WhatsApp Order</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {cartCount > 0
                  ? `Order ${cartCount} items via WhatsApp`
                  : "Chat & Order on WhatsApp"}
              </span>
            </>
          )}
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-xs sm:text-sm py-3 px-4 sm:px-5 rounded-full shadow-2xl shadow-emerald-600/40 border border-emerald-300/40 transition-all transform hover:scale-105 active:scale-95"
          aria-label="Order on WhatsApp"
        >
          {/* Animated pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />

          {/* WhatsApp SVG Icon */}
          <svg
            className="w-5 h-5 fill-current shrink-0"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>

          <span>
            {isBeyondRadius
              ? `Distance Order on WhatsApp (${userDistanceKm} km)`
              : cartCount > 0
              ? `Order on WhatsApp (₹${cartAmount})`
              : "Order on WhatsApp"}
          </span>

          {/* Cart items count chip */}
          {cartCount > 0 && (
            <span className="bg-amber-400 text-stone-950 font-black text-[11px] px-2 py-0.5 rounded-full shrink-0 shadow-xs">
              {cartCount}
            </span>
          )}
        </a>
      </div>

      {/* =========================================
          2. MOBILE BOTTOM SQUARE BUTTON BAR (block md:hidden)
          Fixed to the bottom of the screen with square-edge button
          ========================================= */}
      <div className="block md:hidden fixed bottom-0 left-0 right-0 z-50 p-2.5 bg-stone-950/95 backdrop-blur-md border-t border-amber-500/30 shadow-2xl">
        <div className="flex items-center gap-2">
          {/* Main Square WhatsApp Order Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-3.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider rounded-none border border-emerald-400/40 shadow-lg flex items-center justify-center gap-2"
            style={{ borderRadius: "4px" }}
          >
            <svg
              className="w-4 h-4 fill-current shrink-0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span className="truncate">
              {isBeyondRadius
                ? `[ 💬 WhatsApp Order (${userDistanceKm} KM) ]`
                : cartCount > 0
                ? `[ 💬 Order on WhatsApp (₹${cartAmount}) ]`
                : "[ 💬 Order on WhatsApp ]"}
            </span>
          </a>

          {/* Quick Call Square Button */}
          <a
            href={`tel:${storePhone}`}
            className="w-12 h-11 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 font-black flex items-center justify-center shrink-0 border border-amber-300 shadow-md"
            style={{ borderRadius: "4px" }}
            title="Call Restaurant Directly"
            aria-label="Call Restaurant"
          >
            <Phone className="w-5 h-5 fill-current" />
          </a>
        </div>
      </div>
    </>
  );
}
