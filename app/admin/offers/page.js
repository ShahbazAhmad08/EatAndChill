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
  UploadCloud,
  Check,
  X,
  PlusCircle,
  Search,
  Layers,
} from "lucide-react";

export default function AdminOffersPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLocation, setFilterLocation] = useState("all");

  // Existing dishes from catalog to build combos from
  const [availableDishes, setAvailableDishes] = useState([]);
  const [dishSearch, setDishSearch] = useState("");
  const [selectedDishes, setSelectedDishes] = useState([]); // [{ name, price, image }]
  const [customItemInput, setCustomItemInput] = useState("");
  const [customItemPrice, setCustomItemPrice] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "Bestseller Combo",
    originalPrice: "0",
    offerPrice: "",
    image: "/assets/food_1.png",
    locationSlug: "all",
    locationName: "All Locations (Universal)",
    couponCode: "",
    badge: "⚡ 30-Min Express Drop",
    isPureVeg: true,
    addToMenu: true,
  });

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/offers?t=${Date.now()}`, { cache: "no-store" });
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

  const fetchDishes = async () => {
    try {
      const res = await fetch(`/api/food/list?t=${Date.now()}`, { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setAvailableDishes(data.data);
      }
    } catch (err) {
      console.error("Failed to load menu dishes for combos:", err);
    }
  };

  useEffect(() => {
    fetchOffers();
    fetchDishes();
  }, []);

  // Update original price and description whenever selectedDishes change
  useEffect(() => {
    const totalOriginal = selectedDishes.reduce(
      (sum, d) => sum + (Number(d.price) || 0),
      0
    );
    const itemNames = selectedDishes.map((d) => d.name);

    setFormData((prev) => ({
      ...prev,
      originalPrice: String(totalOriginal),
      // If user hasn't set custom description, provide helpful default
      description:
        itemNames.length > 0
          ? `Includes: ${itemNames.join(", ")}`
          : prev.description,
    }));
  }, [selectedDishes]);

  const handleAddDishToCombo = (dish) => {
    setSelectedDishes((prev) => [
      ...prev,
      {
        id: dish._id || dish.id,
        name: dish.name,
        price: dish.price,
        image: dish.image,
      },
    ]);

    // If combo doesn't have an image set, use this dish's image
    if (dish.image && (!imagePreview || formData.image === "/assets/food_1.png")) {
      const imgSrc = dish.image.startsWith("http")
        ? dish.image
        : dish.image.startsWith("/")
        ? dish.image
        : `/uploads/${dish.image}`;
      setImagePreview(imgSrc);
      setFormData((prev) => ({ ...prev, image: dish.image }));
    }

    toast.success(`Added "${dish.name}" to combo`);
  };

  const handleAddCustomItem = () => {
    if (!customItemInput.trim()) return;
    const price = Number(customItemPrice) || 0;
    setSelectedDishes((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        name: customItemInput.trim(),
        price: price,
        image: null,
      },
    ]);
    setCustomItemInput("");
    setCustomItemPrice("");
    toast.success("Added extra item to combo");
  };

  const handleRemoveDishFromCombo = (indexToRemove) => {
    setSelectedDishes((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));

    // Upload immediately
    try {
      setUploadingImage(true);
      const data = new FormData();
      data.append("image", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.success && (result.url || result.filename)) {
        const uploadedPath = result.url || result.filename;
        setFormData((prev) => ({ ...prev, image: uploadedPath }));
        toast.success("Combo banner image uploaded!");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleLocationChange = (slug) => {
    if (slug === "all") {
      setFormData((prev) => ({
        ...prev,
        locationSlug: "all",
        locationName: "All Locations (Universal)",
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

    if (!formData.title.trim()) {
      toast.error("Please enter a combo title");
      return;
    }

    if (!formData.offerPrice || Number(formData.offerPrice) <= 0) {
      toast.error("Please enter a valid combo offer price");
      return;
    }

    if (selectedDishes.length === 0) {
      toast.error("Please add at least 1 food item to your combo");
      return;
    }

    try {
      const itemsList = selectedDishes.map((d) => d.name);

      const payload = {
        ...formData,
        items: itemsList,
        originalPrice: Number(formData.originalPrice) || Number(formData.offerPrice),
        offerPrice: Number(formData.offerPrice),
      };

      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Combo "${formData.title}" created successfully!`);
        // Reset form
        setFormData({
          title: "",
          description: "",
          tag: "Bestseller Combo",
          originalPrice: "0",
          offerPrice: "",
          image: "/assets/food_1.png",
          locationSlug: "all",
          locationName: "All Locations (Universal)",
          couponCode: "",
          badge: "⚡ 30-Min Express Drop",
          isPureVeg: true,
          addToMenu: true,
        });
        setSelectedDishes([]);
        setImageFile(null);
        setImagePreview(null);
        fetchOffers();
      } else {
        toast.error(data.message || "Failed to create combo");
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
        toast.success("Combo deleted");
        fetchOffers();
      } else {
        toast.error(data.message || "Failed to delete combo");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting combo offer");
    }
  };

  const filteredOffers = offers.filter((off) => {
    if (filterLocation === "all") return true;
    return off.locationSlug === filterLocation || off.locationSlug === "all";
  });

  const filteredDishes = availableDishes.filter((dish) => {
    if (!dishSearch.trim()) return true;
    const q = dishSearch.toLowerCase();
    return (
      dish.name?.toLowerCase().includes(q) ||
      dish.category?.toLowerCase().includes(q)
    );
  });

  const origPriceNum = Number(formData.originalPrice) || 0;
  const offerPriceNum = Number(formData.offerPrice) || 0;
  const savings = origPriceNum > offerPriceNum ? origPriceNum - offerPriceNum : 0;
  const discountPercent =
    origPriceNum > 0 && savings > 0
      ? Math.round((savings / origPriceNum) * 100)
      : 0;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Combo Meals &amp; Offers Engine</span>
          </div>
          <h1 className="text-2xl font-black text-white">
            Combos &amp; Offers Manager
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Build custom combo deals using existing menu dishes (e.g. Fried Rice + Chilli Paneer + Coke), set custom image and special offer prices.
          </p>
        </div>

        <button
          onClick={() => {
            fetchOffers();
            fetchDishes();
            toast.success("Refreshed combos and dishes!");
          }}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Create Combo Form */}
        <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-orange-500" />
              <span>Create New Combo Deal</span>
            </h2>
            <span className="text-[11px] font-bold text-orange-400 bg-orange-950/80 px-2.5 py-0.5 rounded-full border border-orange-800/80">
              Auto-Calculated Savings
            </span>
          </div>

          <form onSubmit={handleCreate} className="space-y-4">
            {/* Combo Title */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Combo Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Chinese Feast Combo (Fried Rice + Chilli Paneer + Coke)"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 font-semibold"
                required
              />
            </div>

            {/* Dish Picker Section: Build Combo From Existing Menu Items */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-white flex items-center gap-1.5">
                  <UtensilsCrossed className="w-3.5 h-3.5 text-orange-400" />
                  <span>Select Items From Menu to Form Combo *</span>
                </label>
                <span className="text-[11px] text-slate-400">
                  {selectedDishes.length} selected
                </span>
              </div>

              {/* Search dishes */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search dishes (e.g. Rice, Paneer, Manchurian)..."
                  value={dishSearch}
                  onChange={(e) => setDishSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Dish Chips Selector */}
              <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
                {filteredDishes.slice(0, 15).map((dish) => {
                  const isAdded = selectedDishes.some(
                    (d) => d.id === (dish._id || dish.id)
                  );
                  return (
                    <div
                      key={dish._id || dish.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-bold text-slate-200 truncate">
                          {dish.name}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          ({dish.category})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono font-bold text-orange-400">
                          ₹{dish.price}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAddDishToCombo(dish)}
                          className="px-2 py-0.5 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-bold text-[10px] transition-colors"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Extra Custom Item (e.g. Coke, Dip) */}
              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-[11px] font-bold text-slate-400 block mb-1">
                  Add Extra / Drink (e.g. Coke 250ml, Extra Dip):
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Item name (e.g. Chilled Coke 250ml)"
                    value={customItemInput}
                    onChange={(e) => setCustomItemInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="₹ Price"
                    value={customItemPrice}
                    onChange={(e) => setCustomItemPrice(e.target.value)}
                    className="w-20 px-2 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomItem}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold shrink-0"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* Selected Items List */}
              {selectedDishes.length > 0 && (
                <div className="mt-2 pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] font-bold text-emerald-400 block mb-1.5">
                    ✓ Included Dishes in This Combo:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDishes.map((it, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 text-xs bg-slate-950 border border-orange-500/30 text-white px-2.5 py-1 rounded-xl"
                      >
                        <span className="font-semibold">{it.name}</span>
                        {it.price > 0 && (
                          <span className="text-[10px] text-orange-400 font-mono">
                            ₹{it.price}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveDishFromCombo(idx)}
                          className="text-slate-500 hover:text-red-400 font-bold ml-1"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pricing Details */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Sum of Original Prices (₹)
                </label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, originalPrice: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Discounted Offer Price (₹) *
                </label>
                <input
                  type="number"
                  placeholder="e.g. 299"
                  value={formData.offerPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, offerPrice: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-orange-500/60 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 font-mono font-black"
                  required
                />
              </div>
            </div>

            {/* Live Discount Calculator Pill */}
            {origPriceNum > 0 && offerPriceNum > 0 && (
              <div className="p-2.5 rounded-xl bg-orange-950/40 border border-orange-800/60 flex items-center justify-between text-xs font-bold text-orange-300">
                <span>Customer Savings:</span>
                <span className="text-emerald-400">
                  Save ₹{savings} ({discountPercent}% OFF)
                </span>
              </div>
            )}

            {/* Custom Banner / Image Upload & URL */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300">
                Combo Banner Image (Upload Custom or Pick URL)
              </label>

              <div className="flex items-center gap-3">
                {imagePreview && (
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Combo preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex-1 space-y-1.5">
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 border border-slate-800 cursor-pointer transition-colors">
                    <UploadCloud className="w-3.5 h-3.5 text-orange-400" />
                    <span>{uploadingImage ? "Uploading..." : "Upload Combo Image File"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </label>

                  <input
                    type="text"
                    placeholder="Or enter Image URL / filename (e.g. /assets/food_1.png)"
                    value={formData.image}
                    onChange={(e) => {
                      setFormData({ ...formData, image: e.target.value });
                      setImagePreview(e.target.value);
                    }}
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Location & Tag */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Target Location
                </label>
                <select
                  value={formData.locationSlug}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 font-semibold"
                >
                  <option value="all">🌟 All Locations (Universal Deal)</option>
                  {MARKET_LOCATIONS.map((loc) => (
                    <option key={loc.slug} value={loc.slug}>
                      📍 {loc.name} ({loc.zone})
                    </option>
                  ))}
                </select>
              </div>

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
            </div>

            {/* Coupon Code (Optional) */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Coupon Code (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. CHINESE50"
                value={formData.couponCode}
                onChange={(e) =>
                  setFormData({ ...formData, couponCode: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 font-semibold uppercase"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Description / Highlights
              </label>
              <textarea
                rows={2}
                placeholder="Delicious meal combination with fresh preparation..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Veg Checkbox & Also Add to Menu Checkbox */}
            <div className="space-y-2 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPureVeg}
                  onChange={(e) =>
                    setFormData({ ...formData, isPureVeg: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 bg-slate-900 border-slate-700"
                />
                <span className="text-xs font-bold text-slate-300">
                  Pure Vegetarian Combo
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.addToMenu}
                  onChange={(e) =>
                    setFormData({ ...formData, addToMenu: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 bg-slate-900 border-slate-700"
                />
                <span className="text-xs font-bold text-slate-300">
                  Also list as an orderable item in Food Menu under &quot;Combos&quot; category
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish Combo Offer</span>
            </button>
          </form>
        </div>

        {/* Existing Offers List */}
        <div className="lg:col-span-6 space-y-4">
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
              No combo offers found for this location filter.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredOffers.map((off) => {
                const offImg = off.image?.startsWith("http")
                  ? off.image
                  : off.image?.startsWith("/")
                  ? off.image
                  : `/uploads/${off.image}`;

                return (
                  <div
                    key={off._id}
                    className="bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      {offImg && (
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={offImg}
                            alt={off.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
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

                        {/* Included items */}
                        {off.items && off.items.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-0.5">
                            {off.items.map((it, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] bg-slate-900 text-slate-300 px-1.5 py-0.5 rounded border border-slate-800"
                              >
                                ✓ {it}
                              </span>
                            ))}
                          </div>
                        )}

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
                    </div>

                    <button
                      onClick={() => handleDelete(off._id, off.title)}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors self-end sm:self-center shrink-0"
                      title="Delete combo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
