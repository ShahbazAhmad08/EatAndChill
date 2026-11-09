import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Admin from "@/lib/models/Admin";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const data = body.data || body;
    const { email, password } = data;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    let admin = await Admin.findOne({ email });

    // Auto-create default admin if no admin exists yet
    if (!admin) {
      const defaultEmail = process.env.ADMIN_DEFAULT_EMAIL || "admin@eatandchill.com";
      const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || "adminpassword123";

      if (email.toLowerCase() === defaultEmail.toLowerCase()) {
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);
        admin = await Admin.create({
          email: defaultEmail,
          password: hashedPassword,
          name: "Eat & Chill Manager",
        });
      }
    }

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = signToken({ id: admin._id, role: admin.role || "admin" }, "7d");

    return NextResponse.json({
      success: true,
      message: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, message: "Server error during admin login" },
      { status: 500 }
    );
  }
}

