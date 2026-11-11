import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Offer from "@/lib/models/Offer";
import Food from "@/lib/models/Food";
import Category from "@/lib/models/Category";
import { initialOffers } from "@/lib/seedOffers";

// GET /api/offers?location=connaught-place
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location");

    // Auto seed if empty
    const count = await Offer.countDocuments();
    if (count === 0) {
      await Offer.insertMany(initialOffers);
    }

    let query = { isActive: true };
    if (location && location !== "all" && location !== "") {
      query.$or = [{ locationSlug: "all" }, { locationSlug: location }];
    }

    const offers = await Offer.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      data: offers,
    });
  } catch (err) {
    console.error("GET /api/offers error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

// POST /api/offers (Create new offer)
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.title || !body.offerPrice) {
      return NextResponse.json(
        { success: false, message: "Title and offer price are required." },
        { status: 400 }
      );
    }

    const original = Number(body.originalPrice) || Number(body.offerPrice);
    const offer = Number(body.offerPrice);
    const discount = original > offer ? Math.round(((original - offer) / original) * 100) : 0;

    const newOffer = await Offer.create({
      title: body.title,
      description: body.description || "",
      tag: body.tag || "Special Deal",
      originalPrice: original,
      offerPrice: offer,
      discountPercent: discount,
      image: body.image || "/assets/food_1.png",
      locationSlug: body.locationSlug || "all",
      locationName: body.locationName || "All Locations",
      couponCode: body.couponCode || "",
      items: Array.isArray(body.items) ? body.items : (body.items ? body.items.split(",").map(i => i.trim()) : []),
      badge: body.badge || "⚡ 30-Min Fast Delivery",
      isPureVeg: Boolean(body.isPureVeg),
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
    });

    // If enabled, also add/update as orderable food item under "Combos"
    if (body.addToMenu !== false) {
      try {
        const dishDesc = body.description || (Array.isArray(body.items) && body.items.length > 0 ? `Includes: ${body.items.join(", ")}` : "Special Chef Combo");
        await Food.create({
          name: body.title,
          description: dishDesc,
          price: offer,
          image: body.image || "1748855584283-food_1.png",
          category: "Combos",
          isVeg: Boolean(body.isPureVeg),
          isDelhiSpecial: false,
          available: true,
        });

        // Ensure "Combos" category exists
        const catExists = await Category.findOne({ name: "Combos" });
        if (!catExists) {
          await Category.create({ name: "Combos", icon: "🍱" });
        }
      } catch (foodErr) {
        console.warn("Could not auto-add combo to food menu:", foodErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Offer combo created successfully",
      data: newOffer,
    });
  } catch (err) {
    console.error("POST /api/offers error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

// DELETE /api/offers?id=...
export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Offer ID required" },
        { status: 400 }
      );
    }

    await Offer.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Offer deleted successfully",
    });
  } catch (err) {
    console.error("DELETE /api/offers error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

