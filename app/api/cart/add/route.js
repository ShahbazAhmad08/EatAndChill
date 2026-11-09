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
    const body = await req.json();
    const userId = getUserIdFromReq(req, body);

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized: Missing token" }, { status: 401 });
    }

    const { itemId } = body;
    if (!itemId) {
      return NextResponse.json({ success: false, message: "Item ID is required" }, { status: 400 });
    }

    const userData = await User.findById(userId);
    if (!userData) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const cartData = userData.cartData || {};
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await User.findByIdAndUpdate(userId, { cartData });

    return NextResponse.json({
      success: true,
      message: "Added to cart",
      cartData,
    });
  } catch (err) {
    console.error("Cart add error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

