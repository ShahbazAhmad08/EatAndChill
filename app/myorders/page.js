"use client";

import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import toast from "react-hot-toast";
import {
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  RotateCw,
  MapPin,
  ArrowRight,
  ShieldCheck,
  ChefHat,
  Home,
  MessageCircle,
  Phone,
} from "lucide-react";

function OrdersContent() {
  const { token, toggleLoginPopup } = useStore();
  const searchParams = useSearchParams();
  const orderPlaced = searchParams.get("orderPlaced");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/order/userorders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });

      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setOrders(data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load your orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [token]);

  if (!token) {
    return (
      <div className="py-20 bg-gray-50 min-h-[70vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-lg border border-gray-100 space-y-4">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-orange-600">
            <Package className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Please Sign In</h2>
          <p className="text-xs text-gray-500">
            Sign in to view your past orders, active deliveries, and live rider tracking.
          </p>
          <button
            onClick={toggleLoginPopup}
            className="w-full py-3 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-md transition-all"
          >
            Sign In to View Orders
          </button>
        </div>
      </div>
    );
  }

  // Determine current step (1 to 4)
  const getStepNumber = (status) => {
    const s = (status || "").toLowerCase();
    if (s.includes("delivered")) return 4;
    if (s.includes("out for delivery")) return 3;
    if (s.includes("processing") || s.includes("kitchen")) return 2;
    if (s.includes("cancelled")) return 0;
    return 1;
  };

  const getStatusBadge = (status) => {
    const s = (status || "").toLowerCase();
    if (s.includes("delivered")) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
          <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
        </span>
      );
    }
    if (s.includes("out for delivery")) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 animate-pulse">
          <Truck className="w-3.5 h-3.5" /> Out for Delivery
        </span>
      );
    }
    if (s.includes("cancel")) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">
          <AlertCircle className="w-3.5 h-3.5" /> Cancelled
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-brand-800">
        <Clock className="w-3.5 h-3.5" /> {status || "Food processing"}
      </span>
    );
  };

  return (
    <div className="py-10 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-orange-100/60 px-3 py-1 rounded-full">
              Live Order Status
            </span>
            <h1 className="text-3xl font-black text-gray-900 mt-2">
              My Orders &amp; Kitchen Tracking
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Live stage updates from our Delhi cloud kitchen directly to your doorstep
            </p>
          </div>

          <button
            onClick={() => {
              fetchOrders();
              toast.success("Order status updated");
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-700 shadow-sm transition-all self-start sm:self-auto"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Refresh Status</span>
          </button>
        </div>

        {orderPlaced && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs sm:text-sm text-emerald-800 font-semibold shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>🎉 Order Confirmed! Our Delhi kitchen chefs have started preparing your meal fresh.</span>
            </div>
          </div>
        )}

        {loading ? (
          <div className="py-24 text-center">
            <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-sm font-medium text-gray-600">Loading your Delhi food orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm max-w-md mx-auto my-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-orange-50 rounded-full flex items-center justify-center text-3xl">
              📦
            </div>
            <h2 className="text-lg font-bold text-gray-900">No orders yet</h2>
            <p className="text-xs text-gray-500 mt-1 mb-6">
              You haven&apos;t placed any orders with Eat &amp; Chill yet. Check out our Delhi menu!
            </p>
            <Link
              href="/#explore-menu"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-md transition-all"
            >
              <span>Order Food Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, idx) => {
              const currentStep = getStepNumber(order.status);
              const orderShortId = String(order._id).slice(-6).toUpperCase();

              const steps = [
                { id: 1, label: "Order Placed", icon: CheckCircle2 },
                { id: 2, label: "In Kitchen", icon: ChefHat },
                { id: 3, label: "Out for Delivery", icon: Truck },
                { id: 4, label: "Delivered", icon: Home },
              ];

              return (
                <div
                  key={order._id || idx}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all space-y-6"
                >
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-orange-100 text-brand-600 flex items-center justify-center font-black text-sm shrink-0">
                        #{orderShortId}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-gray-900 text-sm sm:text-base">
                            Order #{orderShortId}
                          </h3>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Placed:{" "}
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleString("en-IN", {
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "Recently"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <span className="text-lg font-black text-gray-900">
                        ₹{order.amount}
                      </span>
                      {/* WhatsApp Support Button */}
                      <a
                        href={`https://wa.me/917755013772?text=Hello%20Eat%20%26%20Chill%20Delhi%2C%20I%20need%20assistance%20with%20Order%20%23${orderShortId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs border border-emerald-200 transition-colors"
                        title="Chat with Kitchen Manager on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                        <span>Kitchen Support</span>
                      </a>
                    </div>
                  </div>

                  {/* 4-Step Visual Progress Bar */}
                  {currentStep > 0 && (
                    <div className="bg-orange-50/40 rounded-2xl p-4 sm:p-6 border border-orange-100">
                      <div className="grid grid-cols-4 gap-2 relative">
                        {steps.map((st) => {
                          const isDone = currentStep >= st.id;
                          const isCurrent = currentStep === st.id;
                          const IconComp = st.icon;

                          return (
                            <div key={st.id} className="flex flex-col items-center text-center">
                              <div
                                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold transition-all shadow-sm mb-2 ${
                                  isDone
                                    ? "bg-brand-500 text-white shadow-brand-500/30"
                                    : "bg-gray-200 text-gray-400"
                                } ${isCurrent ? "ring-4 ring-orange-200 animate-bounce" : ""}`}
                              >
                                <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                              </div>
                              <span
                                className={`text-[11px] sm:text-xs font-bold leading-tight ${
                                  isDone ? "text-gray-900" : "text-gray-400"
                                }`}
                              >
                                {st.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Items List */}
                  <div className="bg-gray-50/70 rounded-2xl p-4 space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                      Dishes in this order:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {order.items?.map((item, i) => (
                        <div
                          key={i}
                          className="bg-white p-2.5 rounded-xl border border-gray-100 flex items-center justify-between text-xs"
                        >
                          <span className="font-semibold text-gray-800 truncate mr-2">
                            {item.name}
                          </span>
                          <span className="font-bold text-brand-600 shrink-0">
                            x{item.quantity} (₹{item.price * item.quantity})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Address & Rider Note */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-600 pt-2 border-t border-gray-100">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-gray-900">Delhi Delivery: </span>
                        <span>
                          {order.address?.street}, {order.address?.city} ({order.address?.zipcode})
                        </span>
                        {order.address?.deliveryNotes && (
                          <p className="text-[11px] text-amber-700 font-medium mt-0.5">
                            Note: &ldquo;{order.address.deliveryNotes}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-bold uppercase tracking-wider text-[11px] text-gray-500">
                        Payment: {order.paymentMethod || "Prepaid"} ({order.payment ? "✓ Paid" : "COD"})
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MyOrdersPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-sm text-gray-500">Loading orders...</p>
        </div>
      }
    >
      <OrdersContent />
    </Suspense>
  );
}
