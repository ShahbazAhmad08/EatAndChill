import React from "react";
import { notFound } from "next/navigation";
import {
  MARKET_LOCATIONS,
  getMarketLocationBySlug,
  getNearbyMarketLocations,
} from "@/lib/marketLocations";
import connectDB from "@/lib/db";
import Offer from "@/lib/models/Offer";
import { initialOffers } from "@/lib/seedOffers";
import LocalizedHomePage from "@/components/LocalizedHomePage";

// Programmatic SEO: Generate static params for all 22 locations at root /[location]
export async function generateStaticParams() {
  return MARKET_LOCATIONS.map((loc) => ({
    location: loc.slug,
  }));
}

// Dynamic SEO Metadata for /{location}
export async function generateMetadata({ params }) {
  const loc = getMarketLocationBySlug(params.location);
  if (!loc) {
    return {
      title: "Delivery Area Not Found | Eat & Chill",
      description: "Delhi NCR fast food delivery.",
    };
  }

  const dishesText = loc.popularDishes.slice(0, 3).join(", ");
  const pincodesText = loc.pincodes.join(", ");

  return {
    title: `Best Food Delivery in ${loc.name} | Express 30 Mins - Eat & Chill`,
    description: `Order hot & fresh food online in ${loc.name}. Authentic ${dishesText} delivered in ${loc.avgDeliveryMinutes} mins to ${pincodesText} from our ${loc.hub}. Free delivery above ₹499!`,
    keywords: [
      `food delivery in ${loc.name}`,
      `best food in ${loc.name}`,
      `order food online ${loc.name}`,
      `restaurants in ${loc.name}`,
      `cloud kitchen in ${loc.name}`,
      `late night food delivery ${loc.name}`,
      ...loc.pincodes.map((pin) => `food delivery ${pin}`),
      ...(loc.landmarks || []).map((lm) => `food delivery near ${lm}`),
    ],
    alternates: {
      canonical: `/${loc.slug}`,
    },
    openGraph: {
      title: `Best Food Delivery in ${loc.name} | 30 Mins Express - Eat & Chill`,
      description: loc.description,
      url: `/${loc.slug}`,
      siteName: "Eat & Chill Delhi NCR",
      locale: "en_IN",
      type: "website",
    },
  };
}

export default async function LocationHomePage({ params }) {
  const loc = getMarketLocationBySlug(params.location);
  if (!loc) {
    notFound();
  }

  // Fetch location-specific combos & offers
  let offers = [];
  try {
    await connectDB();
    const count = await Offer.countDocuments();
    if (count === 0) {
      await Offer.insertMany(initialOffers);
    }

    const rawOffers = await Offer.find({
      isActive: true,
      $or: [{ locationSlug: "all" }, { locationSlug: loc.slug }],
    })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();

    offers = rawOffers.map((o) => ({ ...o, _id: o._id.toString() }));
  } catch (err) {
    console.error("Location offers query error:", err);
    offers = initialOffers.filter(
      (o) => o.locationSlug === "all" || o.locationSlug === loc.slug
    );
  }

  const nearbyLocations = getNearbyMarketLocations(loc.slug, 6);

  // Structured Data Schemas
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: `Eat & Chill - ${loc.name} Hub`,
      description: loc.description,
      url: `https://eatandchill.onrender.com/${loc.slug}`,
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
          name: loc.name,
          item: `https://eatandchill.onrender.com/${loc.slug}`,
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
      <LocalizedHomePage
        location={loc}
        nearbyLocations={nearbyLocations}
        offers={offers}
      />
    </>
  );
}

