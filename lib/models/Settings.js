import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    storeName: { type: String, default: "Eat & Chill - Delhi" },
    storePhone: { type: String, default: "+91 7755013772" },
    storeEmail: { type: String, default: "contact@eatandchill.com" },
    storeAddress: {
      type: String,
      default:
        "Connaught Place, Central Delhi & South Delhi Delivery Hub, New Delhi - 110001",
    },
    storeTimings: {
      type: String,
      default: "11:00 AM - 03:00 AM (Late Night Delivery Active)",
    },
    isStoreOpen: { type: Boolean, default: true },

    // Payments Control
    stripeEnabled: { type: Boolean, default: true },
    stripeSecretKey: { type: String, default: "" },
    stripePublishableKey: { type: String, default: "" },
    codEnabled: { type: Boolean, default: true },
    upiEnabled: { type: Boolean, default: true },
    upiId: { type: String, default: "eatandchill@okhdfcbank" },

    // Cloudinary Image Storage Control
    cloudinaryCloudName: { type: String, default: "" },
    cloudinaryApiKey: { type: String, default: "" },
    cloudinaryApiSecret: { type: String, default: "" },

    // Pricing & Delivery
    deliveryFee: { type: Number, default: 50 },
    freeDeliveryThreshold: { type: Number, default: 499 },
    taxPercent: { type: Number, default: 5 },

    // Homepage Hero Content (Editable from Admin)
    heroTag: {
      type: String,
      default: "Delhi NCR's #1 Food Ordering Hub",
    },
    heroHeading: {
      type: String,
      default: "Order Delicious Food Online in Delhi NCR",
    },
    heroSubheading: {
      type: String,
      default:
        "Satisfy your cravings with Delhi's best Rolls, rich Butter Paneer, crispy Momos, fresh Sandwiches, Italian Pastas and chill Desserts. Fast 30-minute delivery to your doorstep, piping hot and fresh!",
    },

    // About Us Content (Editable from Admin)
    aboutText: {
      type: String,
      default:
        "Eat & Chill is Delhi NCR's fastest-growing cloud kitchen delivering authentic street recipes, rich Mughlai gravies, artisan pizzas, and refreshing chilled beverages straight to your doorstep in 30 minutes.",
    },

    // Announcement banner
    bannerNotice: {
      type: String,
      default:
        "⚡ Delhi NCR Fast 30-Min Delivery | Free Delivery on Orders Above ₹499 | Authentic Dilli Street Delights & Modern Bites!",
    },

    // Delhi SEO & Service Areas (Editable from Admin)
    metaTitle: {
      type: String,
      default:
        "Eat & Chill | Best Online Food Delivery in Delhi NCR - Fresh, Hot & 30-Min Delivery",
    },
    metaDescription: {
      type: String,
      default:
        "Order delicious food online in Delhi NCR from Eat & Chill. Authentic Butter Chicken, Rolls, Momos, Pasta, Burgers & Shakes. Fast 30-min late night delivery with live tracking.",
    },
    metaKeywords: {
      type: String,
      default:
        "food delivery delhi, online food order delhi, best rolls in delhi, late night food delivery delhi, south delhi food delivery, connaught place food order, eat and chill delhi, butter paneer delivery, momos delivery delhi",
    },
    googleSiteVerification: {
      type: String,
      default: "",
    },
    delhiDeliveryAreas: {
      type: String,
      default:
        "Connaught Place, South Delhi, Hauz Khas, Saket, Greater Kailash, Dwarka, Rohini, Karol Bagh, Vasant Kunj, Laxmi Nagar, Noida & Gurugram borders",
    },
    delhiDeliveryPincodes: {
      type: String,
      default:
        "110001, 110002, 110003, 110016, 110017, 110019, 110020, 110025, 110075, 110085, 110092",
    },
  },
  { timestamps: true }
);

const Settings =
  mongoose.models.settings || mongoose.model("settings", settingsSchema);
export default Settings;
