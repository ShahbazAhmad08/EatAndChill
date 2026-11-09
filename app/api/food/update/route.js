import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Food from "@/lib/models/Food";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { id, name, description, price, category, isVeg, isDelhiSpecial, available } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = Number(price);
    if (category !== undefined) updateData.category = category;
    if (isVeg !== undefined) updateData.isVeg = isVeg;
    if (isDelhiSpecial !== undefined) updateData.isDelhiSpecial = isDelhiSpecial;
    if (available !== undefined) updateData.available = available;

    const updated = await Food.findByIdAndUpdate(id, updateData, { new: true });

    return NextResponse.json({
      success: true,
      message: "Food item updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error in /api/food/update:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update item" },
      { status: 500 }
    );
  }
}

