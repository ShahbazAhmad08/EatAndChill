import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { verifyToken } from "@/lib/jwt";

function getUserIdFromReq(req, body = {}) {
  if (body.userId) return body.userId;
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

    const userId = getUserIdFromReq(req, body);

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const userData = await User.findById(userId);
    if (!userData) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      cartData: userData.cartData || {},
    });
  } catch (err) {
    console.error("Cart get error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

