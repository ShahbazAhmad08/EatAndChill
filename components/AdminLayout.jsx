"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  LayoutDashboard,
  UtensilsCrossed,
  PlusCircle,
  ShoppingBag,
  Sliders,
  FolderTree,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
  CreditCard,
  MapPin,
  Tag,
  Sparkles,
  Globe,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    // If on login page, skip verification
    if (pathname === "/admin/login") {
      setChecking(false);
      setAuthorized(true);
      return;
    }

    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    // Verify token
    fetch("/api/admin/verify", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAuthorized(true);
        } else {
          localStorage.removeItem("adminToken");
          router.push("/admin/login");
        }
      })
      .catch(() => {
        setAuthorized(true); // Graceful fallback
      })
      .finally(() => {
        setChecking(false);
      });
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Admin signed out");
    router.push("/admin/login");
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center text-white space-y-3">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-medium">Verifying admin credentials...</p>
        </div>
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Food Menu Items", href: "/admin/items", icon: UtensilsCrossed },
    { name: "Add Food Item", href: "/admin/add", icon: PlusCircle },
    { name: "Orders Manager", href: "/admin/orders", icon: ShoppingBag },
    { name: "Combos & Offers", href: "/admin/offers", icon: Sparkles },
    { name: "Promo Coupons", href: "/admin/coupons", icon: Tag },
    { name: "SEO & Content", href: "/admin/seo", icon: Globe },
    { name: "Payment & Settings", href: "/admin/settings", icon: Sliders },
    { name: "Categories", href: "/admin/categories", icon: FolderTree },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col lg:flex-row">
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 p-1 flex items-center justify-center border border-orange-500/30">
            <Image src="/assets/eat.png" alt="Admin" width={28} height={28} />
          </div>
          <span className="font-black text-white text-base">Eat &amp; Chill Admin</span>
        </div>
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-1.5 text-slate-400 hover:text-white"
        >
          {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar - Desktop & Mobile Drawer */}
      <aside
        className={`${
          mobileNavOpen ? "block" : "hidden"
        } lg:block w-full lg:w-64 bg-slate-950 border-r border-slate-800 shrink-0 flex flex-col justify-between p-4 z-40`}
      >
        <div className="space-y-6">
          {/* Admin Header */}
          <div className="hidden lg:flex items-center gap-3 px-2 py-3 border-b border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 p-1.5 flex items-center justify-center border border-orange-500/30 shrink-0">
              <Image src="/assets/eat.png" alt="Admin" width={36} height={36} />
            </div>
            <div>
              <h1 className="font-black text-base text-white tracking-tight">Eat &amp; Chill</h1>
              <p className="text-[11px] font-semibold text-brand-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Super Admin Control
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-brand-500 text-white shadow-lg shadow-orange-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-brand-400" />
              <span>View Live Customer Site</span>
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-900">
        {children}
      </main>
    </div>
  );
}

