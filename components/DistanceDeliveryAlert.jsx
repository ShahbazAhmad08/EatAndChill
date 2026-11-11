"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import {
  MapPin,
  Navigation,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  MessageCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function DistanceDeliveryAlert({ className = "" }) {
  const {
    settings,
    userDistanceKm,
    isCheckingDistance,
    distanceError,
    checkUserDistance,
    getTotalCartAmount,
    getTotalCartCount,
    cartItems,
    food_list,
  } = useStore();

  const maxRadius =
    settings.maxDeliveryDistanceKm !== undefined ? settings.maxDeliveryDistanceKm : 3;
  const storePhone = (settings.storePhone || "+91 78271 18412").replace(/[^0-9]/g, "");
  const cartAmount = getTotalCartAmount();
  const cartCount = getTotalCartCount();

  const isBeyondRadius = userDistanceKm !== null && userDistanceKm > maxRadius;

  // Generate WhatsApp message for distance delivery
  const handleDistanceWhatsAppMessage = () => {
    // Gather ordered items with quantity
    const orderItems = [];
    food_list.forEach((item) => {
      const id = item._id || item.id;
      if (cartItems[id] && cartItems[id] > 0) {
        orderItems.push(`• ${item.name} x ${cartItems[id]} = ₹${item.price * cartItems[id]}`);
      }
    });

    const itemsSummary =
      orderItems.length > 0 ? `\n*Cart Items:*\n${orderItems.join("\n")}\n` : "";

    const message =
      `*📍 SPECIAL DISTANCE DELIVERY REQUEST*\n` +
      `*Restaurant:* Real Brother's Restaurant (Sarfabad Sector 73 Noida)\n` +
      `--------------------------------\n` +
      `Namaste, meri delivery location kitchen se lagbhag *${userDistanceKm} KM* door hai.\n` +
      `Standard website limit *${maxRadius} KM* hai.\n` +
      itemsSummary +
      `*Order Amount:* ₹${cartAmount}\n` +
      `--------------------------------\n` +
      `Kripya batayein kya is distance par special delivery ho sakti hai?`;

    window.open(`https://wa.me/${storePhone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 border transition-all ${
        userDistanceKm === null
          ? "bg-amber-50/60 border-amber-200/80 text-stone-800"
          : isBeyondRadius
          ? "bg-gradient-to-br from-amber-500/10 via-red-500/10 to-amber-500/10 border-amber-400 text-stone-900 shadow-md"
          : "bg-emerald-50/80 border-emerald-300 text-emerald-950 shadow-xs"
      } ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left Side: Status / Distance info */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {userDistanceKm === null ? (
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-700">
                <Navigation className="w-4 h-4" />
              </span>
            ) : isBeyondRadius ? (
              <span className="p-1.5 rounded-lg bg-red-500/20 text-red-600">
                <AlertTriangle className="w-4 h-4" />
              </span>
            ) : (
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            )}

            <h3 className="font-black text-xs sm:text-sm">
              {userDistanceKm === null
                ? "Delivery Distance Check"
                : isBeyondRadius
                ? `Distance: ${userDistanceKm} KM (Exceeds ${maxRadius} KM Radius)`
                : `Within Delivery Radius: ${userDistanceKm} KM (Under ${maxRadius} KM)`}
            </h3>
          </div>

          <p className="text-[11px] sm:text-xs text-stone-600 pl-7 leading-relaxed">
            {userDistanceKm === null ? (
              <>
                Kitchen located in <strong>Sarfabad, Sector 73 Noida</strong>. Standard automated delivery covers up to <strong>{maxRadius} KM</strong>.
              </>
            ) : isBeyondRadius ? (
              <>
                You are <strong>{userDistanceKm} km</strong> away. Standard automated web delivery covers up to <strong>{maxRadius} km</strong>. For deliveries beyond this, please message on WhatsApp so our kitchen manager can arrange special delivery.
              </>
            ) : (
              <>
                Great news! You are only <strong>{userDistanceKm} km</strong> away from our kitchen. Your order will be prepared and delivered hot in <strong>25-30 minutes</strong>.
              </>
            )}
          </p>

          {distanceError && (
            <p className="text-[11px] text-red-600 font-semibold pl-7 pt-1">
              ⚠️ {distanceError}
            </p>
          )}
        </div>

        {/* Right Side Action Button */}
        <div className="flex items-center gap-2 shrink-0 sm:self-center pl-7 sm:pl-0">
          {userDistanceKm === null ? (
            <button
              type="button"
              onClick={checkUserDistance}
              disabled={isCheckingDistance}
              className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
            >
              {isCheckingDistance ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Calculating...</span>
                </>
              ) : (
                <>
                  <Navigation className="w-3.5 h-3.5 text-amber-400" />
                  <span>Check My Distance</span>
                </>
              )}
            </button>
          ) : isBeyondRadius ? (
            <button
              type="button"
              onClick={handleDistanceWhatsAppMessage}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-2 shadow-md shadow-emerald-600/30 transition-all active:scale-95 cursor-pointer border border-emerald-400/40"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Message on WhatsApp for Order</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={checkUserDistance}
              className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 underline flex items-center gap-1 cursor-pointer"
            >
              <span>Re-check ({userDistanceKm} km)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

