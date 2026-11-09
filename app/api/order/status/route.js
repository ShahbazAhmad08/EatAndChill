import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { orderId, status, payment } = body;

    if (!orderId) {
      return NextResponse.json({ success: false, message: "Order ID is required" }, { status: 400 });
    }

    const updateObj = {};
    if (status !== undefined) updateObj.status = status;
    if (payment !== undefined) updateObj.payment = payment;

    const updated = await Order.findByIdAndUpdate(orderId, updateObj, { new: true });

    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Order status update error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

