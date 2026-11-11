import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    shortName: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    zone: {
      type: String,
      default: "Uttar Pradesh",
    },
    city: {
      type: String,
      default: "Noida",
    },
    state: {
      type: String,
      default: "Uttar Pradesh",
    },
    pincodes: {
      type: [String],
      default: ["201301"],
    },
    avgDeliveryMinutes: {
      type: String,
      default: "25-30",
    },
    hub: {
      type: String,
      default: "Sarfabad Central Kitchen - Sector 73 Noida",
    },
    tagline: {
      type: String,
      default: "Ghar Jaisa Swad - Sizzling North Indian & Chinese Delivered Hot",
    },
    description: {
      type: String,
      default:
        "Craving authentic homestyle food in Sarfabad & Sector 73 Noida? Real Brother's Restaurant delivers piping hot Kathi Rolls, rich Paneer Handi, Momos, Noodles, and Thalis in under 30 minutes.",
    },
    address: {
      type: String,
      default: "Gali Number 5, Vishal, Sarfabad Village, Sector 73, Noida, Uttar Pradesh - 201301",
    },
    phone: {
      type: String,
      default: "+91 78271 18412",
    },
    googleBusinessUrl: {
      type: String,
      default: "https://share.google/UPOhBCowyPZ07exvK",
    },
    popularDishes: {
      type: [String],
      default: [
        "Shahi Paneer Handi",
        "Paneer Tikka Kathi Roll",
        "Dal Makhani Bukhara",
        "Kurkure Momos",
        "Veg Hakka Noodles",
        "Special Family Thali",
      ],
    },
    highlights: {
      type: [String],
      default: [
        "Express 25-30 Min doorstep delivery to Sector 73, 74 & 76",
        "Cooked fresh with pure spices - Ghar Jaisa Swad",
        "Late-night delivery active till 12:00 AM midnight",
      ],
    },
    landmarks: {
      type: [String],
      default: [
        "Sarfabad Village Main Market",
        "Gali Number 5",
        "Near Tivoli Banquet",
        "Sector 73 Chauraha",
        "Near Sector 74 & Supertech Capetown",
        "Sector 76 Metro Corridor",
      ],
    },
    geo: {
      lat: { type: Number, default: 28.583 },
      lng: { type: Number, default: 77.388 },
    },
    faqs: [
      {
        q: { type: String },
        a: { type: String },
      },
    ],
    reviews: [
      {
        author: { type: String },
        rating: { type: Number, default: 5 },
        dish: { type: String },
        text: { type: String },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    orderIndex: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Location = mongoose.models.Location || mongoose.model("Location", locationSchema);
export default Location;

