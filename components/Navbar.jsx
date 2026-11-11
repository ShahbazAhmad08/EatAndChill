"use client";

import React, { useState, useRef, useEffect } from "react";
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
  Flame,
  Sparkles,
  Check,
} from "lucide-react";

export default function Navbar() {
  const {
    getTotalCartCount,
    getTotalCartAmount,
    token,
    user,
    logout,
    toggleLoginPopup,
    settings,
    selectedLocation,
    setSelectedLocation,
    availableLocations,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const displayLocations =
    availableLocations && availableLocations.length > 0
      ? availableLocations
      : MARKET_LOCATIONS;

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLocationDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // If in admin view, the admin layout provides its own navigation
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const handleSelectLocation = (loc) => {
    setLocationDropdownOpen(false);
    setMobileMenuOpen(false);
    if (!loc) {
      setSelectedLocation(null);
      router.push("/");
    } else {
      setSelectedLocation(loc);
      router.push(`/${loc.slug}`);
    }
  };

  const homeHref = selectedLocation ? `/${selectedLocation.slug}` : "/";

  const navLinks = [
    { name: "Home", href: homeHref },
    { name: "Menu", href: "/menu" },
    { name: "Specials", href: "/specials" },
    { name: "Combos & Offers", href: "/offers", isSpecial: true },
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact" },
  ];

  const cartCount = getTotalCartCount();
  const cartAmount = getTotalCartAmount();

  const storePhone = settings.storePhone || "+91 78271 18412";
  const cleanPhone = storePhone.replace(/[^0-9]/g, "");

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xl shadow-xs border-b border-gray-100 transition-all">
      {/* Top Announcement Ribbon - Notice: Admin link is moved to footer per user request */}
      <div className="bg-gradient-to-r from-brand-700 via-orange-600 to-amber-600 text-white text-xs py-1.5 px-4 font-medium overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 min-w-0">
          <div className="flex items-center gap-2 min-w-0 truncate">
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-200" />
              <span>OFFER</span>
            </span>
            <span className="truncate text-orange-50 font-semibold text-xs">
              ⚡ Fast 30-Min Delivery | Free Delivery Above ₹499 | Authentic Ghar Jaisa Swad
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 shrink-0 text-white/95 text-xs">
            <a
              href={settings.googleBusinessUrl || "https://share.google/UPOhBCowyPZ07exvK"}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-[11px] font-bold text-amber-200 transition-colors"
              title="View Real Brother's Restaurant on Google Business Profile"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Google Profile (⭐ 4.9)</span>
            </a>
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center gap-1 hover:text-white transition-colors font-bold text-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{storePhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Brand Name with Location Dropdown SHIFTED UNDERNEATH */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href={homeHref} className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-100 to-amber-50 border border-amber-300/80 p-0.5 shadow-sm hover:scale-105 transition-transform overflow-hidden shrink-0">
              <Image
                src="/images/logo-square.jpg"
                alt="Real Brother's Restaurant"
                width={48}
                height={48}
                className="object-cover rounded-xl w-full h-full"
                priority
              />
            </Link>

            <div className="flex flex-col relative" ref={dropdownRef}>
              <Link
                href={homeHref}
                className="text-base sm:text-lg font-black tracking-tight text-gray-950 hover:text-brand-600 transition-colors uppercase leading-none"
              >
                REAL BROTHER&apos;S
              </Link>

              {/* Location Selector Shifted Underneath Logo Name */}
              <div className="relative mt-1">
                <button
                  type="button"
                  onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 hover:text-brand-600 transition-colors py-0.5 group"
                  title="Change delivery location"
                >
                  <MapPin className="w-3 h-3 text-brand-500 shrink-0 animate-pulse" />
                  <span className="truncate max-w-[130px] sm:max-w-[170px] border-b border-amber-400/60 pb-0.5">
                    {selectedLocation ? selectedLocation.shortName || selectedLocation.name : "Sarfabad (Noida)"}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 text-amber-700 transition-transform duration-200 ${
                      locationDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Location Popover Dropdown positioned directly below */}
                <AnimatePresence>
                  {locationDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full mt-2 w-76 sm:w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 z-50 overflow-hidden"
                    >
                      <div className="p-2 border-b border-gray-100">
                        <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1.5">
                          Select Delivery Location:
                        </span>
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            placeholder="Search area (e.g. Sarfabad, Sector 73)..."
                            value={locationSearch}
                            onChange={(e) => setLocationSearch(e.target.value)}
                            className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold"
                          />
                        </div>
                      </div>

                      <div className="max-h-64 overflow-y-auto py-1 divide-y divide-gray-50">
                        {/* Default All Locations */}
                        <Link
                          href="/"
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
                              <span className="block font-bold">🌟 All Locations (Universal)</span>
                              <span className="text-[10px] text-gray-400 font-medium">
                                Browse standard menu
                              </span>
                            </div>
                          </div>
                          {!selectedLocation && <Check className="w-4 h-4 text-brand-600" />}
                        </Link>

                        {/* Dynamic Locations (Database & Config) */}
                        {displayLocations
                          .filter((loc) => {
                            const q = locationSearch.toLowerCase().trim();
                            if (!q) return true;
                            return (
                              loc.name.toLowerCase().includes(q) ||
                              (loc.zone && loc.zone.toLowerCase().includes(q)) ||
                              (loc.city && loc.city.toLowerCase().includes(q)) ||
                              (loc.state && loc.state.toLowerCase().includes(q))
                            );
                          })
                          .map((loc) => {
                            const isCurrent = selectedLocation?.slug === loc.slug;
                            return (
                              <Link
                                key={loc.slug}
                                href={`/${loc.slug}`}
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
                                      {loc.zone || loc.city || "Hub"} · ⚡ {loc.avgDeliveryMinutes || 30}m
                                    </span>
                                  </div>
                                </div>
                                {isCurrent && <Check className="w-4 h-4 text-brand-600 shrink-0" />}
                              </Link>
                            );
                          })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Navigation Links - Centered & Spacious */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-black px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
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

          {/* Right Action Icons: Cart & Profile (Clean Circular Avatar, Name Removed) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Cart Button */}
            <Link
              href="/cart"
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 border border-orange-200/80 text-brand-700 font-bold text-xs transition-all shadow-xs active:scale-95"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-brand-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-brand-600 text-white text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center animate-bounce shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="font-black text-xs">
                {cartAmount > 0 ? `₹${cartAmount}` : "Cart"}
              </span>
            </Link>

            {/* User Profile (Notice: Name next to profile icon is REMOVED per user request) */}
            {!token ? (
              <button
                onClick={toggleLoginPopup}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-black text-white bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-700 hover:to-amber-700 rounded-full shadow-md shadow-brand-500/20 active:scale-95 transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            ) : (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-600 via-orange-500 to-amber-500 text-white font-black flex items-center justify-center text-xs shadow-sm hover:scale-105 active:scale-95 transition-all ring-2 ring-amber-300/60"
                  title={user?.name || "My Account"}
                  aria-label="User Account Menu"
                >
                  {user?.name ? user.name[0].toUpperCase() : <User className="w-4 h-4" />}
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
                        <strong className="text-gray-900 text-xs font-bold truncate block">
                          {user?.name || "Customer"}
                        </strong>
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
                        href="/specials"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-gray-700 hover:bg-orange-50 hover:text-brand-600 font-bold transition-colors"
                      >
                        <Flame className="w-4 h-4 text-brand-500" />
                        <span>Chef&apos;s Specials</span>
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
              className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl"
          >
            <button
              onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
              className="w-full flex items-center justify-between py-2.5 px-3 bg-orange-50 rounded-xl text-brand-700 text-xs font-bold mb-2 border border-orange-200/60"
            >
              <div className="flex items-center gap-2 truncate">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0" />
                <span className="truncate">
                  {selectedLocation
                    ? `Delivering to: ${selectedLocation.name}`
                    : "Delivering to: Sarfabad (Noida)"}
                </span>
              </div>
              <span className="text-[10px] uppercase font-black text-brand-600 bg-white px-2 py-0.5 rounded-md shrink-0 shadow-2xs">
                {locationDropdownOpen ? "Close ▴" : "Switch ▾"}
              </span>
            </button>

            {locationDropdownOpen && (
              <div className="p-2 mb-3 bg-gray-50 rounded-2xl border border-gray-200 max-h-60 overflow-y-auto space-y-1">
                <Link
                  href="/"
                  onClick={() => handleSelectLocation(null)}
                  className={`block p-2 rounded-xl text-xs font-bold ${
                    !selectedLocation
                      ? "bg-brand-50 text-brand-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  🌟 All Locations (Universal)
                </Link>
                {displayLocations.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/${loc.slug}`}
                    onClick={() => handleSelectLocation(loc)}
                    className={`block p-2 rounded-xl text-xs font-bold ${
                      selectedLocation?.slug === loc.slug
                        ? "bg-brand-50 text-brand-700 font-black"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    📍 {loc.name} {loc.state ? `(${loc.state})` : ""}
                  </Link>
                ))}
              </div>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-bold text-gray-800 hover:bg-orange-50 hover:text-brand-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
