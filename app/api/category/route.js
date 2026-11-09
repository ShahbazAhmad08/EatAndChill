import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/lib/models/Category";
import Food from "@/lib/models/Food";
import { initialCategories } from "@/lib/seedData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    let categories = await Category.find({}).sort({ createdAt: 1 });

    // Seed if empty
    if (!categories || categories.length === 0) {
      const toInsert = initialCategories
        .filter((c) => c.name !== "All")
        .map((c) => ({
          name: c.name,
          icon: c.icon || "🍽️",
        }));
      await Category.insertMany(toInsert);
      categories = await Category.find({}).sort({ createdAt: 1 });
    }

    // Get dish count for each category
    const foods = await Food.find({}, "category isDelhiSpecial");
    const categoryList = [
      {
        name: "All",
        icon: "🍽️",
        dishCount: foods.length,
      },
      ...categories.map((c) => {
        let count = 0;
        if (c.name === "Delhi Specials") {
          count = foods.filter((f) => f.isDelhiSpecial).length;
        } else {
          count = foods.filter((f) => f.category?.toLowerCase() === c.name.toLowerCase()).length;
        }
        return {
          _id: c._id,
          name: c.name,
          icon: c.icon || "🍲",
          dishCount: count,
        };
      }),
    ];

    return NextResponse.json({
      success: true,
      data: categoryList,
    });
  } catch (error) {
    console.error("Error in /api/category GET:", error);
    return NextResponse.json({
      success: true,
      data: initialCategories.map((c) => ({ ...c, dishCount: 0 })),
    });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, icon = "🍲" } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, message: "Category name is required" }, { status: 400 });
    }

    const trimmedName = name.trim();
    const exists = await Category.findOne({ name: { $regex: new RegExp(`^${trimmedName}$`, "i") } });

    if (exists) {
      return NextResponse.json({ success: false, message: "Category already exists" }, { status: 400 });
    }

    const newCat = await Category.create({
      name: trimmedName,
      icon,
    });

    return NextResponse.json({
      success: true,
      message: `Category "${trimmedName}" created successfully!`,
      data: newCat,
    });
  } catch (err) {
    console.error("Error in /api/category POST:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const name = searchParams.get("name");

    if (!id && !name) {
      return NextResponse.json({ success: false, message: "Category ID or name is required" }, { status: 400 });
    }

    if (id) {
      await Category.findByIdAndDelete(id);
    } else if (name) {
      await Category.findOneAndDelete({ name });
    }

    return NextResponse.json({
      success: true,
      message: "Category removed successfully",
    });
  } catch (err) {
    console.error("Error in /api/category DELETE:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
