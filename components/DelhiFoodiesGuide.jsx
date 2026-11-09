"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  Moon,
  CreditCard,
  MapPin,
  ChevronDown,
  Star,
  Quote,
} from "lucide-react";

export default function DelhiFoodiesGuide() {
  const [openFaq, setOpenFaq] = useState(null);

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
      name: "Rohan Kapoor",
      locality: "Dwarka Sector 12",
      rating: 5,
      review:
        "Best online food delivery in Delhi NCR without bloated fees. Love that I can pay via UPI or Cash on Delivery smoothly without app crashes.",
    },
  ];

  // Schema Markup for FAQ and Restaurant
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Eat & Chill - Delhi",
    image: "https://eatandchill.com/assets/header_img.png",
    priceRange: "₹₹",
    servesCuisine: ["North Indian", "Fast Food", "Rolls", "Desserts", "Italian", "Chinese"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Connaught Place & South Delhi Delivery Hub",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110001",
      addressCountry: "IN",
    },
    telephone: "+91-7755013772",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "11:00",
        closes: "03:00",
      },
    ],
  };

  return (
    <section className="py-16 bg-white" id="delhi-specials">
      {/* Inject Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Why Delhi Foodies Choose Eat & Chill */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold tracking-widest text-brand-600 uppercase bg-orange-50 px-3 py-1 rounded-full">
            The Delhi Food Standard
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Why Delhiites Trust Eat &amp; Chill Every Day
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            From the bustling bylanes of Old Delhi to South Delhi cafes, we unite iconic culinary traditions with cutting-edge cloud kitchen precision and swift doorstep delivery.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-orange-50/50 border border-orange-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-brand-500 text-white flex items-center justify-center mb-4 shadow-sm">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1">
              30-Min Fast Delivery
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Strategically placed cloud kitchen hubs across Central &amp; South Delhi ensure your meal arrives piping hot in record time.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-orange-50/50 border border-orange-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-4 shadow-sm">
              <Moon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1">
              Late Night Till 3 AM
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Midnight food cravings in Delhi? We deliver spicy rolls, steaming pastas, and cold desserts until 3:00 AM every night.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-orange-50/50 border border-orange-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center mb-4 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1">
              Hygienic Safety Packing
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              100% contactless thermal packaging with tamper-proof security seals that lock in freshness and authentic aroma.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-orange-50/50 border border-orange-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-indigo-500 text-white flex items-center justify-center mb-4 shadow-sm">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1">
              UPI, Card &amp; COD
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Admin-managed payment methods allowing you to pay your way — Cash on Delivery, instant UPI QR, or debit/credit cards.
            </p>
          </div>
        </div>

        {/* Delhi Customer Reviews */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black text-gray-900">
              Loved by Foodies Across Delhi NCR
            </h3>
            <p className="text-xs text-gray-500 mt-1">Real feedback from verified Delhi customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed mb-4">
                    &ldquo;{t.review}&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-900">{t.name}</span>
                  <span className="text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-brand-500" />
                    {t.locality}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delhi Delivery FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black text-gray-900">
              Frequently Asked Questions (Delhi Delivery)
            </h3>
            <p className="text-xs text-gray-500 mt-1">Everything you need to know about placing orders in Delhi</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-gray-200 overflow-hidden bg-gray-50/50 transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left font-bold text-sm sm:text-base text-gray-800 flex items-center justify-between gap-4 hover:text-brand-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-brand-600" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

