"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { MARKET_LOCATIONS } from "@/lib/marketLocations";
import {
  Sparkles,
  Plus,
  Trash2,
  CheckCircle2,
  RotateCw,
  Tag,
  MapPin,
  UtensilsCrossed,
  DollarSign,
  Percent,
} from "lucide-react";

export default function AdminOffersPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLocation, setFilterLocation] = useState("all");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "Bestseller Combo",
    originalPrice: "350",
    offerPrice: "249",
    image: "/assets/food_1.png",
    locationSlug: "all",
    locationName: "All Delhi NCR",
    couponCode: "",
    items: "",
    badge: "⚡ 30-Min Express Drop",
    isPureVeg: true,
  });

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/offers");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setOffers(data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load combo offers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleLocationChange = (slug) => {
    if (slug === "all") {
      setFormData((prev) => ({
        ...prev,
        locationSlug: "all",
        locationName: "All Delhi NCR",
      }));
    } else {
      const loc = MARKET_LOCATIONS.find((l) => l.slug === slug);
      setFormData((prev) => ({
        ...prev,
        locationSlug: slug,
        locationName: loc ? loc.name : slug,
      }));
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.offerPrice) {
      toast.error("Please fill title and offer price");
      return;
    }

    try {
      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Combo offer "${formData.title}" created!`);
        setFormData({
          title: "",
          description: "",
          tag: "Bestseller Combo",
          originalPrice: "350",
          offerPrice: "249",
          image: "/assets/food_1.png",
          locationSlug: "all",
          locationName: "All Delhi NCR",
          couponCode: "",
          items: "",
          badge: "⚡ 30-Min Express Drop",
          isPureVeg: true,
        });
        fetchOffers();
      } else {
        toast.error(data.message || "Failed to create offer");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error creating combo offer");
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete combo offer "${title}"?`)) return;

    try {
      const res = await fetch(`/api/offers?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Offer deleted");
        fetchOffers();
      } else {
        toast.error(data.message || "Failed to delete");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting offer");
    }
  };

  const filteredOffers = offers.filter((off) => {
    if (filterLocation === "all") return true;
    return off.locationSlug === filterLocation || off.locationSlug === "all";
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Combos &amp; Offers Engine</span>
          </div>
          <h1 className="text-2xl font-black text-white">
            Combos &amp; Discount Offers Manager
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Create location-specific combo meals and seasonal discount deals for Delhi NCR foodies.
          </p>
        </div>

        <button
          onClick={fetchOffers}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Create Combo Form */}
        <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-orange-500" />
            <span>Create New Combo / Deal</span>
          </h2>

          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Combo / Offer Title *
              </label>
              <input
                type="text"
                placeholder="e.g. CP Corporate Meal Tray"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 font-semibold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Target Location (Specific Area or Store-wide)
              </label>
              <select
                value={formData.locationSlug}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 font-semibold"
              >
                <option value="all">🌟 All Delhi NCR (Universal Offer)</option>
                {MARKET_LOCATIONS.map((loc) => (
                  <option key={loc.slug} value={loc.slug}>
                    📍 {loc.name} ({loc.zone})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Original Price (₹)
                </label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, originalPrice: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Offer Price (₹) *
                </label>
                <input
                  type="number"
                  value={formData.offerPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, offerPrice: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 font-semibold"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Deal Tag
                </label>
                <input
                  type="text"
                  placeholder="e.g. FLAT 35% OFF"
                  value={formData.tag}
                  onChange={(e) =>
                    setFormData({ ...formData, tag: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Coupon Code (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. CPDEAL"
                  value={formData.couponCode}
                  onChange={(e) =>
                    setFormData({ ...formData, couponCode: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 font-semibold uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Items Included (comma-separated)
              </label>
              <input
                type="text"
                placeholder="Paneer Tikka Roll, Peri Peri Fries, Cold Coffee"
                value={formData.items}
                onChange={(e) =>
                  setFormData({ ...formData, items: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Description / Highlights
              </label>
              <textarea
                rows={2}
                placeholder="Delicious combination for lunch or dinner..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="isPureVeg"
                checked={formData.isPureVeg}
                onChange={(e) =>
                  setFormData({ ...formData, isPureVeg: e.target.checked })
                }
                className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 bg-slate-900 border-slate-700"
              />
              <label htmlFor="isPureVeg" className="text-xs font-bold text-slate-300">
                Pure Vegetarian Combo
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs transition-all shadow-md shadow-orange-500/20"
            >
              Publish Combo Offer
            </button>
          </form>
        </div>

        {/* Existing Offers List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-slate-300">
              Filter by Location:
            </span>
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none font-semibold"
            >
              <option value="all">Show All Offers ({offers.length})</option>
              {MARKET_LOCATIONS.map((loc) => (
                <option key={loc.slug} value={loc.slug}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="p-12 text-center text-xs text-slate-500">
              Loading combo offers...
            </div>
          ) : filteredOffers.length === 0 ? (
            <div className="p-12 bg-slate-950 rounded-2xl border border-slate-800 text-center text-xs text-slate-500">
              No combo offers found for this filter.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredOffers.map((off) => (
                <div
                  key={off._id}
                  className="bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-black uppercase tracking-wider text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full">
                        {off.tag}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-orange-500" />
                        <span>{off.locationName}</span>
                      </span>
                      {off.isPureVeg && (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                          Pure Veg
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-white">
                      {off.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {off.description}
                    </p>

                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-base font-black text-orange-400">
                        ₹{off.offerPrice}
                      </span>
                      {off.originalPrice > off.offerPrice && (
                        <span className="text-xs text-slate-500 line-through">
                          ₹{off.originalPrice}
                        </span>
                      )}
                      {off.couponCode && (
                        <span className="text-[11px] font-mono font-bold text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded">
                          Use: {off.couponCode}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(off._id, off.title)}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors self-end sm:self-center"
                    title="Delete combo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

