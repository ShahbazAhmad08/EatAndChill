import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Coupon from "@/lib/models/Coupon";

export async function POST(req) {
  try {
    await connectDB();
    const { code, subtotal } = await req.json();

    if (!code || !subtotal) {
      return NextResponse.json({ success: false, message: "Code and subtotal are required" }, { status: 400 });
    }

    const cleanCode = code.trim().toUpperCase();
    const coupon = await Coupon.findOne({ code: cleanCode, isActive: true });

    if (!coupon) {
      return NextResponse.json({ success: false, message: "Invalid or expired coupon code" }, { status: 404 });
    }

    if (coupon.minOrderAmount && subtotal < coupon.minOrderAmount) {
      return NextResponse.json({
        success: false,
        message: `Cart must be at least ₹${coupon.minOrderAmount} to apply "${cleanCode}"`,
      }, { status: 400 });
    }

    let discount = 0;
    if (coupon.discountType === "flat") {
      discount = coupon.discountValue;
    } else if (coupon.discountType === "percent") {
      discount = Math.round((subtotal * coupon.discountValue) / 100);
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    }

    // Discount cannot exceed subtotal
    discount = Math.min(discount, subtotal);

    return NextResponse.json({
      success: true,
      message: `Coupon "${cleanCode}" applied! You saved ₹${discount}`,
      discount,
      coupon: {
        code: coupon.code,
        description: coupon.description,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
      },
    });
  } catch (error) {
    console.error("Coupon validate error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

