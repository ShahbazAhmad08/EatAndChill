import React from "react";
import { notFound } from "next/navigation";
import {
  MARKET_LOCATIONS,
  getMarketLocationBySlug,
  getNearbyMarketLocations,
} from "@/lib/marketLocations";
import connectDB from "@/lib/db";
import Food from "@/lib/models/Food";
import { initialFoodItems } from "@/lib/seedData";
import LocalizedMarketAreaView from "@/components/LocalizedMarketAreaView";

// Generate static params for all 22 Market Areas (Programmatic SEO)
export async function generateStaticParams() {
  return MARKET_LOCATIONS.map((loc) => ({
    locality: loc.slug,
  }));
}

// Generate dynamic SEO metadata matching the Programmatic SEO Blueprint
export async function generateMetadata({ params }) {
  const loc = getMarketLocationBySlug(params.locality);
  if (!loc) {
    return {
      title: "Market Area Not Found | Eat & Chill",
      description: "Delhi NCR fast food delivery.",
    };
  }

  const topDishesText = loc.popularDishes.slice(0, 3).join(", ");
  const pincodesText = loc.pincodes.join(", ");

  return {
    title: `Best Food Delivery in ${loc.name} | Express 30 Mins - Eat & Chill`,
    description: `Craving hot food delivery in ${loc.name}? Order best-selling ${topDishesText} from Eat & Chill. Delivered in ${loc.avgDeliveryMinutes} mins to ${pincodesText} from our ${loc.hub}. Free delivery above ₹499!`,
    keywords: [
      `food delivery in ${loc.name}`,
      `best food in ${loc.name}`,
      `order food online ${loc.name}`,
      `cloud kitchen in ${loc.name}`,
      `late night food delivery ${loc.name}`,
      `restaurants in ${loc.name}`,
      ...loc.pincodes.map((pin) => `food delivery ${pin}`),
      ...(loc.landmarks || []).map((lm) => `food delivery near ${lm}`),
    ],
    alternates: {
      canonical: `/market-area/${loc.slug}`,
    },
    openGraph: {
      title: `Best Food Delivery in ${loc.name} | 30 Mins Express - Eat & Chill`,
      description: loc.description,
      url: `/market-area/${loc.slug}`,
      siteName: "Eat & Chill Delhi NCR",
      locale: "en_IN",
      type: "website",
    },
  };
}

export default async function LocalizedMarketAreaPage({ params }) {
  const loc = getMarketLocationBySlug(params.locality);
  if (!loc) {
    notFound();
  }

  // Fetch foods with fallback to initialFoodItems
  let foods = [];
  try {
    await connectDB();
    const rawFoods = await Food.find({ available: { $ne: false } })
      .limit(9)
      .lean();
    if (rawFoods && rawFoods.length > 0) {
      foods = rawFoods.map((f) => ({ ...f, _id: f._id.toString() }));
    }
  } catch (err) {
    console.error("Database query fallback to seed items:", err);
  }

  if (foods.length === 0) {
    foods = initialFoodItems.slice(0, 9).map((f, idx) => ({
      ...f,
      _id: `fallback_${idx}`,
      image: `/assets/food_${(idx % 32) + 1}.png`,
    }));
  }

  const nearbyLocations = getNearbyMarketLocations(loc.slug, 6);

  // Compile JSON-LD Structured Schemas
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: `Eat & Chill - ${loc.name} Kitchen Hub`,
      description: loc.description,
      url: `https://eatandchill.onrender.com/market-area/${loc.slug}`,
      telephone: "+917755013772",
      servesCuisine: ["North Indian", "Mughlai", "Street Food", "Rolls", "Fast Food"],
      priceRange: "₹₹",
      address: {
        "@type": "PostalAddress",
        addressLocality: loc.name,
        addressRegion: loc.state || "Delhi",
        postalCode: loc.pincodes[0],
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: loc.geo.lat,
        longitude: loc.geo.lng,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "11:00",
          closes: "03:00",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://eatandchill.onrender.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Market Areas",
          item: "https://eatandchill.onrender.com/market-area",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: loc.name,
          item: `https://eatandchill.onrender.com/market-area/${loc.slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: loc.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
  ];

  return (
    <>
      {schemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <LocalizedMarketAreaView
        location={loc}
        nearbyLocations={nearbyLocations}
        dishes={foods}
      />
    </>
  );
}

