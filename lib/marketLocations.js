// Comprehensive Programmatic SEO Market Locations Dataset
// Modeled after Programmatic SEO architecture for Delhi NCR & surrounding hubs

export const MARKET_LOCATIONS = [
  {
    slug: "connaught-place",
    name: "Connaught Place (CP)",
    shortName: "Connaught Place",
    zone: "Central Delhi",
    city: "New Delhi",
    state: "Delhi",
    pincodes: ["110001", "110002"],
    avgDeliveryMinutes: "20-28",
    hub: "Barakhamba Central Cloud Kitchen",
    tagline: "Heart of the Capital's Foodies & Corporate Dining",
    description: "Craving authentic Delhi street treats, crispy hand-tossed pizzas, or rich Mughlai handis in Connaught Place? Eat & Chill delivers piping hot meals straight to Inner & Outer Circle, Barakhamba corporate towers, and Janpath in under 30 minutes.",
    popularDishes: ["Dilli 6 Butter Chicken", "Old Delhi Shahi Paneer", "Crispy Delhi Rolls", "Kulhad Masala Chai", "Paneer Tikka Roll"],
    highlights: ["Express delivery to corporate towers & Janpath offices", "Tamper-proof insulated office lunch trays", "Mid-day & late-night express drop till 2 AM"],
    landmarks: ["Inner Circle", "Outer Circle", "Barakhamba Road", "Janpath", "Kasturba Gandhi Marg", "Shivaji Stadium"],
    geo: { lat: 28.6315, lng: 77.2167 },
    faqs: [
      {
        q: "How fast is food delivery in Connaught Place (CP)?",
        a: "Our central cloud kitchen is situated right off Barakhamba Road, allowing thermal insulated delivery within 20 to 28 minutes to both Inner and Outer circle buildings."
      },
      {
        q: "Do you deliver corporate lunch combos to offices in KG Marg & Janpath?",
        a: "Yes! We specialize in tamper-sealed corporate meal boxes and team lunch platters with direct lobby and desk delivery."
      },
      {
        q: "Can I pay using UPI or Cash on Delivery in Connaught Place?",
        a: "Eat & Chill accepts all online payment options including Google Pay, PhonePe, Paytm, credit/debit cards, as well as Cash on Delivery (COD)."
      }
    ],
    nearbySlugs: ["chandni-chowk", "karol-bagh", "lajpat-nagar", "hauz-khas", "mayur-vihar"],
    reviews: [
      { author: "Aditya S., KG Marg", rating: 5, dish: "Dilli 6 Butter Chicken", text: "Ordered for our office lunch rush at Barakhamba. Reached hot within 22 minutes! The naan was soft and the gravy was rich." },
      { author: "Simran K., CP Outer Circle", rating: 5, dish: "Paneer Tikka Roll", text: "Best rolls in CP hands down. Not oily, super crispy flaky paratha with smoky paneer." }
    ]
  },
  {
    slug: "hauz-khas",
    name: "Hauz Khas & HKV",
    shortName: "Hauz Khas",
    zone: "South Delhi",
    city: "New Delhi",
    state: "Delhi",
    pincodes: ["110016"],
    avgDeliveryMinutes: "25-30",
    hub: "South Delhi Express Hub - Green Park",
    tagline: "Vibrant Food Hub for IITians, Party Lovers & Cafes",
    description: "From late-night study sessions near IIT Delhi and NIFT to after-party cravings around Hauz Khas Village, Eat & Chill is South Delhi's favorite cloud kitchen for gourmet burgers, authentic rolls, and creamy pasta.",
    popularDishes: ["Tandoori Chaap", "Delhi Street Hakka Noodles", "Crispy Paneer Burger", "Nutella Waffles", "Makhani Momos"],
    highlights: ["Midnight delivery active till 3:00 AM", "Special college student discounts", "Eco-friendly packaging"],
    landmarks: ["Hauz Khas Village", "IIT Delhi Campus", "Green Park Market", "Aurobindo Market", "SDA Market"],
    geo: { lat: 28.5494, lng: 77.2001 },
    faqs: [
      {
        q: "Is late-night food delivery available in Hauz Khas Village & SDA?",
        a: "Yes, our South Delhi express kitchen operates until 3:00 AM every night, ensuring fresh hot meals for late study hours and night owls."
      },
      {
        q: "Do you deliver inside the IIT Delhi campus?",
        a: "Yes! Our riders deliver right to IIT Delhi hostel gates and student residential quarters."
      }
    ],
    nearbySlugs: ["saket", "greater-kailash", "vasant-kunj", "lajpat-nagar", "connaught-place"],
    reviews: [
      { author: "Rohan V., IIT Delhi Hostel", rating: 5, dish: "Makhani Momos & Burger", text: "Life saver during semester exams. 2 AM delivery was right on time and smoking hot." }
    ]
  },
  {
    slug: "saket",
    name: "Saket & Malviya Nagar",
    shortName: "Saket",
    zone: "South Delhi",
    city: "New Delhi",
    state: "Delhi",
    pincodes: ["110017"],
    avgDeliveryMinutes: "25-32",
    hub: "Saket Metro Kitchen Station",
    tagline: "Premium Tastes Delivered to Select CityWalk & Homes",
    description: "Serving Select CityWalk shoppers, Press Enclave societies, and Malviya Nagar residences. Enjoy 100% fresh, hygienic curries, thalis, pizzas, and artisan desserts at honest, pocket-friendly prices.",
    popularDishes: ["Dal Makhani Bukhara Style", "Paneer Tikka Roll", "Farmhouse Loaded Pizza", "Gulab Jamun", "Soya Malai Chaap"],
    highlights: ["Fast drops across Saket District Centre", "100% spill-proof micro-wave friendly containers", "Live GPS rider order tracking"],
    landmarks: ["Select CityWalk", "DLF Avenue Saket", "Press Enclave", "Malviya Nagar Market", "Max Super Speciality Hospital"],
    geo: { lat: 28.5244, lng: 77.2167 },
    faqs: [
      {
        q: "What is the delivery fee for Saket & Malviya Nagar?",
        a: "Standard delivery is ₹50, and all orders above ₹499 enjoy 100% FREE doorstep delivery."
      },
      {
        q: "How fast will my food arrive in Press Enclave?",
        a: "Average transit time from our Saket Metro Station kitchen is 25 to 30 minutes."
      }
    ],
    nearbySlugs: ["hauz-khas", "greater-kailash", "vasant-kunj", "okhla", "faridabad-nit"],
    reviews: [
      { author: "Pooja M., Saket J-Block", rating: 5, dish: "Dal Makhani & Garlic Naan", text: "The dal makhani tastes just like premium 5-star Mughlai restaurants. Creamy and slow-cooked to perfection." }
    ]
  },
  {
    slug: "greater-kailash",
    name: "Greater Kailash (GK 1 & 2)",
    shortName: "Greater Kailash",
    zone: "South Delhi",
    city: "New Delhi",
    state: "Delhi",
    pincodes: ["110048"],
    avgDeliveryMinutes: "24-30",
    hub: "M-Block Gourmet Kitchen Hub",
    tagline: "Royal Culinary Feasts for Elite South Delhi",
    description: "Order royal Mughlai gravies, artisan wood-fired style pizzas, and decadent desserts delivered with white-glove packaging to GK 1, GK 2, Pamposh Enclave, and Kailash Colony.",
    popularDishes: ["Mutton Rogan Josh", "Dilli 6 Butter Chicken", "Truffle Mushroom Pasta", "Rabdi Falooda", "Afghani Paneer Tikka"],
    highlights: ["VIP tamper-evident packaging for dinner parties", "Pure Desi Ghee preparations", "Freshly baked naans with foil wraps"],
    landmarks: ["M-Block Market GK 1", "M-Block Market GK 2", "Kailash Colony", "Pamposh Enclave", "Don Bosco Road"],
    geo: { lat: 28.5482, lng: 77.2426 },
    faqs: [
      {
        q: "Do you cater for small dinner parties and get-togethers in GK 1 & GK 2?",
        a: "Yes! You can order party meal combos and family platters with instant bulk discounts directly from our app."
      }
    ],
    nearbySlugs: ["lajpat-nagar", "saket", "hauz-khas", "okhla", "noida-sector-18"],
    reviews: [
      { author: "Dr. Alok Verma, GK 2", rating: 5, dish: "Shahi Paneer & Rogan Josh", text: "The presentation is top-notch. Desi ghee flavor really stands out. Arrived within 25 mins." }
    ]
  },
  {
    slug: "dwarka",
    name: "Dwarka Sub-City",
    shortName: "Dwarka",
    zone: "South West Delhi",
    city: "New Delhi",
    state: "Delhi",
    pincodes: ["110075", "110077", "110078"],
    avgDeliveryMinutes: "28-35",
    hub: "Dwarka Sector 12 Cloud Hub",
    tagline: "Sub-City's Most Trusted Family Cloud Kitchen",
    description: "From Sector 1 to Sector 23, Eat & Chill is Dwarka's highest-rated cloud kitchen for hygienic family dinners, budget thalis, rolls, and weekend feast boxes.",
    popularDishes: ["Special Maharaja Thali", "Kadhai Paneer", "Amritsari Kulcha with Chole", "Mango Lassi", "Veg Supreme Pizza"],
    highlights: ["Complete coverage across all 23 Dwarka sectors & Vegas Mall", "Family meal combos and pocket thalis", "No minimum order requirement"],
    landmarks: ["Vegas Mall Sector 14", "Dwarka Sector 12 Metro", "Sector 6 Central Market", "Sector 21 Inter-state Terminal", "Sector 10 DDA Park"],
    geo: { lat: 28.5921, lng: 77.046 },
    faqs: [
      {
        q: "Which sectors of Dwarka are covered for fast food delivery?",
        a: "We deliver across all sectors 1 to 23 of Dwarka with typical 28 to 35-minute doorstep service."
      },
      {
        q: "Are the food boxes safe for high-rise society security drops?",
        a: "Yes! Every single meal package is sealed with tamper-proof QR security tape."
      }
    ],
    nearbySlugs: ["janakpuri", "vasant-kunj", "gurugram-cyber-city", "paschim-vihar", "rohini"],
    reviews: [
      { author: "Kavita R., Sector 19 Dwarka", rating: 5, dish: "Special Maharaja Thali", text: "Generous portions, warm roti, and incredible paneer gravy. Dwarka's best family cloud kitchen." }
    ]
  },
  {
    slug: "rohini",
    name: "Rohini (Sectors 1 to 25)",
    shortName: "Rohini",
    zone: "North West Delhi",
    city: "New Delhi",
    state: "Delhi",
    pincodes: ["110085", "110086"],
    avgDeliveryMinutes: "28-35",
    hub: "Rohini West Express Unit",
    tagline: "North Delhi's Authentic Street Food & Royal Feasts",
    description: "Savor the rich, bold flavours of Delhi street chaat, kurkure momos, tandoori starters, and butter-laden curries delivered hot to every sector of Rohini.",
    popularDishes: ["Crispy Kurkure Momos", "Paneer Butter Masala", "Chur Chur Naan Thali", "Cold Coffee Shake", "Tandoori Soya Chaap"],
    highlights: ["Pocket-friendly student combos", "Pure vegetarian kitchen dedicated section", "Contactless UPI & COD options"],
    landmarks: ["Unity One Mall Rohini", "Rithala Metro Station", "Rohini Sector 7 Market", "Swarn Jayanti Park", "Sector 14"],
    geo: { lat: 28.716, lng: 77.117 },
    faqs: [
      {
        q: "Can I order Cash on Delivery (COD) in Rohini?",
        a: "Yes! Both COD and instant scan-on-delivery UPI are available across all sectors in Rohini."
      }
    ],
    nearbySlugs: ["pitampura", "model-town", "paschim-vihar", "karol-bagh", "dwarka"],
    reviews: [
      { author: "Nitin B., Sector 8 Rohini", rating: 5, dish: "Kurkure Momos & Cold Coffee", text: "Best evening snack ever. Crispy outside, spicy inside, and arrived faster than any other app." }
    ]
  },
  {
    slug: "karol-bagh",
    name: "Karol Bagh & Patel Nagar",
    shortName: "Karol Bagh",
    zone: "Central-West Delhi",
    city: "New Delhi",
    state: "Delhi",
    pincodes: ["110005", "110008"],
    avgDeliveryMinutes: "22-28",
    hub: "Karol Bagh Station Hub",
    tagline: "Old Delhi Tradition Meets Modern Hearty Flavours",
    description: "Whether you are shopping around Ajmal Khan Road, preparing for competitive exams near Old Rajinder Nagar, or relaxing at home in East or West Patel Nagar, Eat & Chill delivers hearty soul food straight to your table.",
    popularDishes: ["Rajma Chawal Bowl", "Delhi Chole Bhature", "Paneer Lababdar", "Masala Chaas", "Aloo Paratha with White Butter"],
    highlights: ["Special student & UPSC aspirant meal passes", "Quick 22-28 minute turnaround", "Clean, homely non-greasy cooking style"],
    landmarks: ["Ajmal Khan Road", "Old Rajinder Nagar", "Ghaffar Market", "Patel Nagar Metro", "Pusa Road"],
    geo: { lat: 28.6517, lng: 77.1906 },
    faqs: [
      {
        q: "Do you deliver daily meal bowls to Old Rajinder Nagar hostels?",
        a: "Yes! We have hundreds of UPSC aspirants ordering our wholesome Rajma Chawal, Dal Makhani, and Thalis every single day."
      }
    ],
    nearbySlugs: ["connaught-place", "chandni-chowk", "punjabi-bagh", "pitampura", "lajpat-nagar"],
    reviews: [
      { author: "Deepak S., Old Rajinder Nagar", rating: 5, dish: "Rajma Chawal Bowl", text: "Tastes just like home cooked mom's food. Not too spicy, very hygienic and super affordable for students." }
    ]
  },
  {
    slug: "vasant-kunj",
    name: "Vasant Kunj & Aerocity",
    shortName: "Vasant Kunj",
    zone: "South West Delhi",
    city: "New Delhi",
    state: "Delhi",
    pincodes: ["110070", "110037"],
    avgDeliveryMinutes: "26-32",
    hub: "Vasant Kunj Hub",
    tagline: "Gourmet Cloud Kitchen for Aerocity & Vasant Kunj",
    description: "Premium culinary delivery covering Vasant Kunj Sectors A to D, Nelson Mandela Marg, and Aerocity hotel guests. Authentic flavours prepared with an artisanal, healthy touch.",
    popularDishes: ["Smoked Chicken Tikka", "Gourmet Veg Lasagna", "Penne Arbiata", "Brownie Sundae", "Wood-fired Margherita Pizza"],
    highlights: ["Hotel & guest room deliveries at Aerocity hotels", "Premium eco-friendly tamper seals", "Fresh gourmet ingredients daily"],
    landmarks: ["Ambience Mall Vasant Kunj", "DLF Promenade", "Nelson Mandela Marg", "Worldmark Aerocity", "IGI Airport Terminal 3"],
    geo: { lat: 28.5289, lng: 77.1558 },
    faqs: [
      {
        q: "Can you deliver to hotel lobbies in Aerocity?",
        a: "Yes, our delivery partners coordinate directly with hotel reception or lobby concierge for a smooth, fast handover."
      }
    ],
    nearbySlugs: ["hauz-khas", "dwarka", "saket", "gurugram-cyber-city", "greater-kailash"],
    reviews: [
      { author: "Sarah W., Aerocity Hotel Guest", rating: 5, dish: "Smoked Chicken Tikka & Naan", text: "Way better and faster than room service! Ordered online, arrived in 25 mins straight to the lobby." }
    ]
  },
  {
    slug: "mayur-vihar",
    name: "Mayur Vihar (Phases 1, 2, 3)",
    shortName: "Mayur Vihar",
    zone: "East Delhi",
    city: "New Delhi",
    state: "Delhi",
    pincodes: ["110091", "110092", "110096"],
    avgDeliveryMinutes: "25-30",
    hub: "East Delhi Mayur Hub",
    tagline: "East Delhi's Premier Family Cloud Kitchen",
    description: "Delivering across Mayur Vihar Phase 1, Phase 2, Phase 3, and Patparganj societies. Pure taste, generous servings, and lightning-fast delivery to your door.",
    popularDishes: ["Delhi Chaat Platter", "Paneer Tikka Masala", "Chicken Biryani Handi", "Kesar Kheer", "Chilli Garlic Noodles"],
    highlights: ["Covers all residential high-rises and DDA flats", "Party box packages for weekend gatherings", "Dedicated society delivery gate coordination"],
    landmarks: ["Mayur Vihar Phase 1 Metro", "Chilla Regulator", "Pocket 1 Market", "Patparganj IP Extension", "Samachar Apartments"],
    geo: { lat: 28.6095, lng: 77.2947 },
    faqs: [
      {
        q: "Do your riders deliver right to high-rise apartment doors in Mayur Vihar?",
        a: "Yes! Our riders follow all society entry protocols and deliver right to your apartment door."
      }
    ],
    nearbySlugs: ["laxmi-nagar", "noida-sector-18", "ghaziabad-indirapuram", "connaught-place", "lajpat-nagar"],
    reviews: [
      { author: "Ananya G., Mayur Vihar Phase 1", rating: 5, dish: "Chicken Biryani Handi", text: "The dum cooking aroma hit as soon as we broke the seal. Truly authentic flavor!" }
    ]
  },
  {
    slug: "punjabi-bagh",
    name: "Punjabi Bagh & Rajouri Garden",
    shortName: "Punjabi Bagh",
    zone: "West Delhi",
    city: "New Delhi",
    state: "Delhi",
    pincodes: ["110026", "110027"],
    avgDeliveryMinutes: "24-30",
    hub: "Club Road West Hub",
    tagline: "Rich, Bold & Authentic West Delhi Feasts",
    description: "Nothing beats a feast in West Delhi! Relish authentic butter-loaded curries, smoky tandoori platters, and decadent shakes delivered across Club Road, Shivaji Marg, and Rajouri Garden.",
    popularDishes: ["Tandoori Malai Chaap", "Butter Chicken Delite", "Garlic Butter Naan", "Oreo Thickshake", "Dilli Ke Chole Kulche"],
    highlights: ["Generous West Delhi portions made for food lovers", "Desi Ghee tadka in every curry", "Night owl delivery operational till 2:30 AM"],
    landmarks: ["Club Road Punjabi Bagh", "Rajouri Garden Main Market", "City Square Mall", "Shivaji College", "Ring Road Flyover"],
    geo: { lat: 28.6678, lng: 77.1265 },
    faqs: [
      {
        q: "Are the dishes spicy or can spice level be customized?",
        a: "Our dishes are tuned to classic Delhi taste, but you can leave custom spice notes during checkout for mild or extra-spicy preparations."
      }
    ],
    nearbySlugs: ["paschim-vihar", "janakpuri", "karol-bagh", "pitampura", "rohini"],
    reviews: [
      { author: "Harpreet Singh, Punjabi Bagh East", rating: 5, dish: "Tandoori Malai Chaap", text: "Juicy, melt-in-mouth chaap with mint chutney. Generous portion size!" }
    ]
  },
  {
    slug: "chandni-chowk",
    name: "Chandni Chowk & Old Delhi",
    shortName: "Old Delhi",
    zone: "Old Delhi",
    city: "New Delhi",
    state: "Delhi",
    pincodes: ["110006"],
    avgDeliveryMinutes: "22-28",
    hub: "Dilli 6 Heritage Kitchen",
    tagline: "Centuries of Heritage Recipes, Delivered Clean & Fast",
    description: "Experience the legendary authentic culinary recipes of Old Delhi—slow-cooked Dal Makhani, authentic biryanis, crispy rolls, and melt-in-mouth desserts delivered fresh to your doorstep.",
    popularDishes: ["Old Delhi Biryani Handi", "Shahi Tukda", "Seekh Kebab Roll", "Firni", "Matar Kulcha Platter"],
    highlights: ["Authentic traditional slow-cooked Dum recipes", "Charcoal smoke infusion for true heritage taste", "Modern ISO-certified hygienic cloud kitchen"],
    landmarks: ["Red Fort", "Jama Masjid", "Chandni Chowk Metro", "Town Hall", "Khari Baoli", "Dariba Kalan"],
    geo: { lat: 28.6562, lng: 77.23 },
    faqs: [
      {
        q: "Is the Old Delhi food cooked using traditional methods?",
        a: "Yes! We preserve authentic slow-simmering 'Dum' techniques while operating in a spotless, certified hygienic cloud kitchen."
      }
    ],
    nearbySlugs: ["connaught-place", "karol-bagh", "model-town", "mayur-vihar", "lajpat-nagar"],
    reviews: [
      { author: "Mohd. Tariq, Near Jama Masjid", rating: 5, dish: "Old Delhi Biryani Handi", text: "Captures the exact fragrance and long grain Basmati magic of traditional wedding deghs." }
    ]
  },
  {
    slug: "lajpat-nagar",
    name: "Lajpat Nagar & Defence Colony",
    shortName: "Lajpat Nagar",
    zone: "South Delhi",
    city: "New Delhi",
    state: "Delhi",
    pincodes: ["110024"],
    avgDeliveryMinutes: "22-28",
    hub: "Central Market Hub",
    tagline: "Shopping Cravings & Comfort Dining Delivered",
    description: "After a bustling shopping sprint at Central Market or relaxing in Defence Colony, satisfy your tastebuds with delicious rolls, momos, pizzas, and rich curries from Eat & Chill.",
    popularDishes: ["Delhi Street Momos", "Paneer Bhurji Roll", "Hyderabadi Chicken Dum Biryani", "Gulab Jamun", "Tandoori Chicken Wings"],
    highlights: ["Rapid drops near Lajpat Nagar Flyover & Metro", "Complimentary fresh salads and dips included", "No surge pricing during rush hours"],
    landmarks: ["Central Market Lajpat Nagar", "Defence Colony Main Market", "Moolchand Flyover", "Vinobapuri Metro", "Kasturba Niketan"],
    geo: { lat: 28.57, lng: 77.2435 },
    faqs: [
      {
        q: "What are your operating hours in Lajpat Nagar?",
        a: "We are open 7 days a week from 11:00 AM to 1:00 AM midnight."
      }
    ],
    nearbySlugs: ["greater-kailash", "connaught-place", "saket", "okhla", "hauz-khas"],
    reviews: [
      { author: "Meenakshi K., Defence Colony", rating: 5, dish: "Delhi Street Momos & Biryani", text: "Fast delivery, neat spill-free containers, and the momo red chutney has that authentic fiery kick!" }
    ]
  },
  {
    slug: "noida-sector-18",
    name: "Noida (Sectors 18, 50, 62 & 137)",
    shortName: "Noida Hub",
    zone: "Noida NCR",
    city: "Noida",
    state: "Uttar Pradesh",
    pincodes: ["201301", "201303", "201305", "201307"],
    avgDeliveryMinutes: "25-32",
    hub: "Noida Express Central Kitchen",
    tagline: "Speedy 30-Min Food Drops to Noida IT Parks & Societies",
    description: "Serving high-rise gated societies across Sector 50, 76, 137, and IT hubs in Sector 62 and Sector 18 (Atta). Enjoy delicious North Indian delicacies, wood-fired style pizzas, and Asian bowls delivered hot.",
    popularDishes: ["Dilli 6 Butter Chicken", "Crispy Kathi Rolls", "Smoky Paneer Tikka", "Cold Hazelnut Coffee", "Veg Loaded Pizza"],
    highlights: ["Express delivery to Noida Electronic City & Sector 62 IT Parks", "Late-night shifts covered till 2:30 AM", "Zero delivery charge above ₹499"],
    landmarks: ["DLF Mall of India", "Atta Market Sector 18", "Sector 62 IT Park", "Sector 50 Central Park", "Advant Navis Sector 142"],
    geo: { lat: 28.5708, lng: 77.3261 },
    faqs: [
      {
        q: "Do you deliver inside Noida high-rise apartments and IT towers?",
        a: "Yes! Our delivery riders deliver directly to society tower lobbies and corporate front desks."
      },
      {
        q: "How fast is delivery to Sector 62 and Sector 137?",
        a: "Our Noida express hubs ensure hot food reaches within 25 to 32 minutes."
      }
    ],
    nearbySlugs: ["mayur-vihar", "ghaziabad-indirapuram", "laxmi-nagar", "okhla", "greater-kailash"],
    reviews: [
      { author: "Prashant T., Sector 62 Tech Park", rating: 5, dish: "Kathi Rolls & Coffee", text: "Our go-to late night coding snack. Super fast and always fresh!" }
    ]
  },
  {
    slug: "gurugram-cyber-city",
    name: "Gurugram Cyber City & Golf Course Road",
    shortName: "Gurugram Hub",
    zone: "Gurugram NCR",
    city: "Gurugram",
    state: "Haryana",
    pincodes: ["122002", "122009", "122011"],
    avgDeliveryMinutes: "25-32",
    hub: "Cyber City DLF Express Kitchen",
    tagline: "Corporate Lunchboxes & Late-Night Bites for Millennium City",
    description: "Serving DLF CyberHub, Horizon Centre on Golf Course Road, Cyber City towers, and luxury condos in Phase 1-5. Relish gourmet thalis, quick rolls, and handcrafted desserts delivered in record time.",
    popularDishes: ["Gourmet Paneer Thali", "Chicken Tikka Roll", "Penne Alfredo", "Belgian Chocolate Shake", "Smoked Dal Makhani"],
    highlights: ["Express corporate desk delivery", "Premium spill-proof insulated trays", "Late night delivery till 3 AM"],
    landmarks: ["DLF CyberHub", "One Horizon Centre", "Galleria Market Phase 4", "Golf Course Road", "Ambience Mall Gurgaon"],
    geo: { lat: 28.4986, lng: 77.0895 },
    faqs: [
      {
        q: "Can you deliver large team lunch orders to Cyber City offices?",
        a: "Yes, we handle corporate catering, team lunches, and individual meal trays with seamless bulk invoicing."
      }
    ],
    nearbySlugs: ["vasant-kunj", "dwarka", "saket", "hauz-khas", "faridabad-nit"],
    reviews: [
      { author: "Vikram N., CyberHub Building 10", rating: 5, dish: "Chicken Tikka Roll & Shake", text: "Arrived in 20 mins right to our 7th floor lobby. Impressive packaging and taste." }
    ]
  },
  {
    slug: "ghaziabad-indirapuram",
    name: "Indirapuram & Vaishali (Ghaziabad)",
    shortName: "Indirapuram",
    zone: "Ghaziabad NCR",
    city: "Ghaziabad",
    state: "Uttar Pradesh",
    pincodes: ["201010", "201014"],
    avgDeliveryMinutes: "28-35",
    hub: "Indirapuram Ahinsa Khand Kitchen",
    tagline: "The Family Kitchen Choice for Indirapuram & Vaishali",
    description: "Delivering across Ahinsa Khand, Nyay Khand, Vaibhav Khand, Vaishali Sectors 1-9, and Vasundhara. Wholesome curries, stuffed parathas, and street snacks made with clean ingredients.",
    popularDishes: ["Old Delhi Shahi Paneer", "Amritsari Kulcha Platter", "Crispy Kurkure Momos", "Masala Shikanji", "Butter Naan Combos"],
    highlights: ["Wide coverage of Indirapuram & Vaishali societies", "Generous family dinner platters", "Quick 28-35 min delivery"],
    landmarks: ["Shipra Mall", "Habitat Centre", "Vaishali Metro Station", "Swarna Jayanti Park Indirapuram", "Kala Pathar"],
    geo: { lat: 28.6415, lng: 77.3714 },
    faqs: [
      {
        q: "Do you deliver to high-rise societies in Indirapuram and Vasundhara?",
        a: "Yes, our riders are familiar with all gated societies and provide smooth doorstep delivery."
      }
    ],
    nearbySlugs: ["noida-sector-18", "mayur-vihar", "laxmi-nagar", "chandni-chowk", "connaught-place"],
    reviews: [
      { author: "Sunita M., Ahinsa Khand 2", rating: 5, dish: "Old Delhi Shahi Paneer", text: "Rich without being heavy. Kids and grandparents both loved it!" }
    ]
  },
  {
    slug: "faridabad-nit",
    name: "Faridabad (NIT & Green Field)",
    shortName: "Faridabad Hub",
    zone: "Faridabad NCR",
    city: "Faridabad",
    state: "Haryana",
    pincodes: ["121001", "121003", "121007"],
    avgDeliveryMinutes: "30-36",
    hub: "NIT Faridabad Cloud Station",
    tagline: "Hearty North Indian Gravies & Fresh Bakes in Faridabad",
    description: "Serving residential sectors across NIT 1-5, Green Field Colony, Sector 15, and Mathura Road. Fast, hot food made to order with authentic spices and pure ghee.",
    popularDishes: ["Dilli 6 Butter Chicken", "Dal Makhani", "Tandoori Malai Chaap", "Cold Coffee", "Chur Chur Naan"],
    highlights: ["Doorstep drop in NIT and Green Field Colony", "Spill-proof foil containers", "Free delivery on orders above ₹499"],
    landmarks: ["Crown Plaza Faridabad", "NIT 1 Central Market", "Bata Chowk Metro", "Sector 15 Market", "Surajkund Road"],
    geo: { lat: 28.4089, lng: 77.3178 },
    faqs: [
      {
        q: "What is the delivery time across NIT Faridabad?",
        a: "Orders generally reach within 30 to 36 minutes straight from our central NIT kitchen."
      }
    ],
    nearbySlugs: ["saket", "okhla", "greater-kailash", "gurugram-cyber-city", "lajpat-nagar"],
    reviews: [
      { author: "Gaurav B., NIT 3", rating: 5, dish: "Dal Makhani & Naan", text: "Faridabad finally has a cloud kitchen that delivers restaurant quality food on time." }
    ]
  },
  {
    slug: "pitampura",
    name: "Pitampura & Netaji Subhash Place (NSP)",
    shortName: "Pitampura NSP",
    zone: "North West Delhi",
    city: "New Delhi",
    state: "Delhi",
    pincodes: ["110034"],
    avgDeliveryMinutes: "22-28",
    hub: "NSP Tower Hub",
    tagline: "Delhi's Ultimate Street & Trendy Food Hotspot",
    description: "From NSP corporate towers to residential enclaves of Pitampura (Kapil Vihar, Kohat Enclave, Rani Bagh), enjoy mouth-watering momos, loaded shakes, thalis, and Mughlai biryanis delivered in under 30 minutes.",
    popularDishes: ["Crispy Kurkure Momos", "Tandoori Spring Rolls", "Delhi Chaat Platter", "Hazelnut Cold Coffee", "Paneer Tikka Masala"],
    highlights: ["Lightning fast drops to NSP corporate complexes", "Customizable spice levels", "Spill-proof packaging"],
    landmarks: ["Netaji Subhash Place (NSP)", "Pitampura TV Tower", "Dilli Haat Pitampura", "Kohat Enclave", "Pacific Mall NSP"],
    geo: { lat: 28.6989, lng: 77.1407 },
    faqs: [
      {
        q: "Do you deliver to offices in NSP complex?",
        a: "Yes! We specialize in quick office drops to all major NSP towers."
      }
    ],
    nearbySlugs: ["rohini", "model-town", "karol-bagh", "punjabi-bagh", "paschim-vihar"],
    reviews: [
      { author: "Rishabh K., NSP Tower 2", rating: 5, dish: "Tandoori Spring Rolls & Shake", text: "Super crisp rolls even after delivery. Delivery in just 20 mins." }
    ]
  },
  {
    slug: "janakpuri",
    name: "Janakpuri & Uttam Nagar",
    shortName: "Janakpuri",
    zone: "West Delhi",
    city: "New Delhi",
    state: "Delhi",
    pincodes: ["110058", "110059"],
    avgDeliveryMinutes: "25-32",
    hub: "District Centre West Hub",
    tagline: "West Delhi's Favorite Comfort Food Delivered",
    description: "Serving Janakpuri Blocks A to D, District Centre offices, and Uttam Nagar. Indulge in classic butter chicken, Amritsari kulchas, Chinese bowls, and sweet treats delivered warm to your doorstep.",
    popularDishes: ["Special Maharaja Thali", "Crispy Kathi Roll", "Amritsari Kulcha with Chole", "Oreo Thickshake", "Soya Chaap Tikka"],
    highlights: ["Wide delivery across Janakpuri & Uttam Nagar East", "Late night delivery till 2 AM", "Instant UPI on delivery"],
    landmarks: ["Janakpuri District Centre", "Unity One Janakpuri", "Chhoti Sabzi Mandi", "Janakpuri West Metro", "Pankha Road"],
    geo: { lat: 28.6219, lng: 77.0878 },
    faqs: [
      {
        q: "How fast is delivery to Janakpuri Block C & D?",
        a: "Average transit time from our District Centre hub is 25 to 30 minutes."
      }
    ],
    nearbySlugs: ["dwarka", "punjabi-bagh", "paschim-vihar", "karol-bagh", "vasant-kunj"],
    reviews: [
      { author: "Kunal J., Janakpuri Block B", rating: 5, dish: "Maharaja Thali", text: "Rich dal makhani, paneer butter masala, and hot butter naans. Perfect for family dinner." }
    ]
  },
  {
    slug: "laxmi-nagar",
    name: "Laxmi Nagar & Preet Vihar",
    shortName: "Laxmi Nagar",
    zone: "East Delhi",
    city: "New Delhi",
    state: "Delhi",
    pincodes: ["110092"],
    avgDeliveryMinutes: "22-28",
    hub: "V3S East Kitchen Hub",
    tagline: "East Delhi's Premier Food Hub for Students & Families",
    description: "Serving CA aspirants in Laxmi Nagar, families in Preet Vihar, Nirman Vihar, and Shakarpur. Enjoy piping hot thalis, street momos, burgers, and rolls at pocket-friendly student prices.",
    popularDishes: ["Delhi Street Momos", "Rajma Chawal Bowl", "Crispy Paneer Burger", "Paneer Tikka Roll", "Masala Chai Flask"],
    highlights: ["Pocket-friendly student combo offers", "Ultra-fast 22-28 min delivery", "Hygienic prep with fresh ingredients"],
    landmarks: ["V3S Mall Nirman Vihar", "Laxmi Nagar Metro", "Preet Vihar Commercial Complex", "Shakarpur Main Market", "Vikas Marg"],
    geo: { lat: 28.6304, lng: 77.2777 },
    faqs: [
      {
        q: "Are there budget-friendly daily meals for students in Laxmi Nagar?",
        a: "Yes! Our thali combos and rice bowls are priced affordably for daily dining."
      }
    ],
    nearbySlugs: ["mayur-vihar", "chandni-chowk", "connaught-place", "noida-sector-18", "ghaziabad-indirapuram"],
    reviews: [
      { author: "Tarun G., Shakarpur", rating: 5, dish: "Rajma Chawal & Momos", text: "Huge portion, feels like home cooked meal. Very reasonable price." }
    ]
  },
  {
    slug: "okhla",
    name: "Okhla Phase 1-3 & Jasola",
    shortName: "Okhla Hub",
    zone: "South East Delhi",
    city: "New Delhi",
    state: "Delhi",
    pincodes: ["110020", "110025"],
    avgDeliveryMinutes: "25-30",
    hub: "Okhla Industrial Area Kitchen",
    tagline: "Corporate Lunch Platters & Executive Dining in Okhla",
    description: "Serving executive offices and corporate campuses across Okhla Phase 1, 2, and 3, plus Jasola District Centre and Sarita Vihar. Fast, tamper-proof corporate meal boxes and evening treats.",
    popularDishes: ["Dilli 6 Butter Chicken", "Corporate Lunch Platter", "Smoky Paneer Tikka", "Biryani Handi", "Cold Brew Coffee"],
    highlights: ["Speedy delivery to corporate tech parks", "Eco-friendly recyclable trays", "Bulk corporate billing"],
    landmarks: ["Okhla Phase 3 NSIC Metro", "Jasola District Centre", "Crown Plaza Okhla", "Sarita Vihar", "Modi Mill"],
    geo: { lat: 28.5355, lng: 77.2719 },
    faqs: [
      {
        q: "Do you deliver corporate lunch trays to Okhla Phase 3 IT companies?",
        a: "Yes, we service numerous tech firms in Okhla with punctual lunch and dinner orders."
      }
    ],
    nearbySlugs: ["greater-kailash", "lajpat-nagar", "saket", "noida-sector-18", "faridabad-nit"],
    reviews: [
      { author: "Naveen K., Okhla Phase 2", rating: 5, dish: "Corporate Lunch Platter", text: "On time delivery and very clean packaging. Perfect for busy office meetings." }
    ]
  },
  {
    slug: "model-town",
    name: "Model Town & Civil Lines (DU North)",
    shortName: "Model Town",
    zone: "North Delhi",
    city: "New Delhi",
    state: "Delhi",
    pincodes: ["110009", "110054"],
    avgDeliveryMinutes: "24-30",
    hub: "Hudson Lane Cloud Station",
    tagline: "North Campus Student Hangouts & Heritage Feasts",
    description: "Serving Delhi University North Campus colleges, Hudson Lane, Model Town 1-3, and Civil Lines. Indulge in cheesy pastas, loaded fries, authentic parathas, and rich gravies.",
    popularDishes: ["Crispy Kurkure Momos", "Loaded Cheese Fries", "Penne Arbiata", "Delhi Butter Chicken", "Belgian Waffle"],
    highlights: ["Direct drops to North Campus DU colleges", "Midnight delivery active till 2:30 AM", "Special college festival combos"],
    landmarks: ["Hudson Lane", "Model Town Metro", "Kamla Nagar Market", "Vishwavidyalaya Metro", "Civil Lines"],
    geo: { lat: 28.7032, lng: 77.1944 },
    faqs: [
      {
        q: "Can you deliver inside DU North Campus hostels and colleges?",
        a: "Yes! Our riders deliver to Stephen's, Hindu, SRCC, Miranda, and Kirori Mal gates."
      }
    ],
    nearbySlugs: ["pitampura", "rohini", "chandni-chowk", "karol-bagh", "connaught-place"],
    reviews: [
      { author: "Shruti A., DU North Campus", rating: 5, dish: "Kurkure Momos & Pasta", text: "Hudson lane cafe quality delivered to our hostel room in 22 minutes!" }
    ]
  },
  {
    slug: "paschim-vihar",
    name: "Paschim Vihar & Punjabi Bagh West",
    shortName: "Paschim Vihar",
    zone: "West Delhi",
    city: "New Delhi",
    state: "Delhi",
    pincodes: ["110063"],
    avgDeliveryMinutes: "24-30",
    hub: "Paschim Vihar Outer Ring Hub",
    tagline: "Family Feasts & Street Favourites in West Delhi",
    description: "Serving Paschim Vihar A, B, and BG Blocks, Jwala Heri Market, and Outer Ring Road societies. Generous portions, authentic flavours, and quick delivery right to your dining table.",
    popularDishes: ["Tandoori Malai Chaap", "Paneer Butter Masala", "Chur Chur Naan Thali", "Mango Thickshake", "Garlic Naan"],
    highlights: ["Hot delivery to residential societies", "Pure Desi Ghee tadka", "Generous portion sizes"],
    landmarks: ["Jwala Heri Market", "Radisson Blu Paschim Vihar", "Paschim Vihar East Metro", "Outer Ring Road", "Bhatia Park"],
    geo: { lat: 28.6692, lng: 77.0934 },
    faqs: [
      {
        q: "How fast is delivery to Paschim Vihar Block A & B?",
        a: "Average delivery time is 24 to 30 minutes from our local Outer Ring hub."
      }
    ],
    nearbySlugs: ["punjabi-bagh", "janakpuri", "rohini", "pitampura", "dwarka"],
    reviews: [
      { author: "Amanpreet S., Paschim Vihar Block A", rating: 5, dish: "Chur Chur Naan & Chaap", text: "Crispy chur chur naan with rich chole and chaap. Very satisfying!" }
    ]
  }
];

// Helper functions for dynamic resolution and internal linking graph
export function getAllMarketLocations() {
  return MARKET_LOCATIONS;
}

export function getMarketLocationBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = String(slug).toLowerCase().trim();
  return MARKET_LOCATIONS.find((loc) => loc.slug === cleanSlug);
}

export function getNearbyMarketLocations(slug, limit = 6) {
  const current = getMarketLocationBySlug(slug);
  if (!current) {
    return MARKET_LOCATIONS.slice(0, limit);
  }
  if (current.nearbySlugs && current.nearbySlugs.length > 0) {
    const nearby = current.nearbySlugs
      .map((s) => getMarketLocationBySlug(s))
      .filter(Boolean);
    if (nearby.length >= limit) return nearby.slice(0, limit);
    // Fill remaining from same zone or general list
    const remaining = MARKET_LOCATIONS.filter(
      (loc) => loc.slug !== current.slug && !current.nearbySlugs.includes(loc.slug)
    );
    return [...nearby, ...remaining].slice(0, limit);
  }
  return MARKET_LOCATIONS.filter((loc) => loc.slug !== current.slug).slice(0, limit);
}

export function getAllZones() {
  const zones = new Set(MARKET_LOCATIONS.map((loc) => loc.zone));
  return ["All Zones", ...Array.from(zones)];
}

export function getMarketLocationsByZone(zone) {
  if (!zone || zone === "All Zones") return MARKET_LOCATIONS;
  return MARKET_LOCATIONS.filter((loc) => loc.zone === zone);
}

