"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Tag, Plus, Trash2, CheckCircle2, RotateCw, Sparkles, Percent, DollarSign } from "lucide-react";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discountType: "flat",
    discountValue: "",
    minOrderAmount: "299",
    maxDiscount: "100",
  });

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/coupon");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setCoupons(data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load promo coupons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.code || !formData.discountValue) return;

    try {
      const res = await fetch("/api/coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Coupon "${formData.code}" created!`);
        setFormData({
          code: "",
          description: "",
          discountType: "flat",
          discountValue: "",
          minOrderAmount: "299",
          maxDiscount: "100",
        });
        fetchCoupons();
      } else {
        toast.error(data.message || "Failed to create coupon");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  const handleDelete = async (id, code) => {
    if (!confirm(`Delete coupon "${code}"?`)) return;

    try {
      const res = await fetch(`/api/coupon?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success(`Coupon "${code}" deleted`);
        fetchCoupons();
      } else {
        toast.error("Failed to delete coupon");
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
            Promotions &amp; Discounts
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Coupon &amp; Promo Code Manager
          </h1>
          <p className="text-xs text-slate-400">
            Create discount codes to boost customer orders and sales across Delhi NCR
          </p>
        </div>

        <button
          onClick={fetchCoupons}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition-colors self-start sm:self-auto"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Create Coupon Form */}
      <form
        onSubmit={handleCreate}
        className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-sm"
      >
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Plus className="w-4 h-4 text-brand-400" />
          <span>Create New Promo Code</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Coupon Code *
            </label>
            <input
              required
              type="text"
              placeholder="e.g. DILLI50, FESTIVE100"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white font-mono uppercase font-bold focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Discount Type *
            </label>
            <select
              value={formData.discountType}
              onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold"
            >
              <option value="flat">Flat Amount (₹)</option>
              <option value="percent">Percentage (%)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Discount Value ({formData.discountType === "flat" ? "₹" : "%"}) *
            </label>
            <input
              required
              type="number"
              min={1}
              placeholder={formData.discountType === "flat" ? "50" : "20"}
              value={formData.discountValue}
              onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white font-bold focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Minimum Cart Value (₹)
            </label>
            <input
              type="number"
              min={0}
              placeholder="299"
              value={formData.minOrderAmount}
              onChange={(e) => setFormData({ ...formData, minOrderAmount: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Description / Customer Hint
            </label>
            <input
              type="text"
              placeholder="e.g. Flat ₹50 OFF for all Delhi orders"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-2"
          >
            <Tag className="w-4 h-4" />
            <span>Create Coupon</span>
          </button>
        </div>
      </form>

      {/* Coupons List Grid */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Tag className="w-4 h-4 text-brand-400" />
          <span>Active Coupons ({coupons.length})</span>
        </h2>

        {loading ? (
          <div className="p-16 text-center text-slate-400 text-xs">
            Loading promo coupons...
          </div>
        ) : coupons.length === 0 ? (
          <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center text-slate-400 text-xs">
            No coupons created yet. Create your first coupon above!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coupons.map((c) => (
              <div
                key={c._id}
                className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-sm flex flex-col justify-between space-y-3 relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono font-black text-base text-brand-400 tracking-wider px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20">
                      {c.code}
                    </span>
                    <p className="text-xs text-slate-300 mt-2 font-semibold">
                      {c.description || `${c.discountType === "flat" ? "₹" : ""}${c.discountValue}${c.discountType === "percent" ? "%" : ""} OFF`}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Min order: ₹{c.minOrderAmount || 0}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(c._id, c.code)}
                    className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete Coupon"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Active for Delhi
                  </span>
                  <span className="text-slate-400">
                    {c.discountType === "flat" ? `₹${c.discountValue} Flat` : `${c.discountValue}% OFF`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

