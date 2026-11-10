"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Heart,
  ChevronRight,
  Sparkles,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const deliveryZones = [
    { name: "Connaught Place (110001)", slug: "connaught-place" },
    { name: "Hauz Khas & Green Park (110016)", slug: "hauz-khas" },
    { name: "Saket & Malviya Nagar (110017)", slug: "saket" },
    { name: "Greater Kailash & GK-2 (110048)", slug: "greater-kailash" },
    { name: "Dwarka Sub-City (110075)", slug: "dwarka" },
    { name: "Rohini (110085)", slug: "rohini" },
    { name: "Noida Sector 18 & 62 (201301)", slug: "noida-sector-18" },
    { name: "Gurugram CyberHub (122002)", slug: "gurugram-cyber-city" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 p-1.5 flex items-center justify-center border border-orange-500/30">
                <Image
                  src="/assets/eat.png"
                  alt="Eat & Chill Delhi"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Eat &amp; Chill
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Delhi NCR&apos;s premier food delivery experience. From sizzling Old Delhi paneer rolls and rich Dal Makhani to authentic Italian pastas and artisan desserts — prepared fresh, packaged hygienically, and delivered in 30 minutes.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-brand-600 text-white flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="Facebook"
              >
                fb
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-brand-600 text-white flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="Instagram"
              >
                ig
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-brand-600 text-white flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="Twitter"
              >
                tw
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-brand-600 text-white flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="LinkedIn"
              >
                in
              </a>
            </div>
          </div>

          {/* Delhi Delivery Zones */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-500" />
              Delivery Market Areas
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {deliveryZones.map((zone, idx) => (
                <li key={idx}>
                  <Link
                    href={`/${zone.slug}`}
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-brand-500">•</span>
                    <span>{zone.name}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/market-area"
                  className="text-brand-400 hover:text-brand-300 font-semibold inline-flex items-center gap-1"
                >
                  View all 22+ Market Areas <ChevronRight className="w-3 h-3" />
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
                  Explore Full Menu (24+ Dishes)
                </Link>
              </li>
              <li>
                <Link href="/specials" className="hover:text-white transition-colors">
                  Specials Menu
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-white transition-colors text-amber-400 font-semibold">
                  Combos &amp; Discount Deals
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
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy &amp; Security
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-brand-400 transition-colors inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-500" /> Admin Control
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Delhi Hours */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">
              Get In Touch
            </h3>
            <div className="space-y-2.5 text-sm text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <span className="text-xs">
                  Connaught Place Delivery Kitchen, Central Delhi &amp; Saket Hub, New Delhi 110001
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-500 shrink-0" />
                <a href="tel:+917755013772" className="text-xs hover:text-white transition-colors">
                  +91 77550 13772
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                <a href="mailto:sa798027@gmail.com" className="text-xs hover:text-white transition-colors">
                  sa798027@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Open Daily: 11:00 AM - 3:00 AM</span>
              </div>
              <div className="pt-2">
                <a
                  href="https://wa.me/917755013772?text=Hello%20Eat%20%26%20Chill%20Delhi%2C%20I%20have%20an%20inquiry%20about%20my%20food%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Live Kitchen</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Eat &amp; Chill Delhi. All rights reserved.</p>
          <p className="text-center md:text-right text-slate-400 font-medium">
            FSSAI Certified Cloud Kitchen • Express 30-Min Delivery Across Delhi NCR
          </p>
        </div>
      </div>
    </footer>
  );
}

