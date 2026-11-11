"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { DEFAULT_SARFABAD_LOCATION } from "@/lib/marketLocations";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const { settings, availableLocations } = useStore();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const activeLocations =
    availableLocations && availableLocations.length > 0
      ? availableLocations
      : [DEFAULT_SARFABAD_LOCATION];

  const storePhone = settings.storePhone || "+91 78271 18412";
  const cleanPhone = storePhone.replace(/[^0-9]/g, "");

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 p-1 flex items-center justify-center border border-amber-500/40 overflow-hidden">
                <Image
                  src="/images/logo-square.jpg"
                  alt="Real Brother's Restaurant"
                  width={44}
                  height={44}
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
                  {settings.storeName || "REAL BROTHER'S"}
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                  Ghar Jaisa Swad • Estd. 2024
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Your premier destination for authentic, home-style North Indian, Mughlai &amp; Chinese flavors. From sizzling Paneer Tikka Rolls and rich Dal Makhani to crispy Momos and hakka noodles — prepared fresh with pure ingredients and delivered piping hot in 30 minutes.
            </p>

            {/* Google Business Profile Action Pill */}
            <div className="pt-2">
              <a
                href={settings.googleBusinessUrl || "https://share.google/UPOhBCowyPZ07exvK"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-bold transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>⭐ 4.9 Rating on Google Business Profile</span>
              </a>
            </div>
          </div>

          {/* Delivery Locations */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-500" />
              Delivery Locations
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              {activeLocations.map((loc, idx) => (
                <li key={idx}>
                  <Link
                    href={`/${loc.slug}`}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-brand-500">•</span>
                    <span className="font-semibold">{loc.name}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/market-area"
                  className="text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1"
                >
                  View All Hubs &amp; Areas <ChevronRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/menu" className="hover:text-white transition-colors">
                  Explore Full Menu
                </Link>
              </li>
              <li>
                <Link href="/specials" className="hover:text-white transition-colors">
                  Special Dishes
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-white transition-colors text-amber-400 font-semibold">
                  Combos &amp; Offers
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  View My Cart
                </Link>
              </li>
              <li>
                <Link href="/myorders" className="hover:text-white transition-colors">
                  Track Live Orders
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-white transition-colors">
                  About Our Restaurant
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-brand-400 transition-colors inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-500" /> Admin Control
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">
              Get In Touch
            </h3>
            <div className="space-y-2.5 text-sm text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">
                  {settings.storeAddress || "Gali Number 5, Vishal, Sarfabad Village, Sector 73, Noida - 201301"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-500 shrink-0" />
                <a href={`tel:${cleanPhone}`} className="text-xs hover:text-white transition-colors font-semibold">
                  {storePhone}
                </a>
              </div>
              {settings.storeAltPhone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-500 shrink-0" />
                  <a href={`tel:${settings.storeAltPhone.replace(/[^0-9]/g, "")}`} className="text-xs hover:text-white transition-colors">
                    {settings.storeAltPhone}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Open Daily: 08:00 AM - 12:00 AM Midnight</span>
              </div>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${cleanPhone}?text=Namaste%20Real%20Brother%27s%20Restaurant%2C%20mujhe%20food%20order%20karna%20hai.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Live Order</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {settings.storeName || "REAL BROTHER'S RESTAURANT"}. All rights reserved.</p>
          <p className="text-center md:text-right text-slate-400 font-medium">
            Ghar Jaisa Swad • Sarfabad, Sector 73 Noida • Express 30-Min Delivery
          </p>
        </div>
      </div>
    </footer>
  );
}
