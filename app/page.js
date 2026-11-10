import DelhiBanner from "@/components/DelhiBanner";
import ExploreMenu from "@/components/ExploreMenu";
import FoodDisplay from "@/components/FoodDisplay";
import DelhiFoodiesGuide from "@/components/DelhiFoodiesGuide";
import connectDB from "@/lib/db";
import Settings from "@/lib/models/Settings";

export const revalidate = 60; // ISR revalidate every 60 seconds

export async function generateMetadata() {
  try {
    await connectDB();
    const settings = await Settings.findOne({}).lean();
    if (settings) {
      const keywords = settings.metaKeywords
        ? settings.metaKeywords.split(",").map((k) => k.trim())
        : [
            "food delivery online",
            "online food order",
            "express food delivery",
            "late night food delivery",
          ];

      return {
        title:
          settings.metaTitle ||
          "Eat & Chill | Express Online Food Delivery - Hot & Fresh in 30 Mins",
        description:
          settings.metaDescription ||
          "Craving delicious food? Order online from Eat & Chill! Handcrafted Kathi Rolls, Momos, Shahi Paneer, Biryani, Pastas, Burgers & Shakes. Fast 30-minute delivery.",
        keywords,
        verification: settings.googleSiteVerification
          ? { google: settings.googleSiteVerification }
          : undefined,
        openGraph: {
          title: settings.metaTitle || "Eat & Chill | Express Online Food Delivery",
          description: settings.metaDescription || "Order delicious food online with fast 30-minute delivery.",
        },
      };
    }
  } catch (err) {
    console.error("Failed to fetch settings for metadata:", err);
  }

  return {
    title: "Eat & Chill | Express Online Food Delivery - Hot & Fresh in 30 Mins",
    description: "Order fresh food online with fast 30-minute delivery to your doorstep.",
  };
}

export default function HomePage() {
  return (
    <div>
      {/* Delhi Hero Section */}
      <DelhiBanner />

      {/* Menu Categories */}
      <ExploreMenu />

      {/* Food Display Grid: 3 Trending Cards on Home */}
      <FoodDisplay isHome={true} limit={3} />

      {/* Delhi SEO Foodies Guide, Testimonials & FAQs */}
      <DelhiFoodiesGuide />
    </div>
  );
}
