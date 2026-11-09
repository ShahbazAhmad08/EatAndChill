import React from "react";
import MarketAreaDirectory from "@/components/MarketAreaDirectory";

export const metadata = {
  title: "Food Delivery Market Areas across Delhi NCR | 22+ Kitchen Hubs - Eat & Chill",
  description:
    "Explore 22+ programmatic market areas and express cloud kitchen delivery hubs across Delhi NCR, South Delhi, Central Delhi, West Delhi, Noida, and Gurugram. Fast 30-min food delivery, free on orders above ₹499.",
  alternates: {
    canonical: "/market-area",
  },
  openGraph: {
    title: "Food Delivery Market Areas across Delhi NCR | Eat & Chill",
    description:
      "Order hot & fresh food across 22+ market areas in Delhi NCR with 25-30 minute express delivery from local cloud kitchen hubs.",
    url: "/market-area",
  },
};

export default function MarketAreaPage() {
  return <MarketAreaDirectory />;
}

