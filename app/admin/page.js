"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  DollarSign,
  ShoppingBag,
  UtensilsCrossed,
  Users,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  PlusCircle,
  CreditCard,
  MapPin,
  RotateCw,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard metrics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch("/api/order/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Order updated to: ${newStatus}`);
        fetchStats();
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
            Delhi Operations Hub
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-400">
            Real-time analytics, order dispatch, and payment gateway control
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchStats}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
          <Link
            href="/admin/add"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-xs font-bold text-white shadow-lg transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add New Dish</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white">
            ₹{stats?.totalRevenue?.toLocaleString("en-IN") || 0}
          </p>
          <p className="text-[11px] text-emerald-400">Paid &amp; verified orders</p>
        </div>

        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Orders
            </span>
            <div className="w-9 h-9 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white">
            {stats?.totalOrders || 0}
          </p>
          <p className="text-[11px] text-slate-400">
            {stats?.pendingOrders || 0} in kitchen / delivery
          </p>
        </div>

        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Menu Items
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white">
            {stats?.totalFoodItems || 0}
          </p>
          <p className="text-[11px] text-indigo-400">Across all categories</p>
        </div>

        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Registered Users
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white">
            {stats?.totalUsers || 0}
          </p>
          <p className="text-[11px] text-purple-400">Delhi customer database</p>
        </div>
      </div>

      {/* Quick Access Control Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link
          href="/admin/settings"
          className="bg-slate-950 hover:bg-slate-800/80 p-5 rounded-2xl border border-slate-800 transition-all group flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-brand-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm group-hover:text-brand-400 transition-colors">
              Payment Control Center
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Enable/Disable Stripe, COD, or UPI directly
            </p>
          </div>
        </Link>

        <Link
          href="/admin/orders"
          className="bg-slate-950 hover:bg-slate-800/80 p-5 rounded-2xl border border-slate-800 transition-all group flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm group-hover:text-sky-400 transition-colors">
              Manage Orders &amp; Riders
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live updates: Out for delivery &amp; Delivered
            </p>
          </div>
        </Link>

        <Link
          href="/admin/items"
          className="bg-slate-950 hover:bg-slate-800/80 p-5 rounded-2xl border border-slate-800 transition-all group flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors">
              Menu Items &amp; Pricing
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Edit dishes, prices, and availability
            </p>
          </div>
        </Link>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h2 className="font-bold text-white text-base">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            Loading recent orders...
          </div>
        ) : !stats?.recentOrders || stats.recentOrders.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            No orders placed yet. Orders will appear here live.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/60 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {stats.recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-400">
                      #{String(order._id).slice(-6).toUpperCase()}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-white">
                      {order.address?.firstName} {order.address?.lastName}
                      <p className="text-[11px] text-slate-400 font-normal">
                        {order.address?.phone}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {order.items?.length || 0} items
                    </td>
                    <td className="py-3.5 px-4 font-black text-brand-400">
                      ₹{order.amount}
                    </td>
                    <td className="py-3.5 px-4 capitalize">
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-bold">
                        {order.paymentMethod || "stripe"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          order.status?.toLowerCase().includes("delivered")
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                            : order.status?.toLowerCase().includes("out for delivery")
                            ? "bg-sky-950 text-sky-400 border border-sky-800"
                            : "bg-orange-950 text-brand-400 border border-orange-800"
                        }`}
                      >
                        {order.status || "Food processing"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <select
                        value={order.status || "Food processing"}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="bg-slate-800 text-slate-200 text-xs px-2.5 py-1 rounded-lg border border-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      >
                        <option value="Food processing">Food processing</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

