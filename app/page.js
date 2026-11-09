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
            "food delivery delhi",
            "online food order delhi",
            "best rolls in delhi",
            "late night food delivery delhi",
          ];

      return {
        title:
          settings.metaTitle ||
          "Eat & Chill | Best Online Food Delivery in Delhi NCR - 30-Min Fast Delivery",
        description:
          settings.metaDescription ||
          "Craving delicious food in Delhi? Order online from Eat & Chill! Authentic Butter Chicken, Kathi Rolls, Momos, Shahi Paneer, Pastas, Sandwiches & Shakes.",
        keywords,
        verification: settings.googleSiteVerification
          ? { google: settings.googleSiteVerification }
          : undefined,
        openGraph: {
          title: settings.metaTitle,
          description: settings.metaDescription,
        },
      };
    }
  } catch (err) {
    console.error("Failed to fetch settings for metadata:", err);
  }

  return {
    title: "Eat & Chill | Best Online Food Delivery in Delhi NCR",
    description: "Order fresh food online across Delhi NCR.",
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
