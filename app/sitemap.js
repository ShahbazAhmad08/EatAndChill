import connectDB from "@/lib/db";
import Food from "@/lib/models/Food";
import { MARKET_LOCATIONS } from "@/lib/marketLocations";
import { DELHI_LOCALITIES } from "@/lib/delhiLocalities";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://eatandchill.onrender.com";

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/delhi-specials`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/market-area`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/delhi-delivery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/myorders`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.6,
    },
  ];

  // Programmatic SEO Market Area Dynamic Routes (22+ locations)
  const marketAreaRoutes = MARKET_LOCATIONS.map((loc) => ({
    url: `${baseUrl}/market-area/${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Legacy Delhi Delivery Localities dynamic routes for backward compatibility
  const legacyLocalityRoutes = DELHI_LOCALITIES.map((loc) => ({
    url: `${baseUrl}/delhi-delivery/${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dishes dynamic routes from DB
  let dishRoutes = [];
  try {
    await connectDB();
    const foods = await Food.find({}, "_id updatedAt").lean();
    if (foods && foods.length > 0) {
      dishRoutes = foods.map((food) => ({
        url: `${baseUrl}/dish/${food._id.toString()}`,
        lastModified: food.updatedAt || new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      }));
    }
  } catch (e) {
    console.error("Sitemap food generation error:", e);
  }

  return [
    ...staticRoutes,
    ...marketAreaRoutes,
    ...legacyLocalityRoutes,
    ...dishRoutes,
  ];
}
