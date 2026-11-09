import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Food from "@/lib/models/Food";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const foodId = body.id || body._id;

    if (!foodId) {
      return NextResponse.json(
        { success: false, message: "Food ID is required" },
        { status: 400 }
      );
    }

    await Food.findByIdAndDelete(foodId);

    return NextResponse.json({
      success: true,
      message: "Food item removed successfully",
    });
  } catch (error) {
    console.error("Error in /api/food/remove:", error);
    return NextResponse.json(
      { success: false, message: "Error removing food item" },
      { status: 500 }
    );
  }
}

