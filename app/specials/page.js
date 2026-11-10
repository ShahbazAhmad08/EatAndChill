import React from "react";
import SpecialsView from "@/components/SpecialsView";

export const metadata = {
  title: "Specials Menu | Authentic Local Delicacies - Eat & Chill",
  description:
    "Explore iconic chef specials and handcrafted heritage dishes tailored to your locality. Rich slow-cooked curries, tandoori platters, crispy rolls, and signature desserts delivered hot in 30 mins.",
  alternates: {
    canonical: "/specials",
  },
};

export default function SpecialsPage() {
  return <SpecialsView />;
}

