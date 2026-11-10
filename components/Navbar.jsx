"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { MARKET_LOCATIONS } from "@/lib/marketLocations";
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
  Sparkles,
  Check,
  CheckCircle2,
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
    selectedLocation,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  // If in admin view, the admin layout provides its own navigation
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const handleSelectLocation = (loc) => {
    if (!loc) {
      // Revert to default home /
      setSelectedLocation(null);
      setLocationDropdownOpen(false);
      setMobileMenuOpen(false);
      router.push("/");
    } else {
      setSelectedLocation(loc);
      setLocationDropdownOpen(false);
      setMobileMenuOpen(false);
      router.push(`/${loc.slug}`);
    }
  };

  const homeHref = selectedLocation ? `/${selectedLocation.slug}` : "/";

  const navLinks = [
    { name: "Home", href: homeHref },
    { name: "Menu", href: "/menu" },
    { name: "Delhi Specials", href: "/delhi-specials" },
    { name: "Combos & Offers", href: "/offers", isSpecial: true },
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
            <button
              onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
              className="flex items-center gap-1.5 hover:opacity-90 transition-opacity truncate text-left"
            >
              <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shrink-0 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-orange-200" />
                {selectedLocation ? selectedLocation.shortName || selectedLocation.name : "Delhi NCR"}
              </span>
              <span className="truncate text-orange-50 font-semibold text-xs">
                {selectedLocation
                  ? `⚡ Delivering in ${selectedLocation.avgDeliveryMinutes} mins to ${selectedLocation.name} · Free above ₹499`
                  : (settings.bannerNotice || "⚡ 30-Min Fast Food Delivery across 22+ Delhi NCR Areas | Free above ₹499")}
              </span>
            </button>
          </div>
          <div className="hidden md:flex items-center gap-4 shrink-0 text-white/90">
            <button
              onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
              className="text-[11px] font-bold text-orange-100 hover:text-white underline transition-colors"
            >
              {selectedLocation ? "Switch Location ▾" : "Choose Location ▾"}
            </button>
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
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & City Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href={homeHref} className="flex items-center gap-2.5 group">
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
                  <MapPin className="w-3 h-3 text-brand-500 animate-pulse" />
                  <span className="max-w-[120px] truncate">
                    {selectedLocation ? selectedLocation.shortName || selectedLocation.name : "Delhi NCR Hub"}
                  </span>
                </span>
              </div>
            </Link>

            {/* Location Selector Dropdown Button */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 hover:bg-orange-100/80 border border-orange-200/70 text-brand-700 text-xs font-black transition-all shadow-2xs group"
                title="Change delivery location"
              >
                <MapPin className="w-3.5 h-3.5 text-brand-500" />
                <span className="max-w-[110px] truncate">
                  {selectedLocation ? selectedLocation.shortName || selectedLocation.name : "Select Area"}
                </span>
                <ChevronDown className={`w-3 h-3 text-brand-600 transition-transform ${locationDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Location Popover Dropdown */}
              <AnimatePresence>
                {locationDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full mt-2 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 p-3 z-50 overflow-hidden"
                  >
                    <div className="p-2 border-b border-gray-100">
                      <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1.5">
                        Select Delivery Market Area:
                      </span>
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search 22+ areas or pincode..."
                          value={locationSearch}
                          onChange={(e) => setLocationSearch(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold"
                        />
                      </div>
                    </div>

                    <div className="max-h-64 overflow-y-auto py-1 divide-y divide-gray-50">
                      {/* Default All Delhi NCR */}
                      <button
                        onClick={() => handleSelectLocation(null)}
                        className={`w-full p-2.5 rounded-xl text-left text-xs font-black flex items-center justify-between transition-colors ${
                          !selectedLocation
                            ? "bg-brand-50 text-brand-700"
                            : "hover:bg-gray-50 text-gray-800"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-brand-500" />
                          <div>
                            <span className="block font-bold">🌟 All Delhi NCR (Default)</span>
                            <span className="text-[10px] text-gray-400 font-medium">Whole region express coverage</span>
                          </div>
                        </div>
                        {!selectedLocation && <Check className="w-4 h-4 text-brand-600" />}
                      </button>

                      {/* 22 Locations */}
                      {MARKET_LOCATIONS.filter((loc) => {
                        const q = locationSearch.toLowerCase().trim();
                        if (!q) return true;
                        return (
                          loc.name.toLowerCase().includes(q) ||
                          loc.zone.toLowerCase().includes(q) ||
                          loc.pincodes.some((pin) => pin.includes(q))
                        );
                      }).map((loc) => {
                        const isCurrent = selectedLocation?.slug === loc.slug;
                        return (
                          <button
                            key={loc.slug}
                            onClick={() => handleSelectLocation(loc)}
                            className={`w-full p-2.5 rounded-xl text-left text-xs flex items-center justify-between transition-colors ${
                              isCurrent
                                ? "bg-brand-50 text-brand-700 font-black"
                                : "hover:bg-gray-50 text-gray-800 font-bold"
                            }`}
                          >
                            <div className="flex items-start gap-2 truncate">
                              <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                              <div className="truncate">
                                <span className="block truncate">{loc.name}</span>
                                <span className="text-[10px] text-gray-400 font-semibold block">
                                  {loc.zone} · ⚡ {loc.avgDeliveryMinutes}m
                                </span>
                              </div>
                            </div>
                            {isCurrent && <Check className="w-4 h-4 text-brand-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
            <button
              onClick={() => {
                setLocationDropdownOpen(!locationDropdownOpen);
              }}
              className="w-full flex items-center justify-between py-2.5 px-3 bg-orange-50 rounded-xl text-brand-700 text-xs font-bold mb-2 border border-orange-200/60"
            >
              <div className="flex items-center gap-2 truncate">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0" />
                <span className="truncate">
                  {selectedLocation ? `Delivering to: ${selectedLocation.name}` : "Delivering to: All Delhi NCR"}
                </span>
              </div>
              <span className="text-[10px] uppercase font-black text-brand-600 bg-white px-2 py-0.5 rounded-md shrink-0 shadow-2xs">
                Switch ▾
              </span>
            </button>
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
