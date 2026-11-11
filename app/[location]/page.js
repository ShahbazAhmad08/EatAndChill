import React from "react";
import { notFound } from "next/navigation";
import {
  MARKET_LOCATIONS,
  getMarketLocationBySlug,
  getNearbyMarketLocations,
} from "@/lib/marketLocations";
import connectDB from "@/lib/db";
import Location from "@/lib/models/Location";
import Offer from "@/lib/models/Offer";
import { initialOffers } from "@/lib/seedOffers";
import LocalizedHomePage from "@/components/LocalizedHomePage";

// Helper to resolve location from database or static fallback
async function resolveLocation(slug) {
  if (!slug) return null;
  const cleanSlug = slug.toLowerCase().trim();

  try {
    await connectDB();
    const dbLoc = await Location.findOne({ slug: cleanSlug, isActive: true }).lean();
    if (dbLoc) {
      return {
        ...dbLoc,
        _id: dbLoc._id.toString(),
        pincodes: Array.isArray(dbLoc.pincodes) ? dbLoc.pincodes : [dbLoc.pincodes || "201301"],
        popularDishes: Array.isArray(dbLoc.popularDishes)
          ? dbLoc.popularDishes
          : ["Shahi Paneer", "Kathi Roll", "Momos"],
        geo: dbLoc.geo || { lat: 28.583, lng: 77.388 },
        faqs: dbLoc.faqs || [],
        reviews: dbLoc.reviews || [],
      };
    }
  } catch (err) {
    console.error("resolveLocation DB error:", err);
  }

  return getMarketLocationBySlug(cleanSlug);
}

// Programmatic SEO: Generate static params for active locations
export async function generateStaticParams() {
  try {
    await connectDB();
    const dbLocs = await Location.find({ isActive: true }).select("slug").lean();
    if (dbLocs && dbLocs.length > 0) {
      return dbLocs.map((loc) => ({ location: loc.slug }));
    }
  } catch (err) {
    // fallback
  }

  return MARKET_LOCATIONS.map((loc) => ({
    location: loc.slug,
  }));
}

// Dynamic SEO Metadata for /{location}
export async function generateMetadata({ params }) {
  const loc = await resolveLocation(params.location);
  if (!loc) {
    return {
      title: "Delivery Area Not Found | REAL BROTHER'S RESTAURANT",
      description: "Fast food delivery.",
    };
  }

  const dishesText = (loc.popularDishes || []).slice(0, 3).join(", ");
  const pincodesText = (loc.pincodes || []).join(", ");

  return {
    title: `Best Food Delivery in ${loc.name} | Ghar Jaisa Swad - REAL BROTHER'S RESTAURANT`,
    description: `Order hot & fresh food online in ${loc.name}. Authentic ${dishesText} delivered in ${loc.avgDeliveryMinutes || "25-30"} mins to ${pincodesText} from Real Brother's Restaurant. Free delivery above ₹499!`,
    keywords: [
      `food delivery in ${loc.name}`,
      `best food in ${loc.name}`,
      `order food online ${loc.name}`,
      `real brothers restaurant ${loc.name}`,
      `ghar jaisa swad ${loc.name}`,
      `restaurants in ${loc.name}`,
      `late night food delivery ${loc.name}`,
      ...(loc.pincodes || []).map((pin) => `food delivery ${pin}`),
      ...(loc.landmarks || []).map((lm) => `food delivery near ${lm}`),
    ],
    alternates: {
      canonical: `/${loc.slug}`,
    },
    openGraph: {
      title: `Best Food Delivery in ${loc.name} | Ghar Jaisa Swad - REAL BROTHER'S RESTAURANT`,
      description: loc.description,
      url: `/${loc.slug}`,
      siteName: "REAL BROTHER'S RESTAURANT",
      locale: "en_IN",
      type: "website",
      images: ["/images/logo-square.jpg"],
    },
  };
}

export default async function LocationHomePage({ params }) {
  const loc = await resolveLocation(params.location);
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

  const nearbyLocations = getNearbyMarketLocations(loc.slug, 4);

  // Structured Data Schemas
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: `REAL BROTHER'S RESTAURANT - ${loc.name}`,
      description: loc.description,
      url: `http://localhost:3000/${loc.slug}`,
      telephone: loc.phone || "+91-7827118412",
      servesCuisine: ["North Indian", "Chinese", "Mughlai", "Rolls", "Fast Food"],
      priceRange: "₹₹",
      image: "http://localhost:3000/images/logo-square.jpg",
      address: {
        "@type": "PostalAddress",
        streetAddress: loc.address || "Gali Number 5, Vishal, Sarfabad Village, Sector 73",
        addressLocality: loc.city || "Noida",
        addressRegion: loc.state || "Uttar Pradesh",
        postalCode: loc.pincodes && loc.pincodes[0] ? loc.pincodes[0] : "201301",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: loc.geo?.lat || 28.583,
        longitude: loc.geo?.lng || 77.388,
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
          opens: "08:00",
          closes: "24:00",
        },
      ],
      sameAs: [loc.googleBusinessUrl || "https://share.google/UPOhBCowyPZ07exvK"],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "http://localhost:3000",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: loc.name,
          item: `http://localhost:3000/${loc.slug}`,
        },
      ],
    },
  ];

  if (loc.faqs && loc.faqs.length > 0) {
    schemas.push({
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
    });
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <LocalizedHomePage
        location={loc}
        offers={offers}
        nearbyLocations={nearbyLocations}
      />
    </>
  );
}
