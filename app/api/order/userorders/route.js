import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";
import { verifyToken } from "@/lib/jwt";

function getUserId(req, body = {}) {
  if (body.userId || body.userid) return body.userId || body.userid;
  const tokenHeader = req.headers.get("token") || req.headers.get("authorization");
  if (tokenHeader) {
    const rawToken = tokenHeader.replace(/^Bearer\s+/i, "").trim();
    const decoded = verifyToken(rawToken);
    if (decoded && decoded.id) return decoded.id;
  }
  return null;
}

export async function POST(req) {
  try {
    await connectDB();
    let body = {};
    try {
      body = await req.json();
    } catch (_) {}

    const userId = getUserId(req, body);

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("User orders error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

