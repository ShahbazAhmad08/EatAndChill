import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Location from "@/lib/models/Location";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await req.json();

    if (body.slug) {
      body.slug = body.slug
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-");
    }

    if (typeof body.pincodes === "string") {
      body.pincodes = body.pincodes.split(",").map((p) => p.trim()).filter(Boolean);
    }
    if (typeof body.popularDishes === "string") {
      body.popularDishes = body.popularDishes.split(",").map((p) => p.trim()).filter(Boolean);
    }
    if (typeof body.highlights === "string") {
      body.highlights = body.highlights.split(",").map((p) => p.trim()).filter(Boolean);
    }
    if (typeof body.landmarks === "string") {
      body.landmarks = body.landmarks.split(",").map((p) => p.trim()).filter(Boolean);
    }

    const updated = await Location.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Location not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Location updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("PUT /api/locations/[id] error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update location" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const loc = await Location.findById(id);
    if (!loc) {
      return NextResponse.json(
        { success: false, message: "Location not found" },
        { status: 404 }
      );
    }

    loc.isActive = !loc.isActive;
    await loc.save();

    return NextResponse.json({
      success: true,
      message: `Location is now ${loc.isActive ? "Active" : "Inactive"}`,
      data: loc,
    });
  } catch (err) {
    console.error("PATCH /api/locations/[id] error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to toggle status" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    // Check count: prevent deleting if it's the only location
    const count = await Location.countDocuments({});
    if (count <= 1) {
      return NextResponse.json(
        {
          success: false,
          message: "Cannot delete the only location. At least one location must remain in the system.",
        },
        { status: 400 }
      );
    }

    const deleted = await Location.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Location not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Location deleted successfully",
    });
  } catch (err) {
    console.error("DELETE /api/locations/[id] error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to delete location" },
      { status: 500 }
    );
  }
}
