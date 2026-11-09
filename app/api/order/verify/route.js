import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";
import User from "@/lib/models/User";

export async function POST(req) {
  try {
    await connectDB();
    const { orderId, success, userId } = await req.json();

    if (success === "true" || success === true) {
      const order = await Order.findByIdAndUpdate(
        orderId,
        { payment: true, status: "Order Confirmed" },
        { new: true }
      );

      if (userId) {
        await User.findByIdAndUpdate(userId, { cartData: {} });
      } else if (order && order.userId) {
        await User.findByIdAndUpdate(order.userId, { cartData: {} });
      }

      return NextResponse.json({
        success: true,
        message: "Payment Successful! Order Confirmed.",
        order,
      });
    } else {
      // Mark as payment failed or cancel
      await Order.findByIdAndUpdate(orderId, {
        payment: false,
        status: "Payment Cancelled",
      });

      return NextResponse.json({
        success: false,
        message: "Payment Cancelled or Failed.",
      });
    }
  } catch (error) {
    console.error("Order verify error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

