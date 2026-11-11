import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Location from "@/lib/models/Location";
import { DEFAULT_SARFABAD_LOCATION } from "@/lib/marketLocations";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const includeAll = searchParams.get("all") === "true";

    const query = includeAll ? {} : { isActive: true };
    let locations = await Location.find(query).sort({ orderIndex: 1, createdAt: 1 }).lean();

    // Auto-seed if database has no locations yet
    if (!locations || locations.length === 0) {
      try {
        const seeded = await Location.create({
          ...DEFAULT_SARFABAD_LOCATION,
          isActive: true,
          isDefault: true,
          orderIndex: 0,
        });
        locations = [seeded.toObject()];
      } catch (seedErr) {
        // If already exists or error, fallback to static
        locations = [DEFAULT_SARFABAD_LOCATION];
      }
    }

    return NextResponse.json({
      success: true,
      data: locations,
    });
  } catch (err) {
    console.error("GET /api/locations error:", err);
    // Return default static location as fallback
    return NextResponse.json({
      success: true,
      data: [DEFAULT_SARFABAD_LOCATION],
    });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      name,
      shortName,
      slug,
      city,
      zone,
      state,
      pincodes,
      avgDeliveryMinutes,
      hub,
      tagline,
      description,
      address,
      phone,
      googleBusinessUrl,
      popularDishes,
      highlights,
      landmarks,
      faqs,
      isActive,
    } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { success: false, message: "Location name and slug are required" },
        { status: 400 }
      );
    }

    const cleanSlug = slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-");

    // Check duplicate slug
    const existing = await Location.findOne({ slug: cleanSlug });
    if (existing) {
      return NextResponse.json(
        { success: false, message: `A location with slug '${cleanSlug}' already exists.` },
        { status: 400 }
      );
    }

    const newLocation = await Location.create({
      name,
      shortName: shortName || name,
      slug: cleanSlug,
      city: city || "Noida",
      zone: zone || "Uttar Pradesh",
      state: state || "Uttar Pradesh",
      pincodes: Array.isArray(pincodes)
        ? pincodes
        : typeof pincodes === "string"
        ? pincodes.split(",").map((p) => p.trim()).filter(Boolean)
        : ["201301"],
      avgDeliveryMinutes: avgDeliveryMinutes || "25-30",
      hub: hub || `${name} Delivery Hub`,
      tagline: tagline || "Ghar Jaisa Swad - Fast 30-Min Delivery",
      description: description || `Delicious food delivery in ${name} by Real Brother's Restaurant.`,
      address: address || "",
      phone: phone || "+91 78271 18412",
      googleBusinessUrl: googleBusinessUrl || "https://share.google/UPOhBCowyPZ07exvK",
      popularDishes: Array.isArray(popularDishes)
        ? popularDishes
        : typeof popularDishes === "string"
        ? popularDishes.split(",").map((d) => d.trim()).filter(Boolean)
        : ["Shahi Paneer", "Kathi Roll", "Momos"],
      highlights: Array.isArray(highlights)
        ? highlights
        : typeof highlights === "string"
        ? highlights.split(",").map((h) => h.trim()).filter(Boolean)
        : ["30-Min Delivery", "Hygienic Kitchen", "Ghar Jaisa Swad"],
      landmarks: Array.isArray(landmarks)
        ? landmarks
        : typeof landmarks === "string"
        ? landmarks.split(",").map((l) => l.trim()).filter(Boolean)
        : [],
      faqs: Array.isArray(faqs) ? faqs : [],
      isActive: isActive !== undefined ? isActive : true,
    });

    return NextResponse.json({
      success: true,
      message: "Location added successfully",
      data: newLocation,
    });
  } catch (err) {
    console.error("POST /api/locations error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create location" },
      { status: 500 }
    );
  }
}
