import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Food from "@/lib/models/Food";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();

    const name = formData.get("name") || "";
    const description = formData.get("description") || "";
    const price = Number(formData.get("price")) || 0;
    const category = formData.get("category") || "Salad";
    const isVeg = formData.get("isVeg") === "false" ? false : true;
    const isDelhiSpecial = formData.get("isDelhiSpecial") === "true";

    const imageFile = formData.get("image");
    let imageFilename = "1748855584283-food_1.png";

    if (imageFile && typeof imageFile === "object" && imageFile.name) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await uploadImage(buffer, imageFile.name, "eat_and_chill_dishes");
      imageFilename = uploadResult.url; // Can be Cloudinary URL or local path
    } else if (typeof imageFile === "string" && imageFile.trim() !== "") {
      imageFilename = imageFile;
    }

    const newFood = new Food({
      name,
      description,
      price,
      category,
      image: imageFilename,
      isVeg,
      isDelhiSpecial,
    });

    await newFood.save();

    return NextResponse.json({
      success: true,
      message: "Food item added successfully with Cloudinary support!",
      data: newFood,
    });
  } catch (error) {
    console.error("Error in /api/food/add:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to add food item" },
      { status: 500 }
    );
  }
}
