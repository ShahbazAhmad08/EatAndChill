"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Moon,
  CreditCard,
  MapPin,
  ChevronDown,
  Star,
  Quote,
  Flame,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function DelhiFoodiesGuide() {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "How fast is food delivery from Eat & Chill?",
      a: "Our strategically positioned cloud kitchen hubs deliver to your doorstep within 25 to 30 minutes using multi-layer thermal insulated bags.",
    },
    {
      q: "Can I pay via Cash on Delivery (COD) or UPI?",
      a: "Yes! Eat & Chill supports all convenient payment options. You can choose Cash on Delivery (COD), direct UPI QR payment (Google Pay, PhonePe, Paytm), or credit/debit card checkout via Stripe.",
    },
    {
      q: "What are your delivery timings? Is late-night delivery available?",
      a: "Yes, our cloud kitchens operate daily from 11:00 AM until late night (03:00 AM). Whether you need an office lunch or midnight momos & rolls, we have you covered.",
    },
    {
      q: "How is the food packaged to stay hot during delivery?",
      a: "All orders are sealed inside multi-layer food-grade thermal insulated packaging with tamper-evident safety seals. Hot dishes stay above 65°C, while cold desserts and shakes remain perfectly chilled.",
    },
    {
      q: "What is the minimum order value for free delivery?",
      a: "Orders above ₹499 qualify for 100% Free Express Delivery across our covered service zones. For orders below ₹499, a nominal ₹50 delivery charge applies.",
    },
  ];

  const testimonials = [
    {
      name: "Amitabh Tiwari",
      locality: "Civil Lines, Allahabad",
      rating: 5,
      review:
        "The Paneer Tikka Roll and Shahi Butter Paneer are absolutely unmatched! Delivered in 22 minutes at 1 AM. 10/10 recommend Eat & Chill.",
    },
    {
      name: "Anurag Sharma",
      locality: "Gomti Nagar, Lucknow",
      rating: 5,
      review:
        "We order lunch for our corporate team regularly. The packaging is spill-proof, portions are hearty, and the Awadhi Biryani is delicious!",
    },
    {
      name: "Aditya Singh",
      locality: "Connaught Place",
      rating: 5,
      review:
        "Fastest delivery app! Everything arrives sizzling hot, and the live order tracking shows exact progress. Pure Veg dishes are handled in dedicated prep stations.",
    },
  ];

  return (
    <section className="py-20 bg-white" id="foodies-guide">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Bento Grid: Why Food Lovers Trust Us */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-brand-600 bg-orange-50 px-4 py-1.5 rounded-full border border-orange-200 shadow-2xs">
              Culinary Standards
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight">
              Why Food Lovers Trust Eat &amp; Chill
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Four golden standards that make us your favorite culinary and late-night cloud kitchen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 rounded-3xl bg-gradient-to-b from-orange-50/70 to-white border border-orange-100 shadow-card hover:shadow-card-hover transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center shadow-md shadow-brand-500/30 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-gray-950">30-Min Fast Track</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Strategically positioned cloud hubs guarantee lightning turnaround directly to your home or office.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-gradient-to-b from-orange-50/70 to-white border border-orange-100 shadow-card hover:shadow-card-hover transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                <Moon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-gray-950">Late-Night Comfort</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Craving food at 1 AM? Our kitchens are operational until 3:00 AM every single night without compromises.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-gradient-to-b from-orange-50/70 to-white border border-orange-100 shadow-card hover:shadow-card-hover transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/30 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-gray-950">Tamper-Proof Safe</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Every box and bag is sealed with tamper-evident security tape and 100% spill-proof eco-friendly containers.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-gradient-to-b from-orange-50/70 to-white border border-orange-100 shadow-card hover:shadow-card-hover transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-500/30 group-hover:scale-110 transition-transform">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-gray-950">Honest Pricing</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Transparent menu prices, zero surge pricing during peak meal hours, and free delivery on orders above ₹499.
              </p>
            </div>
          </div>
        </div>

        {/* Customer Testimonials Carousel Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-brand-600 bg-orange-50 px-4 py-1.5 rounded-full border border-orange-200 shadow-2xs">
              Verified Foodie Reviews
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight">
              Real Reviews from Real Food Lovers
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Over 18,500+ happy customers love our food, packaging, and rapid delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-gray-50/80 border border-gray-100 hover:border-brand-200 transition-all space-y-4 relative flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium italic">
                    &ldquo;{t.review}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-200/60 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-gray-900">{t.name}</h4>
                    <span className="text-[11px] text-gray-500 font-semibold">{t.locality}</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Verified Order
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Universal FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-brand-600 bg-orange-50 px-4 py-1.5 rounded-full border border-orange-200 shadow-2xs">
              Clear Answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-200/90 overflow-hidden bg-white shadow-2xs transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-orange-50/40 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-gray-900">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-brand-600" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
