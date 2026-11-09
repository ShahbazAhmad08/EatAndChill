"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
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
    { name: "Menu", href: "/#explore-menu" },
    { name: "Delhi Specials", href: "/#delhi-specials" },
    { name: "Delivery Zones", href: "/delhi-delivery" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact" },
  ];

  const cartCount = getTotalCartCount();
  const cartAmount = getTotalCartAmount();

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm border-b border-gray-100">
      {/* Top Delhi Delivery Banner Ticker */}
      <div className="bg-gradient-to-r from-brand-600 via-brand-500 to-amber-600 text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 truncate">
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider animate-pulse">
              Delhi NCR
            </span>
            <span className="truncate">
              {settings.bannerNotice || "⚡ 30-Min Fast Food Delivery across Delhi | Free Delivery above ₹499"}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 shrink-0 text-white/90">
            <a
              href={`tel:${settings.storePhone || "+917755013772"}`}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{settings.storePhone || "+91 7755013772"}</span>
            </a>
            <Link
              href="/admin/login"
              className="flex items-center gap-1 text-white/80 hover:text-white underline text-[11px]"
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
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 p-1.5 shadow-sm group-hover:scale-105 transition-transform">
                <Image
                  src="/assets/eat.png"
                  alt="Eat & Chill Delhi"
                  width={48}
                  height={48}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-gray-900 group-hover:text-brand-600 transition-colors">
                  Eat &amp; Chill
                </span>
                <span className="text-[11px] font-semibold text-brand-600 flex items-center gap-0.5">
                  <MapPin className="w-3 h-3 text-brand-500" /> Delhi Food Hub
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-brand-600 ${
                  pathname === link.href ? "text-brand-600 font-semibold" : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop & Tablet */}
          <div className="hidden md:flex flex-1 max-w-xs relative items-center">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search momos, rolls, curries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all placeholder:text-gray-400"
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
            {/* Cart Button */}
            <Link
              href="/cart"
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-orange-50 hover:bg-orange-100 border border-orange-200 text-brand-700 font-semibold text-sm transition-all group shadow-sm"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-600 text-white text-[11px] font-bold rounded-full h-4 w-4 flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">
                {cartAmount > 0 ? `₹${cartAmount}` : "Cart"}
              </span>
            </Link>

            {/* User Profile / Login */}
            {!token ? (
              <button
                onClick={toggleLoginPopup}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-brand-500 hover:bg-brand-600 rounded-full shadow-sm hover:shadow transition-all"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 py-1.5 px-3 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-800"
                >
                  <div className="w-7 h-7 rounded-full bg-brand-500 text-white font-bold flex items-center justify-center text-xs">
                    {user?.name ? user.name[0].toUpperCase() : "U"}
                  </div>
                  <span className="hidden md:inline max-w-[100px] truncate">
                    {user?.name || "Account"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-gray-100 text-xs text-gray-500">
                      Signed in as <br />
                      <strong className="text-gray-800 text-sm">{user?.name || "Customer"}</strong>
                    </div>
                    <Link
                      href="/myorders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-brand-600 transition-colors"
                    >
                      <Package className="w-4 h-4 text-brand-500" />
                      <span>My Orders &amp; Track</span>
                    </Link>
                    <Link
                      href="/delhi-delivery"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-brand-600 transition-colors"
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
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Delhi butter chicken, rolls, pasta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2 py-2 px-3 bg-orange-50 rounded-lg text-brand-700 text-xs font-semibold mb-2">
            <MapPin className="w-4 h-4 text-brand-500" />
            <span>Delivering across all Delhi NCR pin codes</span>
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-800 hover:bg-orange-50 hover:text-brand-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-brand-600"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Dashboard Control</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

