import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    storeName: { type: String, default: "REAL BROTHER'S RESTAURANT" },
    tagline: { type: String, default: "Ghar Jaisa Swad" },
    storePhone: { type: String, default: "+91 78271 18412" },
    storeAltPhone: { type: String, default: "+91 63664 14326" },
    storeEmail: { type: String, default: "contact@realbrothersrestaurant.com" },
    storeAddress: {
      type: String,
      default:
        "Gali Number 5, Vishal, Sarfabad Village, Sector 73, Noida, Uttar Pradesh - 201301",
    },
    googleBusinessUrl: {
      type: String,
      default: "https://share.google/UPOhBCowyPZ07exvK",
    },
    storeTimings: {
      type: String,
      default: "08:00 AM - 12:00 AM Midnight (Open Daily)",
    },
    isStoreOpen: { type: Boolean, default: true },

    // Payments Control
    stripeEnabled: { type: Boolean, default: true },
    stripeSecretKey: { type: String, default: "" },
    stripePublishableKey: { type: String, default: "" },
    codEnabled: { type: Boolean, default: true },
    upiEnabled: { type: Boolean, default: true },
    upiId: { type: String, default: "7827118412@ybl" },

    // Cloudinary Image Storage Control
    cloudinaryCloudName: { type: String, default: "" },
    cloudinaryApiKey: { type: String, default: "" },
    cloudinaryApiSecret: { type: String, default: "" },

    // Pricing & Delivery
    deliveryFee: { type: Number, default: 40 },
    freeDeliveryThreshold: { type: Number, default: 499 },
    taxPercent: { type: Number, default: 5 },

    // Homepage Hero Content (Editable from Admin)
    heroTag: {
      type: String,
      default: "Real Brother's Restaurant • Ghar Jaisa Swad",
    },
    heroHeading: {
      type: String,
      default: "Craving Authentic Food? Ghar Jaisa Swad Delivered in 30 Mins",
    },
    heroSubheading: {
      type: String,
      default:
        "Satisfy your hunger with Sarfabad's favorite rich Paneer Handi, smoky Tandoori Kathi Rolls, crispy Kurkure Momos, Hakka Noodles, and homestyle Thalis. Fast 30-minute delivery to your doorstep, piping hot and fresh!",
    },

    // About Us Content (Editable from Admin)
    aboutText: {
      type: String,
      default:
        "Real Brother's Restaurant (Estd. 2024) is Sarfabad, Sector 73 Noida's premier destination for pure, flavorful Indian and Chinese cuisine. We deliver authentic home-style flavors ('Ghar Jaisa Swad') crafted with freshly ground spices, top-quality dairy, and hygienic preparation straight to your home or office in 30 minutes.",
    },

    // Announcement banner
    bannerNotice: {
      type: String,
      default:
        "⚡ Real Brother's Restaurant · Sarfabad Sector 73 Noida | Free Delivery on Orders Above ₹499 | Authentic Ghar Jaisa Swad!",
    },

    // SEO & Service Areas (Editable from Admin)
    metaTitle: {
      type: String,
      default:
        "REAL BROTHER'S RESTAURANT | Ghar Jaisa Swad - Sector 73, Sarfabad, Noida",
    },
    metaDescription: {
      type: String,
      default:
        "Order delicious food online from Real Brother's Restaurant in Sarfabad, Sector 73 Noida. Authentic Paneer Handi, Kathi Rolls, Momos, Dal Makhani, Biryani & Thalis. Fast 30-min doorstep delivery.",
    },
    metaKeywords: {
      type: String,
      default:
        "real brothers restaurant, real brother restaurant noida, food delivery sector 73 noida, sarfabad food delivery, best restaurant in sector 73 noida, ghar jaisa swad noida, online food order sarfabad, north indian food delivery noida",
    },
    googleSiteVerification: {
      type: String,
      default: "",
    },
    delhiDeliveryAreas: {
      type: String,
      default:
        "Sector 73, Sarfabad, Sector 74, Sector 75, Sector 76, Sector 77, Sector 78, Sector 121, Sector 122, Noida",
    },
    delhiDeliveryPincodes: {
      type: String,
      default:
        "201301, 201304, 201307",
    },
  },
  { timestamps: true }
);

const Settings =
  mongoose.models.settings || mongoose.model("settings", settingsSchema);
export default Settings;
