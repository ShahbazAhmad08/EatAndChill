import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Settings from "@/lib/models/Settings";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    await connectDB();
    let settings = await Settings.findOne({}).lean();

    if (!settings) {
      const created = await Settings.create({});
      settings = created.toObject();
    }

    return NextResponse.json(
      {
        success: true,
        data: settings,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      {
        success: true,
        data: {
          storeName: "Eat & Chill",
          storePhone: "+91 7755013772",
          storeEmail: "sa798027@gmail.com",
          stripeEnabled: true,
          codEnabled: true,
          upiEnabled: true,
          upiId: "7755013772@ybl",
          deliveryFee: 50,
          freeDeliveryThreshold: 499,
          bannerNotice: "⚡ Fast 30-Min Delivery | Free Delivery on Orders Above ₹499 | Fresh & Handcrafted Meals!",
        },
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // Clean up any empty ID fields
    delete body._id;
    delete body.__v;

    // Use atomic findOneAndUpdate with upsert to guarantee updating the single settings document
    const updated = await Settings.findOneAndUpdate(
      {},
      { $set: body },
      { new: true, upsert: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Admin settings updated successfully!",
        data: updated,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update settings" },
      { status: 500 }
    );
  }
}

