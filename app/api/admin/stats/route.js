import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";
import Food from "@/lib/models/Food";
import User from "@/lib/models/User";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const [orders, foodCount, userCount] = await Promise.all([
      Order.find({}).sort({ createdAt: -1 }),
      Food.countDocuments(),
      User.countDocuments(),
    ]);

    let totalRevenue = 0;
    let pendingCount = 0;
    let deliveredCount = 0;

    orders.forEach((order) => {
      if (order.payment || order.paymentMethod === "cod") {
        totalRevenue += order.amount || 0;
      }
      if (order.status?.toLowerCase().includes("delivered")) {
        deliveredCount++;
      } else {
        pendingCount++;
      }
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders: orders.length,
        pendingOrders: pendingCount,
        deliveredOrders: deliveredCount,
        totalFoodItems: foodCount,
        totalUsers: userCount,
        recentOrders: orders.slice(0, 5),
      },
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

