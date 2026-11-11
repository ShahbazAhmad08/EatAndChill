"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import toast from "react-hot-toast";
import Image from "next/image";
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
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Lock,
} from "lucide-react";

export default function PlaceOrderPage() {
  const router = useRouter();
  const {
    getTotalCartAmount,
    token,
    food_list,
    cartItems,
    settings: storeSettings,
    setCartItems,
    toggleLoginPopup,
    isLoading,
  } = useStore();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi"); // 'upi', 'cod', 'stripe'
  const [utrNumber, setUtrNumber] = useState("");
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Live admin settings directly from DB to prevent stale cache
  const [liveSettings, setLiveSettings] = useState(storeSettings || {});

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

  // Client hydration check & fetch live admin settings
  useEffect(() => {
    setMounted(true);

    const fetchLiveSettings = async () => {
      try {
        const res = await fetch(`/api/admin/settings?t=${Date.now()}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (data.success && data.data) {
          setLiveSettings(data.data);
          // Set preferred payment method based on admin settings
          if (data.data.upiEnabled !== false) {
            setPaymentMethod("upi");
          } else if (data.data.codEnabled) {
            setPaymentMethod("cod");
          } else if (data.data.stripeEnabled) {
            setPaymentMethod("stripe");
          }
        }
      } catch (err) {
        console.error("Error fetching live settings on checkout:", err);
      }
    };

    fetchLiveSettings();
  }, []);

  // Compute pricing
  const subtotal = getTotalCartAmount();
  const freeThreshold = liveSettings.freeDeliveryThreshold || 499;
  const deliveryFee =
    subtotal >= freeThreshold || subtotal === 0 ? 0 : liveSettings.deliveryFee || 50;
  const grandTotal = subtotal + deliveryFee;

  // Active UPI configuration
  const activeUpiId = liveSettings.upiId || storeSettings?.upiId || "7755013772@ybl";
  const activeStoreName = liveSettings.storeName || "Eat & Chill";

  // Dynamic UPI URL for QR code & mobile deep link
  const upiPayUrl = `upi://pay?pa=${activeUpiId}&pn=${encodeURIComponent(
    activeStoreName
  )}&am=${grandTotal}&cu=INR&tn=${encodeURIComponent(
    `Eat & Chill Order (Total Rs.${grandTotal})`
  )}`;

  const upiQrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=8&data=${encodeURIComponent(
    upiPayUrl
  )}`;

  const handleCopyUpi = () => {
    if (!activeUpiId) return;
    navigator.clipboard.writeText(activeUpiId);
    setCopiedUpi(true);
    toast.success("UPI ID copied to clipboard!");
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setDetectingLocation(true);
    toast.loading("Detecting your delivery location...", { id: "geo" });

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
              street: detectedStreet || prev.street || "Delivery Address",
              landmark: addr.suburb || addr.neighbourhood || prev.landmark,
              city: addr.city || addr.town || addr.state_district || "New Delhi",
              state: addr.state || "Delhi",
              zipcode: addr.postcode || prev.zipcode || "110001",
            }));
            toast.success("📍 Address auto-detected!", { id: "geo" });
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

  const onChangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const clientToken =
      token || (typeof window !== "undefined" ? localStorage.getItem("token") : "");

    if (!clientToken) {
      toast.error("Please sign in to place your order");
      toggleLoginPopup();
      return;
    }

    if (!formData.phone || formData.phone.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number for delivery rider");
      return;
    }

    // If UPI is chosen, validate that user provided UTR number
    if (paymentMethod === "upi") {
      if (!utrNumber.trim() || utrNumber.trim().length < 6) {
        toast.error("Please enter the 12-digit UPI UTR / Reference ID after paying");
        return;
      }
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

      if (orderItems.length === 0) {
        toast.error("Your cart is empty. Please add items first.");
        setLoading(false);
        return;
      }

      const payload = {
        items: orderItems,
        amount: grandTotal,
        address: formData,
        paymentMethod: paymentMethod,
        transactionId: paymentMethod === "upi" ? utrNumber.trim() : "",
        deliveryNotes: formData.deliveryNotes,
      };

      const res = await fetch("/api/order/placed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: clientToken,
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
          toast.success(
            paymentMethod === "upi"
              ? "🎉 Payment submitted! Order confirmed."
              : data.message || "Order placed successfully!"
          );
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

  // Wait until client mounted to prevent SSR hydration mismatch
  if (!mounted) {
    return (
      <div className="py-24 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 text-brand-500 animate-spin mx-auto" />
          <p className="text-xs font-semibold text-gray-500">Loading checkout...</p>
        </div>
      </div>
    );
  }

  const effectiveToken =
    token || (typeof window !== "undefined" ? localStorage.getItem("token") : "");

  // If user is not logged in, show friendly authentication gate
  if (!effectiveToken) {
    return (
      <div className="py-16 bg-gray-50 min-h-[75vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-xl border border-gray-100 space-y-5">
          <div className="w-16 h-16 bg-orange-100/80 rounded-2xl flex items-center justify-center mx-auto text-brand-600">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900">Sign In to Order</h2>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              To guarantee fast doorstep delivery, live GPS tracking, and secure payment, please sign in or create your account.
            </p>
          </div>
          <button
            onClick={toggleLoginPopup}
            className="w-full py-3.5 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-black text-sm shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Sign In / Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => router.push("/cart")}
            className="text-xs font-bold text-gray-400 hover:text-gray-600 block mx-auto"
          >
            ← Return to Cart
          </button>
        </div>
      </div>
    );
  }

  // If cart is empty after data loaded
  if (!isLoading && Object.keys(cartItems).length === 0 && subtotal === 0) {
    return (
      <div className="py-16 bg-gray-50 min-h-[70vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-lg border border-gray-100 space-y-4">
          <div className="text-4xl">🛒</div>
          <h2 className="text-xl font-black text-gray-900">Your cart is empty</h2>
          <p className="text-xs text-gray-500">
            Add delicious dishes to your cart before proceeding to checkout.
          </p>
          <button
            onClick={() => router.push("/menu")}
            className="w-full py-3 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-black text-xs shadow-md transition-all"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

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
            Hot &amp; fresh delivery dispatched within 30 minutes to your address
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Delivery Address Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-500" />
                <span>Delivery Address</span>
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
                  Mobile Number (For Delivery Rider) *
                </label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={onChangeHandler}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                House / Flat / Street / Landmark *
              </label>
              <input
                required
                type="text"
                name="street"
                value={formData.street}
                onChange={onChangeHandler}
                placeholder="House / Flat No., Building name, Street"
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Pincode *
                </label>
                <input
                  required
                  type="text"
                  maxLength={6}
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={onChangeHandler}
                  placeholder="110001"
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
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Instant Verification
                </span>
              </h2>

              <div className="space-y-3">
                {/* 1. UPI QR Code Option */}
                {liveSettings.upiEnabled !== false && (
                  <div
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      paymentMethod === "upi"
                        ? "border-brand-500 bg-orange-50/20 ring-2 ring-brand-500/20"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <label className="flex items-center justify-between p-3.5 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={paymentMethod === "upi"}
                          onChange={() => setPaymentMethod("upi")}
                          className="text-brand-600 focus:ring-brand-500 w-4 h-4"
                        />
                        <div>
                          <p className="text-xs sm:text-sm font-black text-gray-900 flex items-center gap-1.5">
                            <span>UPI QR / GPay / PhonePe / Paytm</span>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                              Fast &amp; 0% Fee
                            </span>
                          </p>
                          <p className="text-[11px] text-gray-500 font-mono mt-0.5">
                            UPI ID: <span className="font-bold text-gray-800">{activeUpiId}</span>
                          </p>
                        </div>
                      </div>
                      <QrCode className="w-6 h-6 text-brand-600 shrink-0" />
                    </label>

                    {/* EXPANDED UPI QR & PAYMENT CARD */}
                    {paymentMethod === "upi" && (
                      <div className="p-4 bg-white border-t border-orange-100 space-y-4">
                        {/* QR Code Container */}
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-2xl border border-orange-200/80 text-center">
                          <p className="text-xs font-black text-gray-900 mb-1">
                            Scan with Any UPI App to Pay
                          </p>
                          <p className="text-[11px] text-gray-500 mb-3">
                            Google Pay, PhonePe, Paytm, BHIM, CRED or Any Bank App
                          </p>

                          <div className="inline-block p-2 bg-white rounded-2xl shadow-md border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={upiQrImageUrl}
                              alt={`UPI QR for ${activeUpiId}`}
                              width={210}
                              height={210}
                              className="mx-auto rounded-lg"
                            />
                          </div>

                          <div className="mt-3 flex items-center justify-center gap-2">
                            <span className="text-xs font-mono font-bold bg-white px-3 py-1.5 rounded-xl border border-orange-200 text-gray-800 shadow-2xs">
                              {activeUpiId}
                            </span>
                            <button
                              type="button"
                              onClick={handleCopyUpi}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sm transition-all"
                            >
                              {copiedUpi ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy UPI ID</span>
                                </>
                              )}
                            </button>
                          </div>

                          {/* Mobile UPI Deep Link */}
                          <div className="mt-3 pt-3 border-t border-orange-200/60">
                            <a
                              href={upiPayUrl}
                              className="inline-flex items-center gap-1.5 text-xs font-black text-brand-700 hover:text-brand-800 bg-white hover:bg-orange-50 px-4 py-2 rounded-xl border border-orange-300 shadow-2xs transition-colors"
                            >
                              <span>📱 Pay directly in UPI App (Mobile)</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>

                        {/* UTR Reference ID Input */}
                        <div className="space-y-1.5 pt-1">
                          <label className="block text-xs font-black text-gray-900">
                            Enter 12-Digit UPI UTR / Transaction ID *
                          </label>
                          <input
                            required={paymentMethod === "upi"}
                            type="text"
                            maxLength={16}
                            value={utrNumber}
                            onChange={(e) => setUtrNumber(e.target.value.trim())}
                            placeholder="e.g. 412356789012"
                            className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono font-bold text-gray-900 placeholder:font-sans placeholder:font-normal"
                          />
                          <p className="text-[11px] text-gray-500 leading-normal">
                            💡 Found in your payment receipt on Google Pay / PhonePe / Paytm as <strong>UTR / UPI Ref No</strong>.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Cash on Delivery (COD) */}
                {liveSettings.codEnabled !== false && (
                  <label
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-brand-500 bg-orange-50/50 shadow-sm ring-2 ring-brand-500/20"
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
                        className="text-brand-600 focus:ring-brand-500 w-4 h-4"
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

                {/* 3. Stripe Card Checkout */}
                {liveSettings.stripeEnabled !== false && (
                  <label
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "stripe"
                        ? "border-brand-500 bg-orange-50/50 shadow-sm ring-2 ring-brand-500/20"
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
                        className="text-brand-600 focus:ring-brand-500 w-4 h-4"
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
                  <span>Express 30-Min Delivery</span>
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
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Order...</span>
                  </div>
                ) : (
                  <>
                    <span>
                      {paymentMethod === "upi"
                        ? `Confirm UPI Payment & Order (₹${grandTotal})`
                        : `Confirm & Place Order (₹${grandTotal})`}
                    </span>
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
