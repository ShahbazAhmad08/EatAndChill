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
      q: "Which areas in Delhi NCR do you deliver to?",
      a: "We deliver across all prominent areas of Delhi NCR including Connaught Place, South Delhi (Hauz Khas, Saket, Greater Kailash, Malviya Nagar), Dwarka, Rohini, Karol Bagh, Vasant Kunj, Laxmi Nagar, Noida, and Gurugram border. Delivery typically takes 25 to 35 minutes.",
    },
    {
      q: "Can I pay via Cash on Delivery (COD) or UPI in Delhi?",
      a: "Yes! Eat & Chill supports all convenient payment options controlled right through our system. You can choose Cash on Delivery (COD), direct UPI QR payment (Google Pay, PhonePe, Paytm), or credit/debit card checkout via Stripe.",
    },
    {
      q: "What are your delivery timings in Delhi? Is late-night delivery available?",
      a: "Yes, our Delhi cloud kitchens operate from 11:00 AM in the morning until 03:00 AM at night. Whether you need a quick office lunch in CP or midnight momos & rolls in South Delhi, we have you covered.",
    },
    {
      q: "How is the food packaged to stay hot during Delhi traffic?",
      a: "All orders are sealed inside multi-layer food-grade thermal insulated packaging with tamper-evident safety seals. Hot dishes like Butter Paneer and Rolls stay above 65°C, while cold desserts and shakes remain perfectly chilled.",
    },
    {
      q: "What is the minimum order value for free delivery in Delhi?",
      a: "Orders above ₹499 qualify for 100% Free Express Delivery anywhere within our Delhi NCR service zones. For orders below ₹499, a nominal ₹50 delivery charge applies.",
    },
  ];

  const testimonials = [
    {
      name: "Aakash Verma",
      locality: "Hauz Khas, South Delhi",
      rating: 5,
      review:
        "The Dilli-6 Paneer Tikka Roll and Shahi Butter Paneer are absolutely unmatched! Delivered in 28 minutes at 1 AM during our exam prep. 10/10 recommend Eat & Chill to everyone in Delhi.",
    },
    {
      name: "Pooja Malhotra",
      locality: "Connaught Place, Central Delhi",
      rating: 5,
      review:
        "We order lunch for our CP corporate team every Friday. The packaging is spill-proof, portions are hearty, and the Greek salad + Creamy Alfredo pasta combination is delicious!",
    },
    {
      name: "Rohan Khanna",
      locality: "Dwarka Sector 12",
      rating: 5,
      review:
        "Fastest delivery app in West Delhi! Everything arrives sizzling hot, and the live GPS tracking shows exactly where the rider is. Pure Veg dishes are handled in a dedicated prep station.",
    },
  ];

  return (
    <section className="py-20 bg-white" id="delhi-specials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Bento Grid: Why Foodies Love Us */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-brand-600 bg-orange-50 px-4 py-1.5 rounded-full border border-orange-200 shadow-2xs">
              The Delhi Experience
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight">
              Why Dilliwala Foodies Love Eat &amp; Chill
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Four golden standards that make us Delhi NCR&apos;s highest-rated late-night kitchen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 rounded-3xl bg-gradient-to-b from-orange-50/70 to-white border border-orange-100 shadow-card hover:shadow-card-hover transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center shadow-md shadow-brand-500/30 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-gray-950">30-Min Fast Track</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Strategically positioned cloud hubs across Connaught Place, Saket &amp; Dwarka guarantee lightning turnaround even in peak Delhi traffic.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-gradient-to-b from-emerald-50/70 to-white border border-emerald-100 shadow-card hover:shadow-card-hover transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-gray-950">100% Hygienic Seal</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Microwave-safe, tamper-evident containers that maintain 65°C+ heat until you unbox your feast at home.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-gradient-to-b from-indigo-50/70 to-white border border-indigo-100 shadow-card hover:shadow-card-hover transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30 group-hover:scale-110 transition-transform">
                <Moon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-gray-950">Open Till 3:00 AM</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Late night cravings sorted! From midnight paneer rolls to piping hot Italian pastas, our ovens stay lit late.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-gradient-to-b from-amber-50/70 to-white border border-amber-100 shadow-card hover:shadow-card-hover transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/30 group-hover:scale-110 transition-transform">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-gray-950">UPI, COD &amp; Cards</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Pay your way! We accept Cash on Delivery, instant Google Pay / PhonePe UPI, and secure Stripe credit/debit cards.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-slate-50/70 rounded-3xl p-8 sm:p-12 border border-slate-100">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-brand-600">
              Community Love
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-gray-950">
              What Delhi Foodies Are Saying
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-card flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 italic leading-relaxed">
                    &ldquo;{t.review}&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-500 to-orange-400 text-white font-black text-xs flex items-center justify-center shadow-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-gray-950">{t.name}</h4>
                    <p className="text-[11px] text-gray-400 font-semibold">{t.locality}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive FAQ Accordion with Animation */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-1 mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-brand-600">
              Everything You Need To Know
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-gray-950">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-200 overflow-hidden transition-all bg-white"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm text-gray-900 hover:text-brand-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-brand-500" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                          {faq.a}
                        </div>
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
