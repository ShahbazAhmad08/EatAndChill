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
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { itemId } = body;
    const userData = await User.findById(userId);
    if (!userData) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const cartData = userData.cartData || {};
    if (cartData[itemId] > 1) {
      cartData[itemId] -= 1;
    } else {
      delete cartData[itemId];
    }

    await User.findByIdAndUpdate(userId, { cartData });

    return NextResponse.json({
      success: true,
      message: "Removed from cart",
      cartData,
    });
  } catch (err) {
    console.error("Cart remove error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

