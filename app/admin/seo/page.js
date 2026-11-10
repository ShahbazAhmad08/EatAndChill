"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Globe,
  Search,
  FileText,
  Save,
  RotateCw,
  Sparkles,
  Eye,
  CheckCircle2,
  Tag,
  MapPin,
  Flame,
  Layout,
} from "lucide-react";

export default function AdminSeoPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("meta"); // 'meta', 'home', 'about', 'preview'

  const [settings, setSettings] = useState({
    metaTitle: "Eat & Chill | Best Online Food Delivery in Delhi NCR",
    metaDescription:
      "Order online from Eat & Chill in Delhi. Authentic butter chicken, kathi rolls, pasta, momos & shakes. Fast 30-min late night delivery with COD & UPI.",
    metaKeywords:
      "food delivery delhi, online food order delhi, best rolls in delhi, late night food delivery delhi, south delhi food delivery, connaught place food order",
    googleSiteVerification: "",
    bannerNotice:
      "⚡ Delhi NCR Fast 30-Min Delivery | Free Delivery on Orders Above ₹499 | Authentic Dilli Street Delights!",
    heroTag: "Delhi NCR's #1 Cloud Kitchen Hub",
    heroHeading: "Order Delicious Food Online in Delhi NCR",
    heroSubheading:
      "Satisfy your cravings with Delhi's best Rolls, rich Butter Paneer, crispy Momos, fresh Sandwiches, Italian Pastas and chill Desserts. Fast 30-minute delivery to your doorstep, piping hot and fresh!",
    aboutText:
      "Eat & Chill is Delhi NCR's fastest-growing cloud kitchen delivering authentic street recipes, rich Mughlai gravies, artisan pizzas, and refreshing chilled beverages straight to your doorstep in 30 minutes.",
    delhiDeliveryAreas:
      "Connaught Place, South Delhi, Hauz Khas, Saket, Greater Kailash, Dwarka, Rohini, Karol Bagh, Noida, Gurugram",
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
      toast.error("Failed to load SEO & content settings");
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
    try {
      setSaving(true);
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("SEO & Page Content updated successfully!", { duration: 3000 });
      } else {
        toast.error(data.message || "Failed to update settings");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error while saving settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-400 mb-1">
            <Globe className="w-4 h-4" />
            <span>Search Engine Optimization &amp; Content Management</span>
          </div>
          <h1 className="text-2xl font-black text-white">
            SEO &amp; Page Content Manager
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Control page titles, meta tags, Google snippet previews, banner notices, and on-page headings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchSettings}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-xs font-black text-white transition-all shadow-md shadow-orange-500/20 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? "Saving Changes..." : "Save All SEO Updates"}</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto no-scrollbar">
        {[
          { id: "meta", label: "Google SEO & Meta Tags", icon: Search },
          { id: "home", label: "Homepage Hero & Banner Notice", icon: Layout },
          { id: "about", label: "About Us & Story Content", icon: FileText },
          { id: "preview", label: "Google Snippet Preview", icon: Eye },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
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

      <form onSubmit={handleSave} className="space-y-6">
        {/* Tab 1: Meta & Search */}
        {activeTab === "meta" && (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Search className="w-4 h-4 text-orange-500" />
              <span>Global Meta Tags &amp; Search Engine Indexing</span>
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Primary Meta Title (appears on Google Search &amp; Browser tab) *
              </label>
              <input
                type="text"
                value={settings.metaTitle}
                onChange={(e) => handleChange("metaTitle", e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 font-semibold"
                placeholder="Eat & Chill | Best Online Food Delivery in Delhi NCR"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Recommended length: 50-60 characters ({settings.metaTitle?.length || 0} chars)
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Primary Meta Description *
              </label>
              <textarea
                rows={3}
                value={settings.metaDescription}
                onChange={(e) => handleChange("metaDescription", e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                placeholder="High-converting description explaining the 30-min delivery, menu, and payment options..."
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Recommended length: 140-160 characters ({settings.metaDescription?.length || 0} chars)
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Meta Keywords (comma-separated)
              </label>
              <input
                type="text"
                value={settings.metaKeywords}
                onChange={(e) => handleChange("metaKeywords", e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                placeholder="food delivery delhi, online food order delhi, best rolls, kathi rolls"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Google Search Console Verification Tag
              </label>
              <input
                type="text"
                value={settings.googleSiteVerification}
                onChange={(e) => handleChange("googleSiteVerification", e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                placeholder="e.g. google-site-verification code from Google Search Console"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Homepage Hero & Banner Content */}
        {activeTab === "home" && (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Layout className="w-4 h-4 text-orange-500" />
              <span>Homepage Copy &amp; Top Ticker Notice</span>
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Top Navbar Ticker Notice (Scrolling Announcement)
              </label>
              <input
                type="text"
                value={settings.bannerNotice}
                onChange={(e) => handleChange("bannerNotice", e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                placeholder="⚡ Delhi NCR Fast 30-Min Delivery | Free Delivery Above ₹499"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Hero Tag Badge
                </label>
                <input
                  type="text"
                  value={settings.heroTag}
                  onChange={(e) => handleChange("heroTag", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                  placeholder="Delhi NCR's #1 Cloud Kitchen Hub"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Hero Headline
                </label>
                <input
                  type="text"
                  value={settings.heroHeading}
                  onChange={(e) => handleChange("heroHeading", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                  placeholder="Order Delicious Food Online in Delhi NCR"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Hero Subheading Paragraph
              </label>
              <textarea
                rows={3}
                value={settings.heroSubheading}
                onChange={(e) => handleChange("heroSubheading", e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                placeholder="Satisfy your cravings with Delhi's best Rolls, rich Butter Paneer..."
              />
            </div>
          </div>
        )}

        {/* Tab 3: About Us & Story Content */}
        {activeTab === "about" && (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <FileText className="w-4 h-4 text-orange-500" />
              <span>About Us Narrative &amp; Covered Areas Text</span>
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                About Us Story Narrative
              </label>
              <textarea
                rows={4}
                value={settings.aboutText}
                onChange={(e) => handleChange("aboutText", e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                placeholder="Eat & Chill was founded with a single mission..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Delivery Areas Text Summary
              </label>
              <input
                type="text"
                value={settings.delhiDeliveryAreas}
                onChange={(e) => handleChange("delhiDeliveryAreas", e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                placeholder="Connaught Place, South Delhi, Hauz Khas, Saket, Dwarka, Rohini, Noida, Gurugram"
              />
            </div>
          </div>
        )}

        {/* Tab 4: Google Live Snippet Preview */}
        {activeTab === "preview" && (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Eye className="w-4 h-4 text-orange-500" />
              <span>Google Search Result Snippet Preview</span>
            </h2>

            <div className="bg-white p-5 rounded-2xl max-w-xl text-left font-sans">
              <div className="text-xs text-gray-500 flex items-center gap-1.5 mb-1">
                <span className="w-4 h-4 rounded-full bg-orange-100 text-brand-600 flex items-center justify-center text-[10px] font-black">
                  EC
                </span>
                <span className="text-gray-700">https://eatandchill.onrender.com</span>
              </div>
              <h3 className="text-base font-medium text-blue-800 hover:underline cursor-pointer">
                {settings.metaTitle || "Eat & Chill | Best Online Food Delivery in Delhi NCR"}
              </h3>
              <p className="text-xs text-gray-600 mt-1 leading-normal line-clamp-2">
                {settings.metaDescription ||
                  "Order online from Eat & Chill in Delhi. Authentic butter chicken, kathi rolls, pasta, momos & shakes. Fast 30-min late night delivery with COD & UPI."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-1">
              <strong className="text-white block font-bold">
                Programmatic Location Page Format:
              </strong>
              <p>
                Dynamic pages automatically generate: <br />
                <span className="text-orange-400 font-mono">
                  Best Food Delivery in [Location] | Express 30 Mins - Eat &amp; Chill
                </span>
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-xs font-black text-white transition-all shadow-md shadow-orange-500/20 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Changes..." : "Save All SEO Updates"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

