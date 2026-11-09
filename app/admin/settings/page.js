"use client";

import React, { useEffect, useState } from "react";
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
  Search,
  FileText,
  Type,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState({
    storeName: "Eat & Chill - Delhi",
    storePhone: "+91 7755013772",
    storeEmail: "contact@eatandchill.com",
    storeAddress: "Connaught Place & South Delhi Hub, New Delhi 110001",
    storeTimings: "11:00 AM - 03:00 AM (Late Night Express Active)",
    isStoreOpen: true,

    // Payment controls
    stripeEnabled: true,
    stripeSecretKey: "",
    stripePublishableKey: "",
    codEnabled: true,
    upiEnabled: true,
    upiId: "eatandchill@okhdfcbank",

    // Cloudinary Storage
    cloudinaryCloudName: "",
    cloudinaryApiKey: "",
    cloudinaryApiSecret: "",

    // Pricing & Delivery
    deliveryFee: 50,
    freeDeliveryThreshold: 499,
    taxPercent: 5,

    // Banner & SEO
    bannerNotice:
      "⚡ Delhi NCR Fast 30-Min Delivery | Free Delivery on Orders Above ₹499 | Authentic Dilli Street Delights!",
    delhiDeliveryAreas:
      "Connaught Place, South Delhi, Hauz Khas, Saket, Greater Kailash, Dwarka, Rohini, Karol Bagh",
    metaTitle: "Eat & Chill | Best Online Food Delivery in Delhi NCR",
    metaDescription:
      "Order online from Eat & Chill in Delhi. Authentic butter chicken, kathi rolls, pasta, momos & shakes. Fast 30-min late night delivery with COD & UPI.",
    metaKeywords:
      "food delivery delhi, online food order delhi, best rolls in delhi, late night food delivery delhi, south delhi food delivery, connaught place food order, eat and chill delhi",
    googleSiteVerification: "",

    // Homepage Content
    heroTag: "Delhi NCR's #1 Food Ordering Hub",
    heroHeading: "Order Delicious Food Online in Delhi NCR",
    heroSubheading:
      "Satisfy your cravings with Delhi's best Rolls, rich Butter Paneer, crispy Momos, fresh Sandwiches, Italian Pastas and chill Desserts. Fast 30-minute delivery to your doorstep, piping hot and fresh!",
    aboutText:
      "Eat & Chill is Delhi NCR's fastest-growing cloud kitchen delivering authentic street recipes, rich Mughlai gravies, artisan pizzas, and refreshing chilled beverages straight to your doorstep in 30 minutes.",
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/settings");
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
        toast.success("SEO, Homepage Content & Settings saved successfully!");
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
    <form onSubmit={handleSave} className="max-w-4xl space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
            Control Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Store Content &amp; SEO Settings
          </h1>
          <p className="text-xs text-slate-400">
            Update Google SEO meta tags, homepage text, payment gateways, and delivery rules
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-lg transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : "Save All Changes"}</span>
        </button>
      </div>

      {/* SECTION 1: GOOGLE SEO & META TAGS MANAGER */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Search className="w-5 h-5 text-brand-400" />
            <h2 className="text-lg font-bold text-white">
              Google SEO &amp; Meta Tags Manager
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
            Dynamic SEO
          </span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Homepage Meta Title (Appears in Google Search &amp; Browser Tab)
          </label>
          <input
            type="text"
            value={settings.metaTitle || ""}
            onChange={(e) => handleChange("metaTitle", e.target.value)}
            placeholder="Eat &amp; Chill | Best Online Food Delivery in Delhi NCR"
            className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <span className="text-[10px] text-slate-500 mt-1 block">
            Recommended length: 50-60 characters for best Google click-through rate
          </span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Homepage Meta Description (Google Search Snippet Text)
          </label>
          <textarea
            rows={3}
            value={settings.metaDescription || ""}
            onChange={(e) => handleChange("metaDescription", e.target.value)}
            placeholder="Order online from Eat &amp; Chill in Delhi. Authentic butter chicken, kathi rolls, pasta, momos &amp; shakes. Fast 30-min late night delivery with COD &amp; UPI."
            className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          ></textarea>
          <span className="text-[10px] text-slate-500 mt-1 block">
            Recommended length: 140-160 characters describing your Delhi cloud kitchen
          </span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Target SEO Keywords (Comma separated)
          </label>
          <input
            type="text"
            value={settings.metaKeywords || ""}
            onChange={(e) => handleChange("metaKeywords", e.target.value)}
            placeholder="food delivery delhi, online food order delhi, best rolls in delhi, late night food delivery delhi"
            className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Google Search Console Verification Token (Optional)
          </label>
          <input
            type="text"
            value={settings.googleSiteVerification || ""}
            onChange={(e) => handleChange("googleSiteVerification", e.target.value)}
            placeholder="e.g. AbC123XyZ456..."
            className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <span className="text-[10px] text-slate-500 mt-1 block">
            Enter your Google site verification code to prove ownership in Google Search Console
          </span>
        </div>
      </div>

      {/* SECTION 2: HOMEPAGE & BANNER CONTENT MANAGER */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Type className="w-5 h-5 text-brand-400" />
            <h2 className="text-lg font-bold text-white">
              Homepage Text &amp; Banner Content
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-brand-400 bg-orange-950 px-2.5 py-1 rounded-full border border-orange-800">
            Live Page Content
          </span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Top Announcement Bar Ticker (Visible on Navbar to all visitors)
          </label>
          <input
            type="text"
            value={settings.bannerNotice || ""}
            onChange={(e) => handleChange("bannerNotice", e.target.value)}
            placeholder="⚡ Delhi NCR Fast 30-Min Delivery | Free Delivery on Orders Above ₹499"
            className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Hero Section Badge / Pill Tag
            </label>
            <input
              type="text"
              value={settings.heroTag || ""}
              onChange={(e) => handleChange("heroTag", e.target.value)}
              placeholder="Delhi NCR's #1 Food Ordering Hub"
              className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Hero Main Heading
            </label>
            <input
              type="text"
              value={settings.heroHeading || ""}
              onChange={(e) => handleChange("heroHeading", e.target.value)}
              placeholder="Order Delicious Food Online in Delhi NCR"
              className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Hero Subheading / Story Paragraph
          </label>
          <textarea
            rows={3}
            value={settings.heroSubheading || ""}
            onChange={(e) => handleChange("heroSubheading", e.target.value)}
            placeholder="Satisfy your cravings with Delhi's best Rolls, rich Butter Paneer, crispy Momos, fresh Sandwiches, Italian Pastas and chill Desserts..."
            className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            About Us Story / Kitchen Mission (Shown on /about-us page)
          </label>
          <textarea
            rows={3}
            value={settings.aboutText || ""}
            onChange={(e) => handleChange("aboutText", e.target.value)}
            placeholder="Eat &amp; Chill is Delhi NCR's fastest-growing cloud kitchen delivering authentic street recipes..."
            className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          ></textarea>
        </div>
      </div>

      {/* SECTION 3: PAYMENT GATEWAYS CONTROL */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CreditCard className="w-5 h-5 text-brand-400" />
            <h2 className="text-lg font-bold text-white">
              Payment Gateways &amp; Methods Control
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
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
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
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
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:ring-1 focus:ring-brand-500"
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
                Allow customers across Delhi to pay in cash upon doorstep arrival
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
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
          )}
        </div>

        {/* 4. Cloudinary Image Storage Control */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">
                Cloudinary Media Storage CDN
              </h3>
              <p className="text-xs text-slate-400">
                Uploaded food photos are automatically served via high-speed Cloudinary CDN
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Cloud Name
              </label>
              <input
                type="text"
                placeholder="e.g. dxyz123"
                value={settings.cloudinaryCloudName || ""}
                onChange={(e) => handleChange("cloudinaryCloudName", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                API Key
              </label>
              <input
                type="text"
                placeholder="e.g. 1234567890"
                value={settings.cloudinaryApiKey || ""}
                onChange={(e) => handleChange("cloudinaryApiKey", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                API Secret
              </label>
              <input
                type="password"
                placeholder="Cloudinary API Secret"
                value={settings.cloudinaryApiSecret || ""}
                onChange={(e) => handleChange("cloudinaryApiSecret", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
          </div>
          <p className="text-[10px] text-slate-500">
            If left blank, uploaded dish photos will be stored locally in public/uploads.
          </p>
        </div>
      </div>

      {/* SECTION 4: DELIVERY & PRICING RULES */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="border-b border-slate-800 pb-4 flex items-center gap-2.5">
          <Truck className="w-5 h-5 text-brand-400" />
          <h2 className="text-lg font-bold text-white">
            Delivery Fees &amp; Order Thresholds
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Standard Delhi Delivery Fee (₹)
            </label>
            <input
              type="number"
              min={0}
              value={settings.deliveryFee}
              onChange={(e) => handleChange("deliveryFee", Number(e.target.value))}
              className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white font-bold focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <span className="text-[10px] text-slate-500">Default is ₹50 in Delhi</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Free Delivery Minimum Cart Value (₹)
            </label>
            <input
              type="number"
              min={0}
              value={settings.freeDeliveryThreshold}
              onChange={(e) =>
                handleChange("freeDeliveryThreshold", Number(e.target.value))
              }
              className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white font-bold focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <span className="text-[10px] text-slate-500">
              Orders equal to or above this amount get free delivery (e.g. ₹499)
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 5: STORE INFO & CONTACT DETAILS */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="border-b border-slate-800 pb-4 flex items-center gap-2.5">
          <Globe className="w-5 h-5 text-brand-400" />
          <h2 className="text-lg font-bold text-white">
            Delhi Store Info &amp; Hotline Contact
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Store / Kitchen Brand Name
            </label>
            <input
              type="text"
              value={settings.storeName || ""}
              onChange={(e) => handleChange("storeName", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Delhi Hotline Phone / WhatsApp
            </label>
            <input
              type="text"
              value={settings.storePhone || ""}
              onChange={(e) => handleChange("storePhone", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Support Email
            </label>
            <input
              type="email"
              value={settings.storeEmail || ""}
              onChange={(e) => handleChange("storeEmail", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Operating Hours
            </label>
            <input
              type="text"
              value={settings.storeTimings || ""}
              onChange={(e) => handleChange("storeTimings", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Physical Kitchen Address
          </label>
          <input
            type="text"
            value={settings.storeAddress || ""}
            onChange={(e) => handleChange("storeAddress", e.target.value)}
            className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-black text-sm shadow-xl transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving All Settings..." : "Save All Settings"}</span>
        </button>
      </div>
    </form>
  );
}
