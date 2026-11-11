"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  UploadCloud,
  Flame,
  PlusCircle,
  ArrowLeft,
  FolderTree,
} from "lucide-react";
import Link from "next/link";

function AddDishContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedCategory = searchParams.get("category");

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: preselectedCategory || "Rolls",
    isVeg: true,
    isDelhiSpecial: true,
  });

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          const list = data.data.filter((c) => c.name !== "All");
          setCategories(list);
          if (preselectedCategory) {
            setFormData((prev) => ({ ...prev, category: preselectedCategory }));
          } else if (list.length > 0) {
            setFormData((prev) => ({ ...prev, category: list[0].name }));
          }
        }
      })
      .catch((err) => console.error(err));
  }, [preselectedCategory]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.description) {
      toast.error("Please fill in all mandatory fields");
      return;
    }

    setLoading(true);

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("description", formData.description);
      payload.append("price", formData.price);
      payload.append("category", formData.category);
      payload.append("isVeg", formData.isVeg);
      payload.append("isDelhiSpecial", formData.isDelhiSpecial);

      if (imageFile) {
        payload.append("image", imageFile);
      } else {
        payload.append("image", "1748855584283-food_1.png"); // Default fallback
      }

      const res = await fetch("/api/food/add", {
        method: "POST",
        body: payload,
      });

      const data = await res.json();

      if (data.success) {
        toast.success(`"${formData.name}" added to category "${formData.category}"!`);
        router.push(`/admin/items?category=${encodeURIComponent(formData.category)}`);
      } else {
        toast.error(data.message || "Failed to add food item");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error while adding dish");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/items"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
              Menu Management
            </span>
            <h1 className="text-2xl font-black text-white">Add New Food Item</h1>
          </div>
        </div>

        <Link
          href="/admin/categories"
          className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800"
        >
          <FolderTree className="w-3.5 h-3.5 text-brand-400" />
          <span>New Category?</span>
        </Link>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm"
      >
        {/* Image Upload Area */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Dish Photo (Cloudinary CDN Upload)
          </label>
          <div className="flex items-center gap-6">
            <label
              htmlFor="dish-image"
              className="relative w-36 h-36 rounded-2xl border-2 border-dashed border-slate-700 hover:border-brand-500 bg-slate-900 flex flex-col items-center justify-center cursor-pointer overflow-hidden group transition-colors shrink-0"
            >
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="text-center p-3 text-slate-400 group-hover:text-brand-400">
                  <UploadCloud className="w-8 h-8 mx-auto mb-1" />
                  <span className="text-[11px] font-bold block">Upload Image</span>
                  <span className="text-[9px] text-slate-500">Cloudinary CDN</span>
                </div>
              )}
            </label>
            <input
              type="file"
              id="dish-image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-slate-200">Recommended Resolution:</p>
              <p>Square ratio (800 x 800 px) with clean lighting.</p>
              <p className="text-[11px] text-slate-500">
                Uploaded images are optimized on Cloudinary CDN for instant loading in Delhi.
              </p>
            </div>
          </div>
        </div>

        {/* Dish Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Dish Name *
          </label>
          <input
            required
            type="text"
            placeholder="e.g. Connaught Place Butter Paneer Roll"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Food Description (Delhi Foodie Details) *
          </label>
          <textarea
            required
            rows={3}
            placeholder="Detailed description of flavors, marinades, toppings, and authentic Delhi spices..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          ></textarea>
        </div>

        {/* Price & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Category *
              </label>
              <Link
                href="/admin/categories"
                className="text-[11px] text-brand-400 hover:underline"
              >
                + Add New Category
              </Link>
            </div>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {categories.map((cat) => (
                <option key={cat._id || cat.name} value={cat.name}>
                  {cat.icon || "🍽️"} {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Price (INR ₹) *
            </label>
            <input
              required
              type="number"
              min={10}
              placeholder="e.g. 199"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-bold"
            />
          </div>
        </div>

        {/* Toggles: Veg & Delhi Special */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-800 bg-slate-900 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isVeg}
              onChange={(e) =>
                setFormData({ ...formData, isVeg: e.target.checked })
              }
              className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
            />
            <div>
              <p className="text-xs font-bold text-white">Pure Vegetarian Dish</p>
              <p className="text-[11px] text-slate-400">Displays green veg badge</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-800 bg-slate-900 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isDelhiSpecial}
              onChange={(e) =>
                setFormData({ ...formData, isDelhiSpecial: e.target.checked })
              }
              className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
            />
            <div>
              <p className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                🌟 Chef&apos;s Special / Featured Dish
              </p>
              <p className="text-[11px] text-slate-400">Featured in Specials section &amp; Homepage picks</p>
            </div>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
          <Link
            href="/admin/items"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-xs font-bold text-white shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{loading ? "Adding Dish..." : "Save Dish to Menu"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AdminAddPage() {
  return (
    <Suspense
      fallback={
        <div className="p-16 text-center text-slate-400 text-sm">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          Loading form...
        </div>
      }
    >
      <AddDishContent />
    </Suspense>
  );
}
