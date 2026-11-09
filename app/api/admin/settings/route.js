import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Settings from "@/lib/models/Settings";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    let settings = await Settings.findOne({});

    if (!settings) {
      settings = await Settings.create({});
    }

    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
    // Return sensible fallback
    return NextResponse.json({
      success: true,
      data: {
        storeName: "Eat & Chill - Delhi",
        storePhone: "+91 7755013772",
        storeEmail: "contact@eatandchill.com",
        stripeEnabled: true,
        codEnabled: true,
        upiEnabled: true,
        upiId: "eatandchill@okhdfcbank",
        deliveryFee: 50,
        freeDeliveryThreshold: 499,
        bannerNotice: "⚡ Delhi NCR Fast 30-Min Delivery | Free Delivery on Orders Above ₹499 | Authentic Dilli Street Delights & Modern Bites!",
        delhiDeliveryAreas: "Connaught Place, South Delhi, Hauz Khas, Saket, Greater Kailash, Dwarka, Rohini, Karol Bagh, Vasant Kunj",
      },
    });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    let settings = await Settings.findOne({});
    if (!settings) {
      settings = new Settings(body);
    } else {
      Object.assign(settings, body);
    }

    await settings.save();

    return NextResponse.json({
      success: true,
      message: "Admin settings updated successfully!",
      data: settings,
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update settings" },
      { status: 500 }
    );
  }
}

