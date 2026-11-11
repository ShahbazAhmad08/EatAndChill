"use client";

import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import {
  ShoppingBag,
  RotateCw,
  Clock,
  CheckCircle2,
  Truck,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Banknote,
  QrCode,
  AlertCircle,
  Filter,
  Printer,
  Bell,
  BellOff,
  Volume2,
  X,
} from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeKOT, setActiveKOT] = useState(null); // Selected order for KOT print
  const prevOrdersCountRef = useRef(null);

  // Play Kitchen Bell Sound via Web Audio API
  const playKitchenBell = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      // Double ding frequency: 880Hz then 1320Hz
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.85);
    } catch (e) {
      console.warn("Audio playback not allowed without interaction:", e);
    }
  };

  const fetchOrders = async (isBackground = false) => {
    try {
      if (!isBackground) setLoading(true);
      const res = await fetch("/api/order/list");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        // Check if there are newly arrived orders
        if (
          prevOrdersCountRef.current !== null &&
          data.data.length > prevOrdersCountRef.current
        ) {
          const newCount = data.data.length - prevOrdersCountRef.current;
          toast.success(`🔔 ${newCount} New Order received in Delhi Kitchen!`, {
            duration: 5000,
          });
          if (soundEnabled) {
            playKitchenBell();
          }
        }
        prevOrdersCountRef.current = data.data.length;
        setOrders(data.data);
      }
    } catch (err) {
      console.error(err);
      if (!isBackground) toast.error("Failed to load orders");
    } finally {
      if (!isBackground) setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    // Live background polling every 20 seconds for new incoming orders
    const interval = setInterval(() => {
      fetchOrders(true);
    }, 20000);

    return () => clearInterval(interval);
  }, [soundEnabled]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch("/api/order/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Order status set to: ${newStatus}`);
        fetchOrders(true);
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  const handleTogglePayment = async (orderId, currentPayment) => {
    try {
      const res = await fetch("/api/order/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, payment: !currentPayment }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Payment marked as: ${!currentPayment ? "PAID" : "UNPAID"}`);
        fetchOrders(true);
      } else {
        toast.error("Failed to update payment");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  const printKOT = () => {
    window.print();
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    const s = (order.status || "").toLowerCase();
    if (activeTab === "processing") return s.includes("processing") || s.includes("confirmed");
    if (activeTab === "out") return s.includes("out for delivery");
    if (activeTab === "delivered") return s.includes("delivered");
    if (activeTab === "unpaid") return !order.payment;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
            Delhi Dispatch &amp; Kitchen
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1 flex items-center gap-2">
            <span>Orders Manager</span>
            <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
              Live Polling Active
            </span>
          </h1>
          <p className="text-xs text-slate-400">
            Monitor incoming orders, assign delivery statuses, and verify payments
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Sound Alert Toggle */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) {
                playKitchenBell();
                toast.success("Kitchen Bell Sound Enabled 🔔");
              } else {
                toast("Kitchen Bell Sound Muted 🔕");
              }
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
              soundEnabled
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                : "bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200"
            }`}
            title="Toggle Kitchen Bell on new order"
          >
            {soundEnabled ? <Bell className="w-3.5 h-3.5" /> : <BellOff className="w-3.5 h-3.5" />}
            <span>{soundEnabled ? "Bell ON" : "Bell Muted"}</span>
          </button>

          <button
            onClick={() => fetchOrders()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
        {[
          { id: "all", label: `All (${orders.length})` },
          { id: "processing", label: "In Kitchen" },
          { id: "out", label: "Out for Delivery" },
          { id: "delivered", label: "Delivered" },
          { id: "unpaid", label: "Unpaid / COD" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "bg-brand-500 text-white shadow-md shadow-orange-500/20"
                : "bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="p-16 text-center text-slate-400 text-sm">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          Loading orders...
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-slate-950 rounded-2xl p-12 text-center border border-slate-800 max-w-md mx-auto">
          <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h2 className="text-base font-bold text-white">No orders in this view</h2>
          <p className="text-xs text-slate-400 mt-1">
            Orders matching this filter will show up here automatically.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-sm space-y-4 hover:border-slate-700 transition-all"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-brand-400 flex items-center justify-center font-bold text-xs shrink-0">
                    #{String(order._id).slice(-4).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">
                      {order.address?.firstName} {order.address?.lastName}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Placed:{" "}
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString("en-IN")
                        : "Recently"}
                    </p>
                  </div>
                </div>

                {/* Actions: Print KOT, Payment, Status */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Print KOT Action */}
                  <button
                    onClick={() => setActiveKOT(order)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-200 border border-slate-700 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5 text-brand-400" />
                    <span>Print KOT / Bill</span>
                  </button>

                  <button
                    onClick={() => handleTogglePayment(order._id, order.payment)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                      order.payment
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                        : "bg-amber-950 text-amber-400 border border-amber-800"
                    }`}
                    title="Click to toggle payment state"
                  >
                    {order.payment ? "✓ Paid" : "Unpaid / Pending"}
                  </button>

                  <select
                    value={order.status || "Food processing"}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="bg-slate-900 text-white text-xs px-3 py-1.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-500 font-bold"
                  >
                    <option value="Food processing">Food processing</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Items List */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Ordered Dishes:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {order.items?.map((it, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs flex justify-between items-center"
                    >
                      <span className="text-slate-200 font-medium truncate mr-2">
                        {it.name}
                      </span>
                      <span className="font-bold text-brand-400 shrink-0">
                        x{it.quantity} (₹{it.price * it.quantity})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer & Address Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-400">
                <div className="space-y-1">
                  <p className="font-bold text-slate-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-400" />
                    <span>Delhi Delivery Address:</span>
                  </p>
                  <p className="pl-5 leading-relaxed text-slate-300">
                    {order.address?.street}, {order.address?.city}, {order.address?.state}{" "}
                    - <strong className="text-white">{order.address?.zipcode}</strong>
                  </p>
                  {order.address?.deliveryNotes && (
                    <p className="pl-5 text-[11px] text-amber-300 italic">
                      Note: &ldquo;{order.address.deliveryNotes}&rdquo;
                    </p>
                  )}
                </div>

                <div className="space-y-1 md:text-right">
                  <p className="font-bold text-slate-300 flex md:justify-end items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-brand-400" />
                    <span>Rider Contact:</span>
                  </p>
                  <p className="text-slate-200">
                    Phone:{" "}
                    <a
                      href={`tel:${order.address?.phone}`}
                      className="text-brand-400 font-bold hover:underline"
                    >
                      {order.address?.phone}
                    </a>
                  </p>
                  <p className="text-slate-400">Email: {order.address?.email}</p>
                  <p className="text-sm font-black text-white pt-1">
                    Total Amount: <span className="text-brand-400">₹{order.amount}</span>{" "}
                    <span className="text-xs font-normal text-slate-400">
                      via {order.paymentMethod ? order.paymentMethod.toUpperCase() : "STRIPE"}
                    </span>
                  </p>

                  {order.paymentMethod === "upi" && (
                    <div className="mt-2 p-2 rounded-xl bg-orange-950/50 border border-orange-800/80 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-orange-200">
                        <QrCode className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                        <span>UPI UTR:</span>
                        <strong className="font-mono text-white text-xs bg-slate-900 px-2 py-0.5 rounded border border-orange-800/60 select-all">
                          {order.transactionId || "Pending"}
                        </strong>
                      </div>
                      {order.transactionId && (
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(order.transactionId);
                            toast.success("UTR copied to clipboard!");
                          }}
                          className="text-[10px] bg-slate-800 hover:bg-slate-700 text-orange-300 px-2.5 py-1 rounded-md font-bold transition-colors"
                        >
                          Copy
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Printable KOT & Thermal Receipt Modal */}
      {activeKOT && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-gray-900 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setActiveKOT(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-800 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Thermal Print Area */}
            <div id="kot-receipt" className="font-mono text-xs border border-dashed border-gray-300 p-4 rounded-xl bg-gray-50/50">
              <div className="text-center pb-3 border-b border-dashed border-gray-300">
                <h2 className="font-black text-base uppercase tracking-wider text-black">
                  EAT &amp; CHILL DELHI
                </h2>
                <p className="text-[10px] text-gray-500">KITCHEN ORDER TICKET (KOT) / TAX INVOICE</p>
                <p className="text-[10px] text-gray-600 mt-0.5">Connaught Place Cloud Kitchen, New Delhi</p>
              </div>

              <div className="py-2.5 border-b border-dashed border-gray-300 space-y-1 text-[11px]">
                <div className="flex justify-between font-bold">
                  <span>ORDER #{String(activeKOT._id).slice(-6).toUpperCase()}</span>
                  <span>{new Date(activeKOT.createdAt || Date.now()).toLocaleTimeString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Customer:</span>
                  <span className="font-bold text-gray-900">
                    {activeKOT.address?.firstName} {activeKOT.address?.lastName}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phone:</span>
                  <span className="font-bold text-gray-900">{activeKOT.address?.phone}</span>
                </div>
                <div className="text-gray-600">
                  <span>Locality/Pin: </span>
                  <span className="font-bold text-gray-900">
                    {activeKOT.address?.city} ({activeKOT.address?.zipcode})
                  </span>
                </div>
                {activeKOT.address?.deliveryNotes && (
                  <div className="p-1.5 bg-yellow-100 rounded text-[10px] font-bold text-yellow-900">
                    Note: {activeKOT.address.deliveryNotes}
                  </div>
                )}
              </div>

              {/* Items Table */}
              <div className="py-2.5 border-b border-dashed border-gray-300">
                <div className="flex justify-between font-black text-[11px] pb-1 border-b border-gray-200">
                  <span>ITEM</span>
                  <span>QTY</span>
                  <span>AMT</span>
                </div>
                <div className="space-y-1.5 pt-1.5">
                  {activeKOT.items?.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-[11px]">
                      <span className="font-bold text-gray-800 truncate mr-2">
                        {it.name}
                      </span>
                      <span className="font-black px-2">{it.quantity}</span>
                      <span className="font-mono">₹{it.price * it.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="pt-2.5 space-y-1 text-[11px]">
                <div className="flex justify-between font-bold text-gray-700">
                  <span>Payment Mode:</span>
                  <span className="uppercase">{activeKOT.paymentMethod || "Prepaid"}</span>
                </div>
                {activeKOT.transactionId && (
                  <div className="flex justify-between font-bold text-emerald-800">
                    <span>UPI UTR / Ref:</span>
                    <span className="font-mono">{activeKOT.transactionId}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-gray-700">
                  <span>Payment Status:</span>
                  <span className={activeKOT.payment ? "text-emerald-700" : "text-amber-700"}>
                    {activeKOT.payment ? "PAID" : "CASH ON DELIVERY"}
                  </span>
                </div>
                <div className="flex justify-between font-black text-sm pt-1 border-t border-gray-300 text-black">
                  <span>TOTAL BILL:</span>
                  <span>₹{activeKOT.amount}</span>
                </div>
              </div>

              <div className="text-center pt-3 text-[10px] text-gray-500 border-t border-dashed border-gray-300 mt-3">
                <p>Eat &amp; Chill Delhi - Express Cloud Kitchen</p>
                <p>FSSAI Lic No: 13324001000892</p>
                <p className="font-bold mt-0.5">Thank you for dining with us!</p>
              </div>
            </div>

            {/* Print Buttons */}
            <div className="mt-4 flex gap-3">
              <button
                onClick={printKOT}
                className="flex-1 py-3 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
              >
                <Printer className="w-4 h-4" />
                <span>Send to Thermal Printer (80mm)</span>
              </button>
              <button
                onClick={() => setActiveKOT(null)}
                className="px-5 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
