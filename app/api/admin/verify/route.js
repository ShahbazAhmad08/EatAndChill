import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function GET(req) {
  return handleVerify(req);
}

export async function POST(req) {
  return handleVerify(req);
}

function handleVerify(req) {
  const authHeader = req.headers.get("authorization") || req.headers.get("token");
  if (!authHeader) {
    return NextResponse.json({ success: false, message: "No token provided" }, { status: 401 });
  }

  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  const decoded = verifyToken(token);

  if (!decoded || !decoded.id) {
    return NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    adminId: decoded.id,
    role: decoded.role || "admin",
  });
}

