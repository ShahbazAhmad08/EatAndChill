"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import {
  ShoppingBag,
  User,
  Search,
  Menu,
  X,
  MapPin,
  Phone,
  ShieldCheck,
  ChevronDown,
  LogOut,
  Package,
  SlidersHorizontal,
  Flame,
} from "lucide-react";

export default function Navbar() {
  const {
    getTotalCartCount,
    getTotalCartAmount,
    token,
    user,
    logout,
    toggleLoginPopup,
    searchQuery,
    setSearchQuery,
    settings,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // If in admin view, the admin layout provides its own navigation
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Delhi Specials", href: "/delhi-specials", isSpecial: true },
    { name: "Delivery Zones", href: "/delhi-delivery" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact" },
  ];

  const cartCount = getTotalCartCount();
  const cartAmount = getTotalCartAmount();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl shadow-xs border-b border-gray-100 transition-all">
      {/* Top Delhi Delivery Banner Ticker */}
      <div className="bg-gradient-to-r from-brand-600 via-orange-600 to-amber-600 text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
              Delhi NCR
            </span>
            <span className="truncate text-orange-50 font-semibold">
              {settings.bannerNotice ||
                "⚡ 30-Min Fast Food Delivery across Delhi | Free Delivery above ₹499"}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 shrink-0 text-white/90">
            <a
              href={`tel:${settings.storePhone || "+917755013772"}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors font-bold text-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{settings.storePhone || "+91 7755013772"}</span>
            </a>
            <Link
              href="/admin/login"
              className="flex items-center gap-1 text-white/80 hover:text-white underline text-[11px] font-semibold"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & City Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-100 to-orange-50 border border-orange-200/60 p-1.5 shadow-sm group-hover:scale-105 transition-transform">
                <Image
                  src="/assets/eat.png"
                  alt="Eat & Chill Delhi"
                  width={44}
                  height={44}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-gray-950 group-hover:text-brand-600 transition-colors">
                  Eat &amp; Chill
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-brand-500" /> Delhi Hub
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-black px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-orange-50 text-brand-600 shadow-2xs border border-orange-200/50"
                      : "text-gray-700 hover:text-brand-600 hover:bg-gray-50"
                  }`}
                >
                  {link.isSpecial && <Flame className="w-3.5 h-3.5 text-brand-500 fill-brand-500" />}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Search Bar - Desktop & Tablet */}
          <div className="hidden md:flex flex-1 max-w-xs relative items-center">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search momos, rolls, curries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-8 py-2 text-xs font-medium bg-gray-50/80 border border-gray-200/80 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 text-xs text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Right Action Icons: Cart, User Auth, Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            {/* Cart Button with Animated Bounce */}
            <Link
              href="/cart"
              className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 border border-orange-200/80 text-brand-700 font-bold text-xs transition-all shadow-xs active:scale-95"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-brand-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-brand-500 text-white text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center animate-bounce shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-extrabold">
                {cartAmount > 0 ? `₹${cartAmount}` : "Cart"}
              </span>
            </Link>

            {/* User Profile / Login */}
            {!token ? (
              <button
                onClick={toggleLoginPopup}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-brand-500 to-orange-500 hover:from-brand-600 hover:to-orange-600 rounded-full shadow-md shadow-brand-500/20 active:scale-95 transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 py-1.5 px-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-all text-xs font-bold text-gray-800 shadow-2xs"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-brand-500 to-orange-400 text-white font-black flex items-center justify-center text-[10px]">
                    {user?.name ? user.name[0].toUpperCase() : "U"}
                  </div>
                  <span className="hidden md:inline max-w-[90px] truncate">
                    {user?.name || "Account"}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden"
                    >
                      <div className="px-4 py-2 border-b border-gray-100 text-[11px] text-gray-400">
                        Signed in as <br />
                        <strong className="text-gray-900 text-xs font-bold">{user?.name || "Customer"}</strong>
                      </div>
                      <Link
                        href="/myorders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-gray-700 hover:bg-orange-50 hover:text-brand-600 font-bold transition-colors"
                      >
                        <Package className="w-4 h-4 text-brand-500" />
                        <span>My Orders &amp; Track</span>
                      </Link>
                      <Link
                        href="/delhi-delivery"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-gray-700 hover:bg-orange-50 hover:text-brand-600 font-bold transition-colors"
                      >
                        <MapPin className="w-4 h-4 text-brand-500" />
                        <span>Delhi Delivery Info</span>
                      </Link>
                      <hr className="my-1 border-gray-100" />
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 font-bold transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Delhi rolls, paneer, pasta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu with Smooth Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl"
          >
            <div className="flex items-center gap-2 py-2 px-3 bg-orange-50 rounded-xl text-brand-700 text-xs font-bold mb-2">
              <MapPin className="w-4 h-4 text-brand-500" />
              <span>Delivering across all Delhi NCR pin codes</span>
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-bold text-gray-800 hover:bg-orange-50 hover:text-brand-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-600 hover:text-brand-600"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Dashboard Control</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
