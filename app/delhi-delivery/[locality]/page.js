import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DELHI_LOCALITIES, getLocalityBySlug } from "@/lib/delhiLocalities";
import connectDB from "@/lib/db";
import Food from "@/lib/models/Food";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DishAddToCart from "@/components/DishAddToCart";
import {
  MapPin,
  Clock,
  ShieldCheck,
  Flame,
  Star,
  ChevronRight,
  CheckCircle,
  HelpCircle,
  Truck,
  PhoneCall,
  Sparkles,
} from "lucide-react";

export async function generateStaticParams() {
  return DELHI_LOCALITIES.map((loc) => ({
    locality: loc.slug,
  }));
}

export async function generateMetadata({ params }) {
  const loc = getLocalityBySlug(params.locality);
  if (!loc) {
    return {
      title: "Locality Not Found | Eat & Chill Delhi",
      description: "Delhi NCR fast food delivery.",
    };
  }

  return {
    title: `Online Food Delivery in ${loc.name} | Express 30 Mins - Eat & Chill`,
    description: `Order online in ${loc.name}, Delhi. Fresh Butter Chicken, Paneer Tikka, Biryani, Burgers & Rolls delivered piping hot in ${loc.avgDeliveryMinutes} mins from ${loc.hub}. COD & UPI accepted!`,
    keywords: [
      `food delivery ${loc.name}`,
      `order food online in ${loc.name}`,
      `best restaurants in ${loc.name} delhi`,
      `late night food delivery ${loc.name}`,
      `eat and chill ${loc.name}`,
      ...loc.pincodes.map((pin) => `food delivery ${pin}`),
    ],
    openGraph: {
      title: `Express Food Delivery in ${loc.name} | Eat & Chill Delhi`,
      description: loc.description,
      url: `https://eatandchill.delhi/delhi-delivery/${loc.slug}`,
      siteName: "Eat & Chill Delhi",
      locale: "en_IN",
      type: "website",
    },
    alternates: {
      canonical: `https://eatandchill.delhi/delhi-delivery/${loc.slug}`,
    },
  };
}

export default async function LocalityDeliveryPage({ params }) {
  const loc = getLocalityBySlug(params.locality);
  if (!loc) {
    notFound();
  }

  await connectDB();
  let foods = [];
  try {
    const rawFoods = await Food.find({ available: { $ne: false } })
      .limit(8)
      .lean();
    foods = rawFoods.map((f) => ({ ...f, _id: f._id.toString() }));
  } catch (e) {
    console.error("Failed to load foods for locality:", e);
  }

  // Schema for LocalBusiness / FoodEstablishment
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: `Eat & Chill - ${loc.name} Delivery Hub`,
    image: "https://eatandchill.delhi/assets/banner_bg.png",
    priceRange: "₹₹",
    servesCuisine: ["North Indian", "Mughlai", "Street Food", "Chinese", "Continental"],
    address: {
      "@type": "PostalAddress",
      addressLocality: loc.name,
      addressRegion: "Delhi",
      postalCode: loc.pincodes[0],
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "28.6139",
      longitude: "77.2090",
    },
    areaServed: {
      "@type": "City",
      name: `Delhi - ${loc.name}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "250",
    },
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: loc.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="flex-1">
        {/* Localized Hero Banner */}
        <div className="relative bg-gradient-to-br from-brand-600 via-orange-600 to-amber-700 text-white py-12 sm:py-16 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-200 mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                Delhi Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span>Delhi Delivery Areas</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white font-bold">{loc.name}</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider mb-4">
              <MapPin className="w-3.5 h-3.5 text-white" />
              <span>{loc.zone} Delivery Hub</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 max-w-3xl leading-tight">
              Express Food Delivery in {loc.name}
            </h1>

            <p className="text-base sm:text-lg text-orange-100 max-w-2xl leading-relaxed mb-8">
              {loc.description}
            </p>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-2 text-orange-200 text-xs font-bold mb-1">
                  <Clock className="w-4 h-4" />
                  <span>Delivery Time</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">
                  {loc.avgDeliveryMinutes} mins
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-2 text-orange-200 text-xs font-bold mb-1">
                  <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>Zone Rating</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">4.8 / 5.0</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-2 text-orange-200 text-xs font-bold mb-1">
                  <Truck className="w-4 h-4" />
                  <span>Fulfillment Hub</span>
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-white line-clamp-2">
                  {loc.hub}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-2 text-orange-200 text-xs font-bold mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>PIN Codes</span>
                </div>
                <div className="text-sm sm:text-base font-extrabold text-white">
                  {loc.pincodes.join(", ")}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights & USPs */}
        <div className="bg-white border-b border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Why foodies in {loc.name} choose Eat & Chill:
              </span>
              <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-700">
                {loc.highlights.map((h, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-brand-700 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{h}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Popular Dishes in this Locality */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
                Fresh From Delhi Cloud Kitchen
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
                Trending Bites Delivered to {loc.name}
              </h2>
            </div>
            <Link
              href="/"
              className="text-sm font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              <span>Explore Complete Menu (24+ Dishes)</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {foods.map((food) => {
              const imgSrc = food.image?.startsWith("http")
                ? food.image
                : food.image?.startsWith("/")
                ? food.image
                : `/uploads/${food.image}`;

              return (
                <div
                  key={food._id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div className="relative w-full h-44 bg-gray-100 overflow-hidden">
                    <Link href={`/dish/${food._id}`}>
                      <Image
                        src={imgSrc}
                        alt={food.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    </Link>
                    {food.isDelhiSpecial && (
                      <span className="absolute top-2.5 left-2.5 bg-brand-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                        <Flame className="w-3 h-3 fill-white" />
                        Delhi Special
                      </span>
                    )}
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <Link
                          href={`/dish/${food._id}`}
                          className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-1"
                        >
                          {food.name}
                        </Link>
                        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                          ★ {food.rating || "4.8"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                        {food.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-lg font-black text-gray-900">₹{food.price}</span>
                      <Link
                        href={`/dish/${food._id}`}
                        className="px-3 py-1.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-sm transition-colors"
                      >
                        Order Now
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Locality FAQs Section */}
        <div className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
                Got Questions?
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
                Food Delivery in {loc.name} — FAQs
              </h2>
            </div>

            <div className="space-y-4">
              {loc.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-2xl p-5 border border-gray-200"
                >
                  <h3 className="text-base font-bold text-gray-900 flex items-start gap-2.5">
                    <HelpCircle className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 ml-7 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cross-linking to Other Delhi Localities for SEO */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-lg font-black text-gray-900 mb-4">
            We Also Deliver Across Delhi NCR:
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {DELHI_LOCALITIES.filter((l) => l.slug !== loc.slug).map((neighbor) => (
              <Link
                key={neighbor.slug}
                href={`/delhi-delivery/${neighbor.slug}`}
                className="bg-white p-3 rounded-xl border border-gray-200 hover:border-brand-500 hover:text-brand-600 text-xs font-bold text-gray-700 text-center transition-all shadow-2xs hover:shadow"
              >
                {neighbor.name}
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

