"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  FolderTree,
  Plus,
  Trash2,
  ExternalLink,
  UtensilsCrossed,
  PlusCircle,
  RotateCw,
} from "lucide-react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [newCat, setNewCat] = useState("");
  const [newIcon, setNewIcon] = useState("🍛");
  const [loading, setLoading] = useState(true);

  const fetchCats = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/category");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setCategories(data.data.filter((c) => c.name !== "All"));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCat.trim()) return;

    try {
      const res = await fetch("/api/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCat.trim(), icon: newIcon }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Category "${newCat}" created!`);
        setNewCat("");
        fetchCats();
      } else {
        toast.error(data.message || "Failed to create category");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete category "${name}"? Dishes will remain in database.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/category?id=${id}&name=${encodeURIComponent(name)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Category "${name}" deleted`);
        fetchCats();
      } else {
        toast.error(data.message || "Failed to delete category");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <div className="max-w-5xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
            Menu Hierarchy &amp; Cuisines
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Categories &amp; Dishes Explorer
          </h1>
          <p className="text-xs text-slate-400">
            Create cuisine categories, view dishes under each category, and add new specialties
          </p>
        </div>

        <button
          onClick={fetchCats}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition-colors self-start sm:self-auto"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Add New Category Form */}
      <form
        onSubmit={handleAdd}
        className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-sm"
      >
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Plus className="w-4 h-4 text-brand-400" />
          <span>Create New Food Category</span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Icon (e.g. 🌯, 🥟, 🍕)"
            value={newIcon}
            onChange={(e) => setNewIcon(e.target.value)}
            className="w-full sm:w-28 px-3 py-2.5 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white text-center focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <input
            required
            type="text"
            placeholder="Category Name (e.g. Delhi Momos, Shahi Biryani, Tandoori)"
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            className="flex-1 px-4 py-2.5 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <button
            type="submit"
            className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>
      </form>

      {/* Categories & Dishes Breakdown Grid */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <FolderTree className="w-5 h-5 text-brand-400" />
          <span>All Categories &amp; Connected Dishes ({categories.length})</span>
        </h2>

        {loading ? (
          <div className="p-16 text-center text-slate-400 text-sm">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            Loading categories from Atlas...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <div
                key={cat._id || cat.name}
                className="bg-slate-950 rounded-2xl border border-slate-800 p-5 shadow-sm hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
              >
                {/* Top Info */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 rounded-xl bg-slate-900 border border-slate-800">
                      {cat.icon || "🍽️"}
                    </span>
                    <div>
                      <h3 className="font-bold text-white text-base">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-brand-400 font-semibold flex items-center gap-1 mt-0.5">
                        <UtensilsCrossed className="w-3.5 h-3.5" />
                        <span>{cat.dishCount || 0} Dishes in this category</span>
                      </p>
                    </div>
                  </div>

                  {cat._id && (
                    <button
                      onClick={() => handleDelete(cat._id, cat.name)}
                      className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-3 border-t border-slate-900 flex items-center gap-2 text-xs">
                  <Link
                    href={`/admin/items?category=${encodeURIComponent(cat.name)}`}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Dishes</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </Link>

                  <Link
                    href={`/admin/add?category=${encodeURIComponent(cat.name)}`}
                    className="py-2 px-3 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-brand-400 font-semibold transition-colors flex items-center justify-center gap-1"
                    title={`Add Dish directly to ${cat.name}`}
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add Dish</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
