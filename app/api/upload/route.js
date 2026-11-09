import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") || formData.get("image");

    if (!file || typeof file !== "object") {
      return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadRes = await uploadImage(buffer, file.name || "dish.jpg", "eat_and_chill_dishes");

    return NextResponse.json({
      success: true,
      url: uploadRes.url,
      filename: uploadRes.filename || uploadRes.url,
      isCloudinary: uploadRes.isCloudinary,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
