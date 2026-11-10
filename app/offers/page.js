import React from "react";
import connectDB from "@/lib/db";
import Offer from "@/lib/models/Offer";
import { initialOffers } from "@/lib/seedOffers";
import OffersView from "@/components/OffersView";

export const metadata = {
  title: "Food Combos, Deals & Discount Offers | Eat & Chill Delhi NCR",
  description:
    "Explore exclusive Delhi food combos, late-night snacks, student meal boxes, and corporate lunch trays. Save up to 40% with fast 30-min delivery.",
  alternates: {
    canonical: "/offers",
  },
};

export default async function OffersPage() {
  let offers = [];
  try {
    await connectDB();
    const count = await Offer.countDocuments();
    if (count === 0) {
      await Offer.insertMany(initialOffers);
    }
    const rawOffers = await Offer.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean();
    offers = rawOffers.map((o) => ({ ...o, _id: o._id.toString() }));
  } catch (err) {
    console.error("Offers fetch error:", err);
    offers = initialOffers;
  }

  return <OffersView initialOffers={offers} />;
}

