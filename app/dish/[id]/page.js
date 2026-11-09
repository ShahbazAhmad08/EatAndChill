import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import connectDB from "@/lib/db";
import Food from "@/lib/models/Food";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DishAddToCart from "@/components/DishAddToCart";
import {
  Star,
  Flame,
  Clock,
  Users,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  Truck,
  Heart,
  Award,
} from "lucide-react";

export async function generateMetadata({ params }) {
  await connectDB();
  try {
    const food = await Food.findById(params.id).lean();
    if (!food) {
      return {
        title: "Dish Not Found | Eat & Chill Delhi",
        description: "Delicious dishes freshly prepared in Delhi NCR.",
      };
    }

    return {
      title: `${food.name} | Order Online in Delhi NCR - Eat & Chill`,
      description: `${food.description} Handcrafted fresh in Delhi. 30-40 mins express delivery across CP, Saket, Hauz Khas, Dwarka & Delhi NCR.`,
      keywords: [
        food.name,
        `order ${food.name} delhi`,
        `${food.category} delhi`,
        "eat and chill delhi delivery",
        "best food delivery delhi ncr",
      ],
      openGraph: {
        title: `${food.name} - ₹${food.price} | Eat & Chill Delhi`,
        description: food.description,
        images: [
          {
            url: food.image?.startsWith("http")
              ? food.image
              : `https://eatandchill.delhi/uploads/${food.image}`,
            width: 800,
            height: 600,
            alt: food.name,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: "Dish Details | Eat & Chill Delhi",
      description: "Order fresh food in Delhi NCR.",
    };
  }
}

export default async function DishDetailPage({ params }) {
  await connectDB();

  let food = null;
  let relatedFoods = [];

  try {
    food = await Food.findById(params.id).lean();
    if (food) {
      food._id = food._id.toString();
      // Fetch 3 related foods
      const related = await Food.find({
        _id: { $ne: params.id },
        category: food.category,
      })
        .limit(3)
        .lean();
      relatedFoods = related.map((r) => ({ ...r, _id: r._id.toString() }));
    }
  } catch (err) {
    console.error("Error fetching food:", err);
  }

  if (!food) {
    notFound();
  }

  const isAvailable = food.available !== false;
  const imgSrc = food.image?.startsWith("http")
    ? food.image
    : food.image?.startsWith("/")
    ? food.image
    : `/uploads/${food.image}`;

  // Rich JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: food.name,
    image: imgSrc,
    description: food.description,
    brand: {
      "@type": "Brand",
      name: "Eat & Chill Delhi",
    },
    category: food.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: food.price,
      availability: isAvailable
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://eatandchill.delhi/dish/${food._id}`,
      seller: {
        "@type": "Restaurant",
        name: "Eat & Chill Cloud Kitchen Delhi",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: food.rating || 4.8,
      reviewCount: 142,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-6 overflow-x-auto">
            <Link href="/" className="hover:text-brand-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link href="/#explore-menu" className="hover:text-brand-600 transition-colors">
              Menu
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-400">{food.category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-900 font-bold truncate">{food.name}</span>
          </nav>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-brand-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Delhi Delights</span>
          </Link>

          {/* Main Product Card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image Side */}
              <div className="relative min-h-[340px] sm:min-h-[440px] bg-gray-100 overflow-hidden">
                <Image
                  src={imgSrc}
                  alt={food.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {food.isDelhiSpecial && (
                    <span className="bg-brand-600/95 backdrop-blur text-white text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                      <Flame className="w-3.5 h-3.5 fill-white" />
                      Delhi Speciality
                    </span>
                  )}
                  {!isAvailable && (
                    <span className="bg-red-600 text-white text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                      Currently Sold Out
                    </span>
                  )}
                </div>

                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-2.5 py-1 rounded-xl shadow-md flex items-center gap-2">
                  <div
                    className={`w-3.5 h-3.5 border-2 flex items-center justify-center ${
                      food.isVeg ? "border-emerald-600" : "border-red-600"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        food.isVeg ? "bg-emerald-600" : "bg-red-600"
                      }`}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-gray-800">
                    {food.isVeg ? "Pure Veg" : "Non-Veg"}
                  </span>
                </div>
              </div>

              {/* Details Side */}
              <div className="p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-600 bg-orange-50 px-3 py-1 rounded-full">
                      {food.category}
                    </span>
                    <div className="flex items-center gap-1 text-sm font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{food.rating || "4.8"}</span>
                      <span className="text-gray-400 text-xs font-normal">(140+ reviews)</span>
                    </div>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight mb-3">
                    {food.name}
                  </h1>

                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                    {food.description}
                  </p>

                  <div className="text-3xl font-black text-gray-900 mb-6 flex items-baseline gap-2">
                    <span>₹{food.price}</span>
                    <span className="text-xs text-gray-400 font-semibold">Taxes included</span>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-3 gap-3 p-4 bg-orange-50/50 rounded-2xl border border-orange-100 mb-8">
                    <div className="text-center">
                      <Clock className="w-5 h-5 text-brand-600 mx-auto mb-1" />
                      <div className="text-xs font-bold text-gray-900">30-40 Mins</div>
                      <div className="text-[11px] text-gray-500">Fast Delivery</div>
                    </div>
                    <div className="text-center border-x border-orange-100">
                      <Flame className="w-5 h-5 text-brand-600 mx-auto mb-1" />
                      <div className="text-xs font-bold text-gray-900">Authentic</div>
                      <div className="text-[11px] text-gray-500">Delhi Masalas</div>
                    </div>
                    <div className="text-center">
                      <Users className="w-5 h-5 text-brand-600 mx-auto mb-1" />
                      <div className="text-xs font-bold text-gray-900">Serves 1-2</div>
                      <div className="text-[11px] text-gray-500">Generous Portion</div>
                    </div>
                  </div>
                </div>

                {/* Add to Bag CTA */}
                <div>
                  <DishAddToCart
                    foodId={food._id}
                    isAvailable={isAvailable}
                    price={food.price}
                  />

                  <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Truck className="w-4 h-4 text-emerald-600" />
                      Live GPS Tracking
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      100% Hygienic Kitchen
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kitchen Secrets & Delhi Speciality Story */}
            <div className="border-t border-gray-100 p-6 sm:p-10 bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-600" />
                <span>The Eat & Chill Kitchen Craft</span>
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
                Prepared daily at our Delhi hub using farm-fresh vegetables, premium grade aromatic spices, and traditional simmering methods. We never use artificial food dyes or MSG. Packed in microwave-safe, spill-proof tamper-evident food grade containers so that it reaches your dining table piping hot.
              </p>
            </div>
          </div>

          {/* Related Dishes */}
          {relatedFoods.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-6">
                More Delicious {food.category} to Try
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedFoods.map((rel) => {
                  const relImg = rel.image?.startsWith("http")
                    ? rel.image
                    : rel.image?.startsWith("/")
                    ? rel.image
                    : `/uploads/${rel.image}`;

                  return (
                    <Link
                      key={rel._id}
                      href={`/dish/${rel._id}`}
                      className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
                    >
                      <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3 bg-gray-100">
                        <Image
                          src={relImg}
                          alt={rel.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
                          {rel.name}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                          {rel.description}
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
                        <span className="font-black text-gray-900">₹{rel.price}</span>
                        <span className="text-xs font-bold text-brand-600">View Dish →</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

