import connectDB from "@/lib/db";
import Food from "@/lib/models/Food";
import Location from "@/lib/models/Location";
import { MARKET_LOCATIONS } from "@/lib/marketLocations";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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
      url: `${baseUrl}/specials`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/offers`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/market-area`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
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
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
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

  // Locations dynamic routes
  let locationList = MARKET_LOCATIONS;
  try {
    await connectDB();
    const dbLocs = await Location.find({ isActive: true }).lean();
    if (dbLocs && dbLocs.length > 0) {
      locationList = dbLocs;
    }
  } catch (err) {
    // fallback
  }

  const rootLocationRoutes = locationList.map((loc) => ({
    url: `${baseUrl}/${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.95,
  }));

  const marketAreaRoutes = locationList.map((loc) => ({
    url: `${baseUrl}/market-area/${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
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
    ...rootLocationRoutes,
    ...marketAreaRoutes,
    ...dishRoutes,
  ];
}
