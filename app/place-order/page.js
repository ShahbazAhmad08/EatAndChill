"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import toast from "react-hot-toast";
import {
  CreditCard,
  Banknote,
  QrCode,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  User,
  ArrowRight,
  CheckCircle2,
  Navigation,
  Loader2,
} from "lucide-react";

export default function PlaceOrderPage() {
  const router = useRouter();
  const {
    getTotalCartAmount,
    token,
    food_list,
    cartItems,
    settings,
    setCartItems,
    toggleLoginPopup,
  } = useStore();

  const [loading, setLoading] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe"); // 'stripe', 'cod', 'upi'

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    landmark: "",
    city: "New Delhi",
    state: "Delhi",
    zipcode: "110001",
    country: "India",
    phone: "",
    deliveryNotes: "",
  });

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setDetectingLocation(true);
    toast.loading("Detecting your Delhi delivery location...", { id: "geo" });

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          const data = await res.json();
          if (data && data.address) {
            const addr = data.address;
            const detectedStreet = [
              addr.road,
              addr.suburb || addr.neighbourhood,
              addr.city_district,
            ]
              .filter(Boolean)
              .join(", ");

            setFormData((prev) => ({
              ...prev,
              street: detectedStreet || prev.street || "Delhi NCR",
              landmark: addr.suburb || addr.neighbourhood || prev.landmark,
              city: addr.city || addr.town || addr.state_district || "New Delhi",
              state: addr.state || "Delhi",
              zipcode: addr.postcode || prev.zipcode || "110001",
            }));
            toast.success("📍 Delhi address auto-detected!", { id: "geo" });
          } else {
            toast.success("GPS location received!", { id: "geo" });
          }
        } catch (err) {
          console.error("Geocoding failed:", err);
          toast.success("GPS coordinates captured!", { id: "geo" });
        } finally {
          setDetectingLocation(false);
        }
      },
      (err) => {
        console.warn("Geolocation permission error:", err);
        setDetectingLocation(false);
        toast.error("Location permission denied. Please enter address manually.", {
          id: "geo",
        });
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const subtotal = getTotalCartAmount();
  const freeThreshold = settings.freeDeliveryThreshold || 499;
  const deliveryFee = subtotal >= freeThreshold || subtotal === 0 ? 0 : settings.deliveryFee || 50;
  const grandTotal = subtotal + deliveryFee;

  useEffect(() => {
    if (!token) {
      toast.error("Please sign in to place an order");
      toggleLoginPopup();
      router.push("/cart");
    } else if (subtotal === 0) {
      toast.error("Your cart is empty");
      router.push("/");
    }
  }, [token, subtotal]);

  // Adjust default payment method based on admin settings
  useEffect(() => {
    if (settings.stripeEnabled === false && settings.codEnabled) {
      setPaymentMethod("cod");
    } else if (settings.stripeEnabled === false && settings.upiEnabled) {
      setPaymentMethod("upi");
    }
  }, [settings]);

  const onChangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please sign in first");
      return;
    }

    if (!formData.phone || formData.phone.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number for Delhi delivery rider");
      return;
    }

    setLoading(true);

    try {
      // Gather ordered items with quantity
      const orderItems = [];
      food_list.forEach((item) => {
        const id = item._id || item.id;
        if (cartItems[id] && cartItems[id] > 0) {
          orderItems.push({
            _id: id,
            name: item.name,
            price: item.price,
            quantity: cartItems[id],
            image: item.image,
            category: item.category,
          });
        }
      });

      const payload = {
        items: orderItems,
        amount: grandTotal,
        address: formData,
        paymentMethod: paymentMethod,
      };

      const res = await fetch("/api/order/placed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        if (paymentMethod === "stripe" && data.session_url) {
          toast.loading("Redirecting to secure Stripe checkout...");
          window.location.href = data.session_url;
        } else {
          // COD or UPI
          setCartItems({});
          toast.success(data.message || "Order confirmed!");
          router.push(data.redirectUrl || `/myorders?orderPlaced=true&orderId=${data.orderId}`);
        }
      } else {
        toast.error(data.message || "Failed to place order");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-orange-100/60 px-3 py-1 rounded-full">
            Final Step
          </span>
          <h1 className="text-3xl font-black text-gray-900 mt-2">
            Delivery &amp; Payment Details
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Deliveries across Central, South, North, East &amp; West Delhi NCR
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Delivery Address Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-500" />
                <span>Delhi Delivery Address</span>
              </h2>

              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={detectingLocation}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-brand-700 font-bold text-xs border border-orange-200 transition-colors self-start sm:self-auto disabled:opacity-60"
              >
                {detectingLocation ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Navigation className="w-3.5 h-3.5 text-brand-600" />
                )}
                <span>{detectingLocation ? "Detecting GPS..." : "📍 Auto-Detect Location"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  required
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={onChangeHandler}
                  placeholder="e.g. Rahul"
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  required
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={onChangeHandler}
                  placeholder="e.g. Verma"
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onChangeHandler}
                  placeholder="foodie@example.com"
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Mobile Number (For Delhi Rider) *
                </label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={onChangeHandler}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                House / Flat / Street / Society *
              </label>
              <input
                required
                type="text"
                name="street"
                value={formData.street}
                onChange={onChangeHandler}
                placeholder="Flat 402, Block B, Green Park Extension"
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Delhi Pincode *
                </label>
                <input
                  required
                  type="text"
                  maxLength={6}
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={onChangeHandler}
                  placeholder="110016"
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  City *
                </label>
                <input
                  required
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={onChangeHandler}
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  State *
                </label>
                <input
                  required
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={onChangeHandler}
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Rider Delivery Instructions (Optional)
              </label>
              <textarea
                name="deliveryNotes"
                rows={2}
                value={formData.deliveryNotes}
                onChange={onChangeHandler}
                placeholder="e.g. Ring doorbell twice, leave at reception, or call on arrival"
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              ></textarea>
            </div>
          </div>

          {/* Right: Payment Method Selection & Checkout Summary */}
          <div className="lg:col-span-5 space-y-4">
            {/* Payment Method Selector */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center justify-between">
                <span>Select Payment Method</span>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Admin Controlled
                </span>
              </h2>

              <div className="space-y-2.5">
                {/* 1. Stripe Card Checkout */}
                {settings.stripeEnabled !== false && (
                  <label
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === "stripe"
                        ? "border-brand-500 bg-orange-50/50 shadow-sm"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="stripe"
                        checked={paymentMethod === "stripe"}
                        onChange={() => setPaymentMethod("stripe")}
                        className="text-brand-600 focus:ring-brand-500"
                      />
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-gray-900">
                          Credit / Debit Card / Netbanking
                        </p>
                        <p className="text-[11px] text-gray-500">
                          Secure instant checkout via Stripe gateway
                        </p>
                      </div>
                    </div>
                    <CreditCard className="w-5 h-5 text-brand-600 shrink-0" />
                  </label>
                )}

                {/* 2. Cash on Delivery (COD) */}
                {settings.codEnabled !== false && (
                  <label
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-brand-500 bg-orange-50/50 shadow-sm"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="text-brand-600 focus:ring-brand-500"
                      />
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-gray-900">
                          Cash on Delivery (COD)
                        </p>
                        <p className="text-[11px] text-gray-500">
                          Pay cash or UPI directly to rider upon delivery
                        </p>
                      </div>
                    </div>
                    <Banknote className="w-5 h-5 text-emerald-600 shrink-0" />
                  </label>
                )}

                {/* 3. UPI QR Code */}
                {settings.upiEnabled !== false && (
                  <label
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === "upi"
                        ? "border-brand-500 bg-orange-50/50 shadow-sm"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentMethod === "upi"}
                        onChange={() => setPaymentMethod("upi")}
                        className="text-brand-600 focus:ring-brand-500"
                      />
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-gray-900">
                          UPI QR / Google Pay / PhonePe
                        </p>
                        <p className="text-[11px] text-gray-500">
                          Pay via UPI ID: {settings.upiId || "eatandchill@okhdfcbank"}
                        </p>
                      </div>
                    </div>
                    <QrCode className="w-5 h-5 text-indigo-600 shrink-0" />
                  </label>
                )}
              </div>
            </div>

            {/* Bill & Submit */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
                Order Summary
              </h2>

              <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delhi Express Delivery</span>
                  <span className="font-bold text-gray-900">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <hr className="my-2 border-gray-100" />
                <div className="flex justify-between text-base font-black text-gray-900">
                  <span>Amount to Pay</span>
                  <span className="text-brand-600">₹{grandTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-black text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <span>Processing Delhi Delivery Order...</span>
                ) : (
                  <>
                    <span>Confirm &amp; Place Order (₹{grandTotal})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% Encrypted &amp; Verified Security</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

