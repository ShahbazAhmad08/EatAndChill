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
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const displayLocations =
    availableLocations && availableLocations.length > 0
      ? availableLocations
      : MARKET_LOCATIONS;

  // Track window scroll for sticky navbar background transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-stone-950/98 backdrop-blur-2xl shadow-2xl shadow-black/50 border-b border-amber-500/30"
          : "bg-stone-950/90 backdrop-blur-xl border-b border-stone-800/80 shadow-md"
      }`}
    >
      {/* Top Announcement Ribbon - Royal Dark Crimson & Gold */}
      <div className="bg-gradient-to-r from-red-950 via-stone-900 to-amber-950 text-white text-xs py-1.5 px-4 font-medium border-b border-amber-500/20 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 min-w-0">
          <div className="flex items-center gap-2 min-w-0 truncate">
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>OFFER</span>
            </span>
            <span className="truncate text-stone-200 font-semibold text-xs">
              ⚡ Fast 30-Min Delivery | Free Delivery Above ₹499 | Authentic Ghar Jaisa Swad
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 shrink-0 text-white/95 text-xs">
            <a
              href={settings.googleBusinessUrl || "https://share.google/UPOhBCowyPZ07exvK"}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-[11px] font-bold text-amber-300 transition-colors"
              title="View Real Brother's Restaurant on Google Business Profile"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Google Profile (⭐ 4.9)</span>
            </a>
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center gap-1.5 text-stone-300 hover:text-amber-300 transition-colors font-bold text-xs"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
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
            <Link
              href={homeHref}
              className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500/30 to-amber-300/10 border-2 border-amber-400/80 p-0.5 shadow-lg shadow-amber-500/20 hover:scale-105 transition-transform overflow-hidden shrink-0"
            >
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
                className="text-base sm:text-lg font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 hover:opacity-90 transition-opacity uppercase leading-none"
              >
                REAL BROTHER&apos;S
              </Link>

              {/* Location Selector Shifted Underneath Logo Name */}
              <div className="relative mt-1">
                <button
                  type="button"
                  onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                  className="inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-400 hover:text-amber-200 transition-colors py-0.5 group"
                  title="Change delivery location"
                >
                  <MapPin className="w-3 h-3 text-red-500 shrink-0 animate-pulse" />
                  <span className="truncate max-w-[130px] sm:max-w-[170px] border-b border-amber-400/40 pb-0.5 text-stone-200 group-hover:text-amber-200">
                    {selectedLocation ? selectedLocation.shortName || selectedLocation.name : "Sarfabad (Noida)"}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 text-amber-400 transition-transform duration-200 ${
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
                      className="absolute left-0 top-full mt-2 w-76 sm:w-80 bg-stone-900 rounded-2xl shadow-2xl border border-amber-500/30 p-3 z-50 overflow-hidden text-white"
                    >
                      <div className="p-2 border-b border-stone-800">
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block mb-1.5">
                          Select Delivery Location:
                        </span>
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            placeholder="Search area (e.g. Sarfabad, Sector 73)..."
                            value={locationSearch}
                            onChange={(e) => setLocationSearch(e.target.value)}
                            className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-950 border border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold text-white placeholder-stone-500"
                          />
                        </div>
                      </div>

                      <div className="max-h-64 overflow-y-auto py-1 divide-y divide-stone-800">
                        {/* Default All Locations */}
                        <Link
                          href="/"
                          onClick={() => handleSelectLocation(null)}
                          className={`w-full p-2.5 rounded-xl text-left text-xs font-black flex items-center justify-between transition-colors ${
                            !selectedLocation
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                              : "hover:bg-stone-800 text-stone-300"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                            <div>
                              <span className="block font-bold">🌟 All Locations (Universal)</span>
                              <span className="text-[10px] text-stone-400 font-medium">
                                Browse standard menu
                              </span>
                            </div>
                          </div>
                          {!selectedLocation && <Check className="w-4 h-4 text-amber-400" />}
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
                                    ? "bg-amber-500/20 text-amber-300 font-black border border-amber-500/40"
                                    : "hover:bg-stone-800 text-stone-300 font-bold"
                                }`}
                              >
                                <div className="flex items-start gap-2 truncate">
                                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                                  <div className="truncate">
                                    <span className="block truncate">{loc.name}</span>
                                    <span className="text-[10px] text-stone-400 font-semibold block">
                                      {loc.zone || loc.city || "Hub"} · ⚡ {loc.avgDeliveryMinutes || 30}m
                                    </span>
                                  </div>
                                </div>
                                {isCurrent && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
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

          {/* Navigation Links - Royal Stone & Amber Glow */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-black px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-amber-500/20 text-amber-300 shadow-sm border border-amber-400/40"
                      : "text-stone-300 hover:text-amber-300 hover:bg-stone-900/80"
                  }`}
                >
                  {link.isSpecial && <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons: Cart & Profile (Clean Circular Avatar) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Cart Button */}
            <Link
              href="/cart"
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-stone-900/90 hover:bg-stone-800 border border-amber-500/40 text-amber-300 font-bold text-xs transition-all shadow-md active:scale-95"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-red-600 text-white text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center animate-bounce shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="font-black text-xs text-amber-200">
                {cartAmount > 0 ? `₹${cartAmount}` : "Cart"}
              </span>
            </Link>

            {/* User Profile (Clean Circular Avatar) */}
            {!token ? (
              <button
                onClick={toggleLoginPopup}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-black text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-full shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            ) : (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 via-amber-500 to-red-600 text-stone-950 font-black flex items-center justify-center text-xs shadow-md hover:scale-105 active:scale-95 transition-all ring-2 ring-amber-400/80"
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
                      className="absolute right-0 mt-2 w-52 bg-stone-900 rounded-2xl shadow-2xl border border-amber-500/30 py-2 z-50 overflow-hidden text-white"
                    >
                      <div className="px-4 py-2 border-b border-stone-800 text-[11px] text-stone-400">
                        Signed in as <br />
                        <strong className="text-amber-300 text-xs font-bold truncate block">
                          {user?.name || "Customer"}
                        </strong>
                      </div>
                      <Link
                        href="/myorders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-stone-200 hover:bg-stone-800 hover:text-amber-300 font-bold transition-colors"
                      >
                        <Package className="w-4 h-4 text-amber-400" />
                        <span>My Orders &amp; Track</span>
                      </Link>
                      <Link
                        href="/specials"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-stone-200 hover:bg-stone-800 hover:text-amber-300 font-bold transition-colors"
                      >
                        <Flame className="w-4 h-4 text-amber-400" />
                        <span>Chef&apos;s Specials</span>
                      </Link>
                      <hr className="my-1 border-stone-800" />
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-400 hover:bg-red-950/40 font-bold transition-colors text-left"
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
              className="md:hidden p-2 rounded-xl text-stone-300 hover:bg-stone-900 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5 text-amber-400" />}
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
            className="md:hidden border-t border-stone-800 bg-stone-950 px-4 pt-3 pb-6 space-y-2 shadow-2xl"
          >
            <button
              onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
              className="w-full flex items-center justify-between py-2.5 px-3 bg-stone-900 rounded-xl text-amber-300 text-xs font-bold mb-2 border border-amber-500/30"
            >
              <div className="flex items-center gap-2 truncate">
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                <span className="truncate text-stone-200">
                  {selectedLocation
                    ? `Delivering to: ${selectedLocation.name}`
                    : "Delivering to: Sarfabad (Noida)"}
                </span>
              </div>
              <span className="text-[10px] uppercase font-black text-stone-950 bg-amber-400 px-2 py-0.5 rounded-md shrink-0 shadow-xs">
                {locationDropdownOpen ? "Close ▴" : "Switch ▾"}
              </span>
            </button>

            {locationDropdownOpen && (
              <div className="p-2 mb-3 bg-stone-900 rounded-2xl border border-stone-800 max-h-60 overflow-y-auto space-y-1">
                <Link
                  href="/"
                  onClick={() => handleSelectLocation(null)}
                  className={`block p-2 rounded-xl text-xs font-bold ${
                    !selectedLocation
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "text-stone-300 hover:bg-stone-800"
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
                        ? "bg-amber-500/20 text-amber-300 font-black border border-amber-500/40"
                        : "text-stone-300 hover:bg-stone-800"
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
                className="block px-3 py-2.5 rounded-xl text-sm font-bold text-stone-200 hover:bg-stone-900 hover:text-amber-300 transition-colors"
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
