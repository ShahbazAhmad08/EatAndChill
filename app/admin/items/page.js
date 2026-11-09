"use client";

import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  PlusCircle,
  Trash2,
  Edit2,
  Search,
  Check,
  X,
  Flame,
  RotateCw,
  FolderTree,
} from "lucide-react";

function ItemsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState("");

  const fetchFoodsAndCats = async () => {
    try {
      setLoading(true);
      const [foodRes, catRes] = await Promise.all([
        fetch("/api/food/list"),
        fetch("/api/category"),
      ]);
      const foodData = await foodRes.json();
      const catData = await catRes.json();

      if (foodData.success && Array.isArray(foodData.data)) {
        setFoods(foodData.data);
      }
      if (catData.success && Array.isArray(catData.data)) {
        setCategories(catData.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load food list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodsAndCats();
  }, []);

  useEffect(() => {
    const urlCat = searchParams.get("category");
    if (urlCat) setSelectedCategory(urlCat);
  }, [searchParams]);

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to remove "${name}" from the menu?`)) {
      return;
    }

    try {
      const res = await fetch("/api/food/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`"${name}" removed successfully`);
        fetchFoodsAndCats();
      } else {
        toast.error("Failed to remove item");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  const handleToggleAvailable = async (id, currentStatus) => {
    try {
      const res = await fetch("/api/food/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, available: !currentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Dish marked as ${!currentStatus ? "In Stock" : "Out of Stock"}`);
        fetchFoodsAndCats();
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  const handleSavePrice = async (id) => {
    if (!editPrice || isNaN(editPrice)) {
      toast.error("Enter a valid price");
      return;
    }

    try {
      const res = await fetch("/api/food/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, price: Number(editPrice) }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Price updated!");
        setEditingId(null);
        fetchFoodsAndCats();
      } else {
        toast.error("Failed to update price");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  const filteredFoods = foods.filter((f) => {
    // Category filter
    if (selectedCategory !== "All") {
      if (selectedCategory === "Delhi Specials") {
        if (!f.isDelhiSpecial) return false;
      } else if (f.category?.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
    }

    // Search filter
    if (search.trim() !== "") {
      const q = search.toLowerCase();
      const matchName = f.name?.toLowerCase().includes(q);
      const matchCat = f.category?.toLowerCase().includes(q);
      const matchDesc = f.description?.toLowerCase().includes(q);
      if (!matchName && !matchCat && !matchDesc) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
            Menu Catalog
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Food Items &amp; Pricing
          </h1>
          <p className="text-xs text-slate-400">
            Total {foods.length} items in Atlas | Showing {filteredFoods.length} in{" "}
            <strong className="text-brand-400">{selectedCategory}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/categories"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 border border-slate-700 transition-colors"
          >
            <FolderTree className="w-4 h-4 text-brand-400" />
            <span>Manage Categories</span>
          </Link>
          <Link
            href={
              selectedCategory !== "All"
                ? `/admin/add?category=${encodeURIComponent(selectedCategory)}`
                : "/admin/add"
            }
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-xs font-bold text-white shadow-lg transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Dish</span>
          </Link>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
            selectedCategory === "All"
              ? "bg-brand-500 text-white shadow-md shadow-orange-500/20"
              : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          All Dishes ({foods.length})
        </button>

        {categories
          .filter((c) => c.name !== "All")
          .map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();
            return (
              <button
                key={cat._id || cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  isSelected
                    ? "bg-brand-500 text-white shadow-md shadow-orange-500/20"
                    : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                <span>{cat.icon || "🍽️"}</span>
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-75 font-mono">({cat.dishCount || 0})</span>
              </button>
            );
          })}
      </div>

      {/* Search Input */}
      <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center gap-3 max-w-md">
        <Search className="w-4 h-4 text-slate-500 shrink-0" />
        <input
          type="text"
          placeholder={`Search dishes in ${selectedCategory}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none"
        />
        {search && (
          <button onClick={() => setSearch("")} className="text-xs text-slate-400 hover:text-white">
            ✕
          </button>
        )}
      </div>

      {/* Dishes Table */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-16 text-center text-slate-400 text-sm">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            Loading menu items...
          </div>
        ) : filteredFoods.length === 0 ? (
          <div className="p-16 text-center text-slate-400 text-sm space-y-3">
            <p>No dishes found under &quot;{selectedCategory}&quot;.</p>
            <Link
              href={`/admin/add?category=${encodeURIComponent(selectedCategory !== "All" ? selectedCategory : "Rolls")}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Dish to {selectedCategory}</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/60 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Photo</th>
                  <th className="py-3 px-4">Dish Name &amp; Description</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Price (₹)</th>
                  <th className="py-3 px-4">Availability</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {filteredFoods.map((item) => {
                  const id = item._id || item.id;
                  const isEditing = editingId === id;
                  const isAvailable = item.available !== false;
                  const imgSrc = item.image?.startsWith("http")
                    ? item.image
                    : item.image?.startsWith("/")
                    ? item.image
                    : `/uploads/${item.image}`;

                  return (
                    <tr key={id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3 px-4">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
                          <Image
                            src={imgSrc}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                          <span>{item.name}</span>
                          {item.isDelhiSpecial && (
                            <span className="text-[10px] font-black uppercase text-brand-400 bg-orange-950 px-1.5 py-0.5 rounded border border-orange-800 inline-flex items-center gap-0.5">
                              <Flame className="w-2.5 h-2.5 fill-brand-400" /> Delhi Special
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 max-w-sm line-clamp-1 mt-0.5">
                          {item.description}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-semibold text-[11px]">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.isVeg
                              ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                              : "bg-red-950 text-red-400 border border-red-800"
                          }`}
                        >
                          {item.isVeg ? "Veg" : "Non-Veg"}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-black text-sm text-brand-400">
                        {isEditing ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              value={editPrice}
                              onChange={(e) => setEditPrice(e.target.value)}
                              className="w-16 px-2 py-1 text-xs bg-slate-800 border border-slate-700 rounded text-white"
                            />
                            <button
                              onClick={() => handleSavePrice(id)}
                              className="p-1 text-emerald-400 hover:bg-slate-800 rounded"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-1 text-slate-400 hover:bg-slate-800 rounded"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span>₹{item.price}</span>
                            <button
                              onClick={() => {
                                setEditingId(id);
                                setEditPrice(item.price);
                              }}
                              className="text-slate-500 hover:text-slate-300"
                              title="Quick Edit Price"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleAvailable(id, isAvailable)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                            isAvailable
                              ? "bg-emerald-950 text-emerald-400 border border-emerald-800 hover:bg-emerald-900"
                              : "bg-red-950 text-red-400 border border-red-800 hover:bg-red-900"
                          }`}
                          title="Click to toggle In Stock / Out of Stock"
                        >
                          {isAvailable ? "✓ In Stock" : "✕ Out of Stock"}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDelete(id, item.name)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete Dish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminItemsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-16 text-center text-slate-400 text-sm">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          Loading items...
        </div>
      }
    >
      <ItemsContent />
    </Suspense>
  );
}
