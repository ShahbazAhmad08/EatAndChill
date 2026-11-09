import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Coupon from "@/lib/models/Coupon";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    let coupons = await Coupon.find({}).sort({ createdAt: -1 });

    // Seed default Delhi promo codes if empty
    if (!coupons || coupons.length === 0) {
      await Coupon.insertMany([
        {
          code: "DELHI50",
          description: "Flat ₹50 OFF on orders above ₹299",
          discountType: "flat",
          discountValue: 50,
          minOrderAmount: 299,
          isActive: true,
        },
        {
          code: "DILLI20",
          description: "20% OFF on all orders above ₹499",
          discountType: "percent",
          discountValue: 20,
          minOrderAmount: 499,
          maxDiscount: 120,
          isActive: true,
        },
        {
          code: "WELCOME100",
          description: "Flat ₹100 OFF on your first Delhi feast above ₹599",
          discountType: "flat",
          discountValue: 100,
          minOrderAmount: 599,
          isActive: true,
        },
      ]);
      coupons = await Coupon.find({}).sort({ createdAt: -1 });
    }

    return NextResponse.json({
      success: true,
      data: coupons,
    });
  } catch (error) {
    console.error("Coupon list error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { code, description, discountType, discountValue, minOrderAmount, maxDiscount } = body;

    if (!code || !discountValue) {
      return NextResponse.json({ success: false, message: "Code and discount value are required" }, { status: 400 });
    }

    const cleanCode = code.trim().toUpperCase();
    const exists = await Coupon.findOne({ code: cleanCode });
    if (exists) {
      return NextResponse.json({ success: false, message: "Coupon code already exists" }, { status: 400 });
    }

    const newCoupon = await Coupon.create({
      code: cleanCode,
      description: description || `Discount of ${discountValue}`,
      discountType: discountType || "flat",
      discountValue: Number(discountValue),
      minOrderAmount: Number(minOrderAmount) || 0,
      maxDiscount: Number(maxDiscount) || 0,
      isActive: true,
    });

    return NextResponse.json({
      success: true,
      message: `Coupon "${cleanCode}" created successfully!`,
      data: newCoupon,
    });
  } catch (err) {
    console.error("Coupon create error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "Coupon ID is required" }, { status: 400 });
    }

    await Coupon.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (err) {
    console.error("Coupon delete error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

