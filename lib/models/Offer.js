import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    tag: { type: String, default: "Special Deal" }, // e.g. "FLAT 30% OFF", "Bestseller Combo"
    originalPrice: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    discountPercent: { type: Number, default: 0 },
    image: { type: String, default: "/assets/food_1.png" },
    locationSlug: { type: String, default: "all", index: true }, // "all" or specific slug e.g. "connaught-place"
    locationName: { type: String, default: "All Delhi NCR" },
    couponCode: { type: String, default: "" },
    items: [{ type: String }], // items included in the combo
    badge: { type: String, default: "⚡ 30-Min Express Drop" },
    isPureVeg: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Offer = mongoose.models.offer || mongoose.model("offer", offerSchema);
export default Offer;

