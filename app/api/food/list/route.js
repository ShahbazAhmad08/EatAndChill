import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Food from "@/lib/models/Food";
import { initialFoodItems } from "@/lib/seedData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const conn = await connectDB();
    if (!conn) {
      // Graceful fallback to initial food items if DB isn't reached
      return NextResponse.json({
        success: true,
        data: initialFoodItems.map((item, idx) => ({ ...item, _id: `fallback_${idx + 1}` })),
        fallback: true,
      });
    }

    let foods = await Food.find({}).sort({ createdAt: -1 });

    // Auto seed if database is empty
    if (!foods || foods.length === 0) {
      await Food.insertMany(initialFoodItems);
      foods = await Food.find({}).sort({ createdAt: -1 });
    }

    return NextResponse.json({
      success: true,
      data: foods,
    });
  } catch (error) {
    console.error("Error in /api/food/list:", error);
    return NextResponse.json(
      {
        success: true,
        data: initialFoodItems.map((item, idx) => ({ ...item, _id: `fallback_${idx + 1}` })),
        message: "Loaded from cache/seed",
      },
      { status: 200 }
    );
  }
}

