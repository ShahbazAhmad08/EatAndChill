import DelhiBanner from "@/components/DelhiBanner";
import ExploreMenu from "@/components/ExploreMenu";
import FoodDisplay from "@/components/FoodDisplay";
import RestaurantGallery from "@/components/RestaurantGallery";
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
            "real brothers restaurant",
            "food delivery sector 73 noida",
            "online food order sarfabad",
            "ghar jaisa swad",
            "best rolls in noida",
          ];

      return {
        title:
          settings.metaTitle ||
          "REAL BROTHER'S RESTAURANT | Ghar Jaisa Swad - Sector 73, Sarfabad, Noida",
        description:
          settings.metaDescription ||
          "Craving delicious food? Order online from Real Brother's Restaurant in Sarfabad, Sector 73 Noida! Handcrafted Kathi Rolls, Momos, Shahi Paneer, Dal Makhani, Biryani & Thalis. Fast 25-30 min delivery.",
        keywords,
        verification: settings.googleSiteVerification
          ? { google: settings.googleSiteVerification }
          : undefined,
        openGraph: {
          title: settings.metaTitle || "REAL BROTHER'S RESTAURANT | Ghar Jaisa Swad",
          description:
            settings.metaDescription ||
            "Order delicious food online with fast 30-minute delivery in Sarfabad & Sector 73 Noida.",
          images: ["/images/logo-square.jpg"],
        },
      };
    }
  } catch (err) {
    console.error("Failed to fetch settings for metadata:", err);
  }

  return {
    title: "REAL BROTHER'S RESTAURANT | Ghar Jaisa Swad - Sector 73, Sarfabad, Noida",
    description: "Order fresh home-style food online with fast 30-minute delivery in Sarfabad & Sector 73 Noida.",
  };
}

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <DelhiBanner />

      {/* Menu Categories */}
      <ExploreMenu />

      {/* Food Display Grid: 3 Trending Cards on Home */}
      <FoodDisplay isHome={true} limit={3} />

      {/* Restaurant Story & Ambience Gallery */}
      <RestaurantGallery />

      {/* Standards, Google Reviews & FAQs */}
      <DelhiFoodiesGuide />
    </div>
  );
}
