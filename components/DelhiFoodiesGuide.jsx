"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Clock,
  CreditCard,
  MapPin,
  ChevronDown,
  Star,
  Quote,
  Flame,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function DelhiFoodiesGuide() {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "Where is Real Brother's Restaurant located in Noida?",
      a: "Real Brother's Restaurant is located at Gali Number 5, Vishal, Sarfabad Village, Sector 73, Noida, Uttar Pradesh - 201301 (near Tivoli Banquet Hall and Sector 74 border). You can also view our exact pin on Google Maps directly.",
    },
    {
      q: "How fast is delivery to Sector 73, Sector 74, Sector 75, and Sector 76?",
      a: "Our express delivery fleet delivers piping hot food within 25 to 30 minutes across Sector 73, Sector 74 (Capetown), Sector 75, Sector 76, Sector 77, and nearby Noida localities.",
    },
    {
      q: "Can I pay via Cash on Delivery (COD) or UPI?",
      a: "Yes! Real Brother's Restaurant supports all payment options: Cash on Delivery (COD), UPI QR scan (Google Pay, PhonePe, Paytm), and online cards.",
    },
    {
      q: "What are your operating timings?",
      a: "We are open daily Monday through Sunday from 08:00 AM in the morning until 12:00 AM Midnight. Whether you need breakfast, office lunch, or late-night family dinner, we are ready to serve.",
    },
    {
      q: "How is the food packaged to stay fresh and hot?",
      a: "All our curries, tandoori items, rolls, and momos are packed in leak-proof, food-grade thermal containers with tamper-evident seals to preserve authentic aroma and heat.",
    },
    {
      q: "What is the minimum order value for free delivery?",
      a: "Orders above ₹499 qualify for 100% Free Express Delivery across our covered Noida delivery zones. For smaller orders, a nominal ₹40 delivery fee applies.",
    },
  ];

  const testimonials = [
    {
      name: "Vikram Sharma",
      locality: "Sector 73 Noida",
      rating: 5,
      review:
        "Real Brother's Shahi Paneer Handi and crispy Kathi Rolls are true 'Ghar Jaisa Swad'! Delivered boiling hot in 20 minutes to our apartment.",
    },
    {
      name: "Deepak Yadav",
      locality: "Sector 74 (Capetown), Noida",
      rating: 5,
      review:
        "Ordered weekend dinner for the family. The Dal Makhani Bukhara and Garlic Naans were outstanding. Very clean, spill-proof packaging.",
    },
    {
      name: "Pooja Verma",
      locality: "Sarfabad Village, Sector 73",
      rating: 5,
      review:
        "Best Momos and Hakka Noodles in the area! The red chutney has just the right punch and everything tastes fresh.",
    },
  ];

  return (
    <section className="py-20 bg-white" id="foodies-guide">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Bento Grid: Why Food Lovers Trust Real Brother's */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-amber-700 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200 shadow-2xs">
              Ghar Jaisa Swad • Pure Quality
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight">
              Why Food Lovers Trust Real Brother&apos;s
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Four culinary standards that make us Sarfabad &amp; Sector 73 Noida&apos;s favorite dining and delivery choice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 rounded-3xl bg-gradient-to-b from-amber-50/70 to-white border border-amber-200/70 shadow-card hover:shadow-card-hover transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-600/30 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-gray-950">25-30 Min Fast Drop</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Strategically positioned in Sarfabad, Sector 73 ensuring lightning-fast delivery to Sector 73, 74 &amp; 76.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-gradient-to-b from-amber-50/70 to-white border border-amber-200/70 shadow-card hover:shadow-card-hover transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/30 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-gray-950">Ghar Jaisa Swad</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Traditional home-style cooking with genuine aromatic spices, minimal oil, and tender fresh paneer &amp; veggies.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-gradient-to-b from-amber-50/70 to-white border border-amber-200/70 shadow-card hover:shadow-card-hover transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-gray-950">100% Hygienic Prep</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Strict sanitization, certified culinary prep stations, and tamper-evident sealed packaging on every order.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-gradient-to-b from-amber-50/70 to-white border border-amber-200/70 shadow-card hover:shadow-card-hover transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/30 group-hover:scale-110 transition-transform">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-gray-950">Cash or UPI on Delivery</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Pay your way with Cash on Delivery or seamless instant UPI QR payment right at your doorstep.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials from Google Maps / Local Foodies */}
        <div className="rounded-3xl bg-gradient-to-tr from-stone-900 to-stone-950 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>4.9 Star Rating on Google Profile</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
              Loved by Sector 73 Noida Foodies
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm">
              Real reviews from real neighbors in Sarfabad, Sector 74, Sector 75 and surrounding areas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-stone-850/80 border border-stone-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 italic leading-relaxed">
                    &quot;{t.review}&quot;
                  </p>
                </div>
                <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-black text-white">{t.name}</h4>
                    <span className="text-[11px] text-amber-400 flex items-center gap-1 font-semibold">
                      <MapPin className="w-3 h-3 text-amber-500" />
                      {t.locality}
                    </span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            ))}
          </div>

          {/* Google Profile Link Footer */}
          <div className="mt-8 pt-6 border-t border-stone-800/80 text-center relative z-10">
            <a
              href="https://share.google/UPOhBCowyPZ07exvK"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-amber-400 hover:text-amber-300 font-bold underline"
            >
              <span>Read all verified reviews on Google Business Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Frequently Asked Questions Accordion */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-brand-600 bg-red-50 px-4 py-1.5 rounded-full border border-red-200 shadow-2xs">
              Got Questions?
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-gray-950 tracking-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Everything you need to know about ordering from Real Brother&apos;s Restaurant
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-2xl overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="font-extrabold text-sm sm:text-base text-gray-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-brand-600 transition-transform duration-200 shrink-0 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-gray-100 bg-amber-50/30 px-4 sm:px-5 py-4 text-xs sm:text-sm text-gray-700 leading-relaxed font-medium"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
