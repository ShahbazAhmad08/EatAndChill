"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  CreditCard,
  Banknote,
  QrCode,
  Truck,
  MapPin,
  Phone,
  Clock,
  Sparkles,
  Save,
  ShieldCheck,
  Globe,
  Sliders,
  Cloud,
  Store,
  ArrowRight,
  RotateCw,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("payment"); // 'payment', 'store', 'delivery', 'cloudinary'

  const [settings, setSettings] = useState({
    storeName: "REAL BROTHER'S RESTAURANT",
    storePhone: "+91 78271 18412",
    storeEmail: "contact@realbrothersrestaurant.com",
    storeAddress: "Gali Number 5, Vishal, Sarfabad Village, Sector 73, Noida - 201301",
    storeTimings: "08:00 AM - 12:00 AM Midnight (Open Daily)",
    isStoreOpen: true,

    // Payment controls
    stripeEnabled: true,
    stripeSecretKey: "",
    stripePublishableKey: "",
    codEnabled: true,
    upiEnabled: true,
    upiId: "7827118412@ybl",

    // Cloudinary Storage
    cloudinaryCloudName: "",
    cloudinaryApiKey: "",
    cloudinaryApiSecret: "",

    // Pricing & Delivery
    deliveryFee: 40,
    freeDeliveryThreshold: 499,
    taxPercent: 5,

    // Distance & Coverage Radius
    maxDeliveryDistanceKm: 3,
    restaurantLat: 28.583,
    restaurantLng: 77.388,
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/settings?t=${Date.now()}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success && data.data) {
        setSettings((prev) => ({ ...prev, ...data.data }));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load store settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Settings saved successfully!");
        if (data.data) {
          setSettings((prev) => ({ ...prev, ...data.data }));
        }
      } else {
        toast.error(data.message || "Failed to update settings");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-16 text-center text-slate-400">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        Loading admin control panel...
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="max-w-5xl space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5" />
            <span>Store Operations &amp; Gateways</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Payment &amp; Operations Settings
          </h1>
          <p className="text-xs text-slate-400">
            Manage payment gateways, store timings, delivery pricing thresholds, and Cloudinary media.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchSettings}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-lg transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Changes..." : "Save Settings"}</span>
          </button>
        </div>
      </div>

      {/* Redirect Banner to Dedicated SEO & Content Tab */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-transparent border border-orange-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white">
              Looking for SEO, Meta Tags &amp; Page Content?
            </h3>
            <p className="text-[11px] text-slate-400">
              Page titles, Google search previews, and homepage banner text are now organized in their dedicated tab.
            </p>
          </div>
        </div>
        <Link
          href="/admin/seo"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black text-xs transition-all shadow-sm shrink-0"
        >
          <span>Open SEO &amp; Content Tab</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Sub-Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto no-scrollbar">
        {[
          { id: "payment", label: "Payment Gateways & Methods", icon: CreditCard },
          { id: "store", label: "Store Profile & Hours", icon: Store },
          { id: "delivery", label: "Delivery & Taxes", icon: Truck },
          { id: "cloudinary", label: "Cloudinary Media CDN", icon: Cloud },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isActive
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                  : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PAYMENT GATEWAYS CONTROL */}
      {activeTab === "payment" && (
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CreditCard className="w-5 h-5 text-orange-400" />
              <h2 className="text-base font-bold text-white">
                Payment Gateways &amp; Methods Control
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800">
              Live Gateway Switcher
            </span>
          </div>

          {/* 1. Stripe Gateway Control */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-sm">
                  Stripe Card Checkout Gateway
                </h3>
                <p className="text-xs text-slate-400">
                  Accept Visa, Mastercard, RuPay &amp; Netbanking
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.stripeEnabled}
                  onChange={(e) => handleChange("stripeEnabled", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>

            {settings.stripeEnabled && (
              <div className="space-y-3 pt-2 border-t border-slate-800/80">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Stripe Secret Key
                  </label>
                  <input
                    type="password"
                    placeholder="sk_live_... or sk_test_..."
                    value={settings.stripeSecretKey || ""}
                    onChange={(e) => handleChange("stripeSecretKey", e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                  <span className="text-[10px] text-slate-500">
                    Leave blank to use default configured environment key
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 2. Cash on Delivery (COD) Control */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Banknote className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">
                  Cash On Delivery (COD)
                </h3>
                <p className="text-xs text-slate-400">
                  Allow customers across Delhi NCR to pay in cash upon doorstep delivery
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.codEnabled}
                onChange={(e) => handleChange("codEnabled", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {/* 3. UPI / QR Payment Control */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">
                    Direct UPI / QR Code Payment
                  </h3>
                  <p className="text-xs text-slate-400">
                    Customers pay via Google Pay, PhonePe, Paytm, or BHIM
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.upiEnabled}
                  onChange={(e) => handleChange("upiEnabled", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
              </label>
            </div>

            {settings.upiEnabled && (
              <div className="pt-2 border-t border-slate-800/80">
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Store UPI ID (VPA)
                </label>
                <input
                  type="text"
                  placeholder="e.g. eatandchill@okhdfcbank"
                  value={settings.upiId || ""}
                  onChange={(e) => handleChange("upiId", e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: STORE PROFILE & TIMINGS */}
      {activeTab === "store" && (
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Store className="w-5 h-5 text-orange-400" />
              <h2 className="text-base font-bold text-white">
                Store Identity &amp; Operating Hours
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Store Status:</span>
              <button
                type="button"
                onClick={() => handleChange("isStoreOpen", !settings.isStoreOpen)}
                className={`px-3 py-1 rounded-full text-xs font-black transition-colors ${
                  settings.isStoreOpen
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                }`}
              >
                {settings.isStoreOpen ? "🟢 OPEN NOW" : "🔴 CLOSED"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Store Brand Name
              </label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => handleChange("storeName", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-orange-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Support Helpline Phone
              </label>
              <input
                type="text"
                value={settings.storePhone}
                onChange={(e) => handleChange("storePhone", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-orange-500 font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Support Email
              </label>
              <input
                type="email"
                value={settings.storeEmail}
                onChange={(e) => handleChange("storeEmail", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Operating Hours Display
              </label>
              <input
                type="text"
                value={settings.storeTimings}
                onChange={(e) => handleChange("storeTimings", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Central Kitchen Address
            </label>
            <input
              type="text"
              value={settings.storeAddress}
              onChange={(e) => handleChange("storeAddress", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>
      )}

      {/* TAB 3: DELIVERY & PRICING */}
      {activeTab === "delivery" && (
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-orange-400" />
              <span>Delivery Fee &amp; Order Value Thresholds</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Base Delivery Fee (₹)
              </label>
              <input
                type="number"
                value={settings.deliveryFee}
                onChange={(e) => handleChange("deliveryFee", Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-orange-500 font-bold"
              />
              <span className="text-[10px] text-slate-500">Charged on orders below free threshold</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Free Delivery Above (₹)
              </label>
              <input
                type="number"
                value={settings.freeDeliveryThreshold}
                onChange={(e) => handleChange("freeDeliveryThreshold", Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-orange-500 font-bold"
              />
              <span className="text-[10px] text-slate-500">Default: ₹499 for free delivery</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                GST / Service Tax (%)
              </label>
              <input
                type="number"
                value={settings.taxPercent}
                onChange={(e) => handleChange("taxPercent", Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-orange-500 font-bold"
              />
              <span className="text-[10px] text-slate-500">Included in menu item prices</span>
            </div>
          </div>

          {/* Real-time Distance & Kitchen Geolocation Settings */}
          <div className="pt-6 border-t border-slate-800 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Delivery Radius &amp; Geolocation Control</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Calculate customer distance from restaurant in real-time. If distance exceeds the maximum limit, customers are routed to WhatsApp for custom distance delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <label className="block text-xs font-bold text-amber-400 mb-1">
                  Max Delivery Distance (KM) *
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  value={settings.maxDeliveryDistanceKm !== undefined ? settings.maxDeliveryDistanceKm : 3}
                  onChange={(e) => handleChange("maxDeliveryDistanceKm", Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white font-black focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Default: 3 KM (Standard automated delivery radius)</span>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Kitchen Latitude
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={settings.restaurantLat !== undefined ? settings.restaurantLat : 28.583}
                  onChange={(e) => handleChange("restaurantLat", Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Sarfabad Sector 73: 28.5830</span>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Kitchen Longitude
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={settings.restaurantLng !== undefined ? settings.restaurantLng : 77.388}
                  onChange={(e) => handleChange("restaurantLng", Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Sarfabad Sector 73: 77.3880</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CLOUDINARY STORAGE */}
      {activeTab === "cloudinary" && (
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-sky-400" />
              <h2 className="text-base font-bold text-white">
                Cloudinary Media Storage CDN
              </h2>
            </div>
            <span className="text-[11px] text-sky-400 bg-sky-950 px-2.5 py-0.5 rounded-full border border-sky-800 font-mono">
              CDN Storage
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Cloud Name
              </label>
              <input
                type="text"
                placeholder="e.g. dxyz123"
                value={settings.cloudinaryCloudName || ""}
                onChange={(e) => handleChange("cloudinaryCloudName", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                API Key
              </label>
              <input
                type="text"
                placeholder="e.g. 1234567890"
                value={settings.cloudinaryApiKey || ""}
                onChange={(e) => handleChange("cloudinaryApiKey", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                API Secret
              </label>
              <input
                type="password"
                placeholder="Cloudinary API Secret"
                value={settings.cloudinaryApiSecret || ""}
                onChange={(e) => handleChange("cloudinaryApiSecret", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
          <p className="text-[10px] text-slate-500">
            Note: If left blank, the server uses existing environment variables from <code className="text-orange-400">.env</code>.
          </p>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs shadow-lg transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : "Save Settings"}</span>
        </button>
      </div>
    </form>
  );
}
