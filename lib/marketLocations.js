// Market Locations Dataset for Real Brother's Restaurant
// Default active location: Sarfabad (Sector 73, Noida)
// Can be dynamically managed (add/edit/delete) via the Admin Panel at /admin/locations

export const DEFAULT_SARFABAD_LOCATION = {
  slug: "sarfabad-sector-73",
  name: "Sarfabad (Sector 73 Noida)",
  shortName: "Sarfabad (Noida)",
  zone: "Uttar Pradesh",
  city: "Noida",
  state: "Uttar Pradesh",
  pincodes: ["201301", "201304", "201307"],
  avgDeliveryMinutes: "25-30",
  hub: "Real Brother's Central Kitchen - Sarfabad, Sector 73",
  tagline: "Ghar Jaisa Swad - Sizzling Handi Curries & Hot Rolls",
  description:
    "Craving authentic, delicious home-style food in Sarfabad and Sector 73 Noida? Real Brother's Restaurant delivers rich Dal Makhani, Paneer Handi, crispy Kathi Rolls, Momos, and Hakka Noodles straight to your home or office in under 30 minutes.",
  address: "Gali Number 5, Vishal, Sarfabad Village, Sector 73, Noida, Uttar Pradesh - 201301",
  phone: "+91 78271 18412",
  googleBusinessUrl: "https://share.google/UPOhBCowyPZ07exvK",
  popularDishes: [
    "Shahi Paneer Handi",
    "Paneer Tikka Kathi Roll",
    "Dal Makhani Bukhara",
    "Kurkure Momos",
    "Veg Hakka Noodles",
    "Special Family Feast Thali",
  ],
  highlights: [
    "Fast 25-30 minute doorstep delivery across Sector 73, 74 & 76",
    "100% Fresh ingredients cooked with Ghar Jaisa Swad",
    "Open 8:00 AM to 12:00 AM Midnight with late-night delivery",
  ],
  landmarks: [
    "Sarfabad Village Main Market",
    "Gali Number 5",
    "Near Tivoli Banquet Hall",
    "Sector 73 Main Chauraha",
    "Near Supertech Capetown (Sector 74)",
    "Sector 76 Metro Station Belt",
  ],
  geo: { lat: 28.583, lng: 77.388 },
  faqs: [
    {
      q: "Where is Real Brother's Restaurant located in Noida?",
      a: "We are located at Gali Number 5, Vishal, Sarfabad Village, Sector 73, Noida (near Tivoli Banquet / Sector 74 border). You can also find us directly on Google Maps.",
    },
    {
      q: "How fast is delivery to Sector 73, Sector 74, and Sector 76 Noida?",
      a: "Our express delivery fleet delivers piping hot meals to Sector 73, Sector 74, Sector 75, Sector 76, and Sector 77 within 25 to 30 minutes using thermal insulation bags.",
    },
    {
      q: "Can I pay using UPI or Cash on Delivery (COD)?",
      a: "Yes! Real Brother's Restaurant accepts Cash on Delivery (COD), UPI (Google Pay, PhonePe, Paytm), and online cards.",
    },
    {
      q: "What are your popular dishes?",
      a: "Our signature dishes include Shahi Paneer Handi, Dal Makhani Bukhara, Paneer Tikka Rolls, Crispy Kurkure Momos, and our Special Ghar Jaisa Swad Thali.",
    },
  ],
  reviews: [
    {
      author: "Vikram Sharma, Sector 73 Noida",
      rating: 5,
      dish: "Shahi Paneer & Butter Naan",
      text: "Authentic Ghar Jaisa Swad! The gravy is rich without being overly oily. Delivered hot in 20 minutes to my flat.",
    },
    {
      author: "Pooja Verma, Sarfabad Market",
      rating: 5,
      dish: "Paneer Tikka Kathi Roll & Momos",
      text: "Best rolls in the Sarfabad / Sector 73 area. Flaky paratha and generous smoky stuffing. Highly recommended!",
    },
    {
      author: "Deepak Yadav, Sector 74 (Capetown)",
      rating: 5,
      dish: "Special Family Feast Thali",
      text: "Ordered dinner for my family on weekend. Everyone loved the Dal Makhani and piping hot rotis. Clean packaging.",
    },
  ],
};

// Initial market locations - currently 1 single active location as requested.
// Additional locations can be added via the Admin Panel (/admin/locations)
export const MARKET_LOCATIONS = [
  DEFAULT_SARFABAD_LOCATION,
];

// Helper to find location by slug
export function getMarketLocationBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = slug.toLowerCase().trim();
  return MARKET_LOCATIONS.find((loc) => loc.slug === cleanSlug) || null;
}

// Helper to get all slugs for static params
export function getAllMarketSlugs() {
  return MARKET_LOCATIONS.map((loc) => ({ slug: loc.slug }));
}

// Helper to get nearby locations
export function getNearbyMarketLocations(slug, limit = 4) {
  return MARKET_LOCATIONS.filter((loc) => loc.slug !== slug).slice(0, limit);
}

// Helper to get all zones
export function getAllZones() {
  const zones = new Set();
  MARKET_LOCATIONS.forEach((loc) => {
    if (loc.zone) zones.add(loc.zone);
  });
  return ["All Zones", ...Array.from(zones)];
}


