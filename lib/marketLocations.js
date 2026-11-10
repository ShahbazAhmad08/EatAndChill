// Comprehensive Multi-State Programmatic SEO Market Locations Dataset
// Featuring key hubs across Uttar Pradesh (UP), Delhi, Maharashtra, Karnataka, Bihar, West Bengal, MP, Rajasthan, and Haryana

export const MARKET_LOCATIONS = [
  // --- UTTAR PRADESH (UP) - Primary Focus ---
  {
    slug: "allahabad",
    name: "Allahabad (Prayagraj)",
    shortName: "Allahabad",
    zone: "Uttar Pradesh",
    city: "Allahabad",
    state: "Uttar Pradesh",
    pincodes: ["211001", "211002", "211003", "211006"],
    avgDeliveryMinutes: "25-30",
    hub: "Civil Lines Central Hub - Prayagraj",
    tagline: "Sangam City's Favorite Cloud Kitchen",
    description: "Craving sizzling rolls, authentic Mughlai gravies, crispy burgers, or loaded pizzas in Allahabad? Eat & Chill delivers piping hot meals straight to Civil Lines, Katra, Georgetown, and University campus in under 30 minutes.",
    popularDishes: ["Shahi Paneer Handi", "Crispy Kathi Roll", "Smoky Chicken Tikka", "Kulhad Chai & Bun Maska", "Gulab Jamun"],
    highlights: ["Express delivery to Civil Lines & Katra student hostels", "Tamper-proof sealed lunch trays", "Late-night delivery active till 1:30 AM"],
    landmarks: ["Civil Lines", "Katra Market", "Allahabad University", "Georgetown", "Subhash Chauraha", "Company Bagh"],
    geo: { lat: 25.4358, lng: 81.8463 },
    faqs: [
      {
        q: "How fast is food delivery in Allahabad (Prayagraj)?",
        a: "Our central Civil Lines cloud hub delivers to Katra, Georgetown, and University zones within 25 to 30 minutes using thermal insulated delivery bags."
      },
      {
        q: "Do you deliver to student hostels near Katra and University Road?",
        a: "Yes! We specialize in student-friendly meal combos and thalis with direct hostel gate delivery."
      },
      {
        q: "Can I pay using Cash on Delivery (COD) or UPI in Allahabad?",
        a: "Eat & Chill accepts Cash on Delivery (COD) as well as Google Pay, PhonePe, and Paytm across all covered Allahabad pincodes."
      }
    ],
    nearbySlugs: ["soraon", "mau-aima", "lucknow", "varanasi", "kanpur"],
    reviews: [
      { author: "Amitabh T., Civil Lines", rating: 5, dish: "Shahi Paneer & Naan", text: "Ordered for family dinner in Civil Lines. Arrived boiling hot in 22 mins. Rich gravy and soft rotis." },
      { author: "Pooja V., Katra", rating: 5, dish: "Crispy Kathi Roll", text: "Best rolls in Prayagraj! Flaky paratha and spicy smoky filling." }
    ]
  },
  {
    slug: "soraon",
    name: "Soraon (Allahabad)",
    shortName: "Soraon",
    zone: "Uttar Pradesh",
    city: "Soraon",
    state: "Uttar Pradesh",
    pincodes: ["212502"],
    avgDeliveryMinutes: "25-32",
    hub: "Soraon Express Delivery Kitchen",
    tagline: "Fresh, Hot Food Delivered in Soraon Town",
    description: "Delivering freshly cooked curries, warm stuffed parathas, crispy snacks, and beverages to homes, shops, and institutions across Soraon market and surrounding areas.",
    popularDishes: ["Special Maharaja Thali", "Paneer Butter Masala", "Crispy Kurkure Momos", "Cold Coffee Shake", "Tandoori Roti Combo"],
    highlights: ["Doorstep delivery across Soraon Main Market & Tehsil", "Hygienic prep with fresh dairy and vegetables", "Zero delivery charge on orders above ₹499"],
    landmarks: ["Soraon Tehsil", "Main Market Chauraha", "Prayagraj-Pratapgarh Highway", "Block Office", "Soraon Station Road"],
    geo: { lat: 25.5869, lng: 81.8542 },
    faqs: [
      {
        q: "Do you deliver across all residential areas of Soraon?",
        a: "Yes, our Soraon express unit covers Tehsil road, Market chauraha, and Highway colonies with 25-32 minute turnaround time."
      },
      {
        q: "Can I order large party combos in Soraon?",
        a: "Yes! Family feast boxes and party meal combos are available with special discount pricing."
      }
    ],
    nearbySlugs: ["allahabad", "mau-aima", "lucknow", "pratapgarh", "varanasi"],
    reviews: [
      { author: "Rajesh K., Soraon Market", rating: 5, dish: "Special Maharaja Thali", text: "Finally an authentic restaurant-grade delivery kitchen in Soraon. Very clean packaging." }
    ]
  },
  {
    slug: "mau-aima",
    name: "Mau Aima (Allahabad)",
    shortName: "Mau Aima",
    zone: "Uttar Pradesh",
    city: "Mau Aima",
    state: "Uttar Pradesh",
    pincodes: ["212507"],
    avgDeliveryMinutes: "25-32",
    hub: "Mau Aima Town Express Station",
    tagline: "Authentic Taste Delivered Fresh in Mau Aima",
    description: "Serving Mau Aima town with hygienic meals, authentic biryanis, soft naans, spicy rolls, and delicious milkshakes. Order online and receive hot doorstep delivery in 30 minutes.",
    popularDishes: ["Chicken Dum Biryani", "Paneer Tikka Roll", "Dal Tadka Bukhara", "Kulhad Lassi", "Garlic Butter Naan"],
    highlights: ["Covering Mau Aima Town, Textile Mandi & Railway Station", "Spill-proof insulated packaging", "Easy COD & UPI payment options"],
    landmarks: ["Mau Aima Mandi", "Station Road", "Town Chauraha", "Kasba Market", "Post Office Road"],
    geo: { lat: 25.7001, lng: 81.9167 },
    faqs: [
      {
        q: "How fast is delivery inside Mau Aima town?",
        a: "Orders reach residential and commercial locations in Mau Aima within 25 to 30 minutes from dispatch."
      }
    ],
    nearbySlugs: ["soraon", "allahabad", "pratapgarh", "lucknow", "varanasi"],
    reviews: [
      { author: "Mohd. Zaid, Mau Aima Kasba", rating: 5, dish: "Chicken Dum Biryani", text: "Long grain Basmati, tender chicken pieces, and fresh raita. Truly impressive for our town." }
    ]
  },
  {
    slug: "lucknow",
    name: "Lucknow (Hazratganj & Gomti Nagar)",
    shortName: "Lucknow",
    zone: "Uttar Pradesh",
    city: "Lucknow",
    state: "Uttar Pradesh",
    pincodes: ["226001", "226010", "226016", "226024"],
    avgDeliveryMinutes: "22-28",
    hub: "Hazratganj Central Gourmet Kitchen",
    tagline: "Nawabi Heritage Flavours, Delivered with Pride",
    description: "Experience the royal culinary magic of Awadh! From slow-cooked Awadhi Biryani to melt-in-mouth Galouti style rolls, rich gravies, and gourmet pizzas delivered across Hazratganj, Gomti Nagar, and Aliganj.",
    popularDishes: ["Awadhi Dum Biryani", "Melt-in-Mouth Galouti Roll", "Shahi Tukda", "Paneer Lababdar", "Zafrani Kheer"],
    highlights: ["Rapid delivery to Gomti Nagar corporate towers & residences", "Slow dum charcoal infusion for authentic aroma", "Active till 2:30 AM"],
    landmarks: ["Hazratganj Main Market", "Gomti Nagar Patrakarpuram", "Marine Drive Lucknow", "Lohia Park", "Aliganj Kapoorthala"],
    geo: { lat: 26.8467, lng: 80.9462 },
    faqs: [
      {
        q: "Do you deliver to offices in Gomti Nagar and Vibhuti Khand?",
        a: "Yes! We specialize in corporate lunch boxes and executive meals with doorstep delivery."
      }
    ],
    nearbySlugs: ["kanpur", "allahabad", "varanasi", "soraon", "noida-sector-18"],
    reviews: [
      { author: "Anurag S., Gomti Nagar", rating: 5, dish: "Awadhi Dum Biryani", text: "Authentic Lucknow taste, perfectly balanced spices and fragrant saffron rice." }
    ]
  },
  {
    slug: "noida-sector-18",
    name: "Noida (Sectors 18, 50, 62 & 137)",
    shortName: "Noida Hub",
    zone: "Uttar Pradesh",
    city: "Noida",
    state: "Uttar Pradesh",
    pincodes: ["201301", "201303", "201305", "201307"],
    avgDeliveryMinutes: "25-30",
    hub: "Noida Express Central Kitchen",
    tagline: "Speedy 30-Min Food Drops to Noida IT Parks & Societies",
    description: "Serving high-rise gated societies across Sector 50, 76, 137, and IT hubs in Sector 62 and Sector 18 (Atta). Enjoy delicious North Indian delicacies, wood-fired style pizzas, and Asian bowls delivered hot.",
    popularDishes: ["Butter Chicken Delite", "Crispy Kathi Rolls", "Smoky Paneer Tikka", "Cold Hazelnut Coffee", "Veg Loaded Pizza"],
    highlights: ["Express delivery to Noida Electronic City & Sector 62 IT Parks", "Late-night shifts covered till 2:30 AM", "Zero delivery charge above ₹499"],
    landmarks: ["DLF Mall of India", "Atta Market Sector 18", "Sector 62 IT Park", "Sector 50 Central Park", "Advant Navis Sector 142"],
    geo: { lat: 28.5708, lng: 77.3261 },
    faqs: [
      {
        q: "Do you deliver inside Noida high-rise apartment towers?",
        a: "Yes! Our riders deliver directly to society tower lobbies and corporate front desks."
      }
    ],
    nearbySlugs: ["connaught-place", "lucknow", "hauz-khas", "kanpur", "allahabad"],
    reviews: [
      { author: "Prashant T., Sector 62 Tech Park", rating: 5, dish: "Kathi Rolls & Coffee", text: "Our go-to late night coding snack. Super fast and always fresh!" }
    ]
  },
  {
    slug: "varanasi",
    name: "Varanasi (Kashi & Lanka)",
    shortName: "Varanasi",
    zone: "Uttar Pradesh",
    city: "Varanasi",
    state: "Uttar Pradesh",
    pincodes: ["221001", "221005", "221010"],
    avgDeliveryMinutes: "25-32",
    hub: "Sigra Express Delivery Kitchen",
    tagline: "Spiritual Capital's Most Loved Comfort Kitchen",
    description: "Serving BHU campus, Lanka, Assi Ghat, Sigra, and Godowlia. Savor pure vegetarian delicacies, rich thalis, piping hot momos, and chilled rabdi lassi delivered straight to your door.",
    popularDishes: ["Kashi Special Thali", "Banarasi Dum Aloo", "Paneer Butter Masala", "Kulhad Rabdi Lassi", "Crispy Veg Spring Rolls"],
    highlights: ["Pure vegetarian kitchen section", "Direct delivery to BHU campus hostel gates", "Clean tamper-evident packaging"],
    landmarks: ["BHU Lanka Gate", "Assi Ghat", "Sigra Mall", "Godowlia Chauraha", "Cantt Station Road"],
    geo: { lat: 25.3176, lng: 82.9739 },
    faqs: [
      {
        q: "Do you deliver to student hostels inside BHU?",
        a: "Yes! We coordinate directly with BHU hostel gates for seamless handovers."
      }
    ],
    nearbySlugs: ["allahabad", "soraon", "lucknow", "patna", "kanpur"],
    reviews: [
      { author: "Shweta P., BHU Campus", rating: 5, dish: "Kashi Special Thali", text: "Clean, homely, and very generous portions. Lifesaver during exam season." }
    ]
  },
  {
    slug: "kanpur",
    name: "Kanpur (Civil Lines & Swaroop Nagar)",
    shortName: "Kanpur",
    zone: "Uttar Pradesh",
    city: "Kanpur",
    state: "Uttar Pradesh",
    pincodes: ["208001", "208002", "208016"],
    avgDeliveryMinutes: "24-30",
    hub: "Swaroop Nagar Cloud Kitchen",
    tagline: "Industrial Capital's Favorite Food Hub",
    description: "Serving foodies across Swaroop Nagar, Civil Lines, Mall Road, and Kakadeo coaching hub. Delicious rolls, tandoori treats, burgers, and rich thalis delivered warm in 30 minutes.",
    popularDishes: ["Crispy Paneer Tikka Roll", "Special Student Thali", "Butter Chicken Bowl", "Cold Coffee Shake", "Farmhouse Pizza"],
    highlights: ["Speedy drops near Kakadeo coaching centres", "Affordable meal combos", "Late night delivery active till 1:30 AM"],
    landmarks: ["Z Square Mall", "Swaroop Nagar Market", "Civil Lines Kanpur", "Kakadeo Coaching Hub", "Moti Jheel"],
    geo: { lat: 26.4499, lng: 80.3319 },
    faqs: [
      {
        q: "What is the average delivery time in Swaroop Nagar?",
        a: "Most orders reach within 20 to 25 minutes from our Swaroop Nagar kitchen."
      }
    ],
    nearbySlugs: ["lucknow", "allahabad", "soraon", "noida-sector-18", "varanasi"],
    reviews: [
      { author: "Deepak G., Kakadeo", rating: 5, dish: "Student Thali & Roll", text: "Very tasty and pocket-friendly for students. Hot delivery on time." }
    ]
  },

  // --- DELHI (Selected 4 Top Hubs) ---
  {
    slug: "connaught-place",
    name: "Connaught Place (CP)",
    shortName: "Connaught Place",
    zone: "Delhi",
    city: "New Delhi",
    state: "Delhi",
    pincodes: ["110001", "110002"],
    avgDeliveryMinutes: "20-28",
    hub: "Barakhamba Central Cloud Kitchen",
    tagline: "Heart of the Capital's Foodies & Corporate Dining",
    description: "Craving sizzling rolls, crispy hand-tossed pizzas, or rich handi gravies in Connaught Place? Eat & Chill delivers piping hot meals straight to Inner & Outer Circle, Barakhamba corporate towers, and Janpath in under 30 minutes.",
    popularDishes: ["Dilli 6 Butter Chicken", "Old Delhi Shahi Paneer", "Crispy Delhi Rolls", "Kulhad Masala Chai", "Paneer Tikka Roll"],
    highlights: ["Express delivery to corporate towers & Janpath offices", "Tamper-proof insulated office lunch trays", "Mid-day & late-night express drop till 2 AM"],
    landmarks: ["Inner Circle", "Outer Circle", "Barakhamba Road", "Janpath", "Kasturba Gandhi Marg", "Shivaji Stadium"],
    geo: { lat: 28.6315, lng: 77.2167 },
    faqs: [
      {
        q: "How fast is food delivery in Connaught Place (CP)?",
        a: "Our central cloud kitchen delivers to both Inner and Outer circle buildings within 20 to 28 minutes using thermal insulated delivery bags."
      }
    ],
    nearbySlugs: ["hauz-khas", "saket", "dwarka", "noida-sector-18", "gurugram-cyber-city"],
    reviews: [
      { author: "Aditya S., KG Marg", rating: 5, dish: "Dilli 6 Butter Chicken", text: "Ordered for our office lunch rush at Barakhamba. Reached hot within 22 minutes! Rich gravy." }
    ]
  },
  {
    slug: "hauz-khas",
    name: "Hauz Khas & HKV",
    shortName: "Hauz Khas",
    zone: "Delhi",
    city: "New Delhi",
    state: "Delhi",
    pincodes: ["110016"],
    avgDeliveryMinutes: "25-30",
    hub: "South Delhi Express Hub - Green Park",
    tagline: "Vibrant Food Hub for IITians, Party Lovers & Cafes",
    description: "From late-night study sessions near IIT Delhi to after-party cravings around Hauz Khas Village, Eat & Chill is your favorite cloud kitchen for gourmet burgers, authentic rolls, and creamy pasta.",
    popularDishes: ["Tandoori Chaap", "Delhi Street Hakka Noodles", "Crispy Paneer Burger", "Nutella Waffles", "Makhani Momos"],
    highlights: ["Midnight delivery active till 3:00 AM", "Special college student discounts", "Eco-friendly packaging"],
    landmarks: ["Hauz Khas Village", "IIT Delhi Campus", "Green Park Market", "Aurobindo Market", "SDA Market"],
    geo: { lat: 28.5494, lng: 77.2001 },
    faqs: [
      {
        q: "Is late-night food delivery available in Hauz Khas Village & SDA?",
        a: "Yes, our kitchen operates until 3:00 AM every night for late night study hours and party cravings."
      }
    ],
    nearbySlugs: ["connaught-place", "saket", "dwarka", "gurugram-cyber-city", "noida-sector-18"],
    reviews: [
      { author: "Rohan V., IIT Delhi Hostel", rating: 5, dish: "Makhani Momos & Burger", text: "Life saver during exams. 2 AM delivery was smoking hot." }
    ]
  },
  {
    slug: "saket",
    name: "Saket & Malviya Nagar",
    shortName: "Saket",
    zone: "Delhi",
    city: "New Delhi",
    state: "Delhi",
    pincodes: ["110017"],
    avgDeliveryMinutes: "25-30",
    hub: "Saket Metro Kitchen Station",
    tagline: "Premium Tastes Delivered to Select CityWalk & Societies",
    description: "Serving Select CityWalk shoppers, Press Enclave societies, and Malviya Nagar residences. Enjoy 100% fresh, hygienic curries, thalis, pizzas, and artisan desserts at honest prices.",
    popularDishes: ["Dal Makhani Bukhara Style", "Paneer Tikka Roll", "Farmhouse Loaded Pizza", "Gulab Jamun", "Soya Malai Chaap"],
    highlights: ["Fast drops across Saket District Centre", "100% spill-proof microwave-friendly containers", "Live order tracking"],
    landmarks: ["Select CityWalk", "DLF Avenue Saket", "Press Enclave", "Malviya Nagar Market", "Max Hospital"],
    geo: { lat: 28.5244, lng: 77.2167 },
    faqs: [
      {
        q: "What is the delivery fee for Saket & Malviya Nagar?",
        a: "Standard delivery is ₹50, and all orders above ₹499 enjoy 100% FREE doorstep delivery."
      }
    ],
    nearbySlugs: ["hauz-khas", "connaught-place", "dwarka", "gurugram-cyber-city", "noida-sector-18"],
    reviews: [
      { author: "Pooja M., Saket J-Block", rating: 5, dish: "Dal Makhani & Naan", text: "Creamy and slow-cooked to perfection. Arrived in 25 mins." }
    ]
  },
  {
    slug: "dwarka",
    name: "Dwarka Sub-City",
    shortName: "Dwarka",
    zone: "Delhi",
    city: "New Delhi",
    state: "Delhi",
    pincodes: ["110075", "110077", "110078"],
    avgDeliveryMinutes: "28-35",
    hub: "Dwarka Sector 12 Cloud Hub",
    tagline: "Sub-City's Most Trusted Family Cloud Kitchen",
    description: "From Sector 1 to Sector 23, Eat & Chill is Dwarka's highest-rated cloud kitchen for hygienic family dinners, budget thalis, rolls, and weekend feast boxes.",
    popularDishes: ["Special Maharaja Thali", "Kadhai Paneer", "Amritsari Kulcha with Chole", "Mango Lassi", "Veg Supreme Pizza"],
    highlights: ["Complete coverage across all 23 Dwarka sectors", "Family meal combos and pocket thalis", "No minimum order requirement"],
    landmarks: ["Vegas Mall Sector 14", "Dwarka Sector 12 Metro", "Sector 6 Central Market", "Sector 21 Terminal", "Sector 10 DDA Park"],
    geo: { lat: 28.5921, lng: 77.046 },
    faqs: [
      {
        q: "Which sectors of Dwarka are covered?",
        a: "We deliver across all sectors 1 to 23 of Dwarka with typical 28 to 35-minute doorstep service."
      }
    ],
    nearbySlugs: ["connaught-place", "hauz-khas", "saket", "gurugram-cyber-city", "noida-sector-18"],
    reviews: [
      { author: "Kavita R., Sector 19 Dwarka", rating: 5, dish: "Special Maharaja Thali", text: "Generous portions, warm rotis, and incredible paneer gravy." }
    ]
  },

  // --- MAHARASHTRA ---
  {
    slug: "mumbai-bandra",
    name: "Mumbai (Bandra & Andheri)",
    shortName: "Mumbai",
    zone: "Maharashtra",
    city: "Mumbai",
    state: "Maharashtra",
    pincodes: ["400050", "400053", "400058"],
    avgDeliveryMinutes: "25-32",
    hub: "Bandra West Cloud Kitchen Hub",
    tagline: "Maximum City's Flavorful Street Feasts & Gourmet Dining",
    description: "Serving Bandra West, Pali Hill, Linking Road, and Andheri West. Delicious Kathi rolls, spicy pav bhaji, Mughlai gravies, and Italian pastas delivered fast across Mumbai suburbs.",
    popularDishes: ["Mumbai Masala Roll", "Butter Chicken Delite", "Truffle Pasta", "Nutella Waffle", "Cold Hazelnut Brew"],
    highlights: ["Express delivery across Bandra & Andheri West", "Late night active till 3:00 AM", "Eco-friendly recyclable containers"],
    landmarks: ["Linking Road Bandra", "Pali Hill", "Lokhandwala Complex", "Bandra Kurla Complex (BKC)", "Carter Road"],
    geo: { lat: 19.0596, lng: 72.8295 },
    faqs: [
      {
        q: "How fast is delivery in Bandra & Andheri?",
        a: "Average transit time from our Bandra kitchen hub is 25 to 30 minutes."
      }
    ],
    nearbySlugs: ["pune", "bengaluru", "allahabad", "connaught-place", "lucknow"],
    reviews: [
      { author: "Karan M., Bandra West", rating: 5, dish: "Mumbai Masala Roll", text: "Super fresh, not greasy at all. Arrived fast at Carter Road!" }
    ]
  },
  {
    slug: "pune",
    name: "Pune (Kothrud & Viman Nagar)",
    shortName: "Pune",
    zone: "Maharashtra",
    city: "Pune",
    state: "Maharashtra",
    pincodes: ["411038", "411014", "411004"],
    avgDeliveryMinutes: "25-30",
    hub: "FC Road Central Kitchen",
    tagline: "Youthful City's Favorite Late-Night Dining Spot",
    description: "Serving students and IT professionals across FC Road, Kothrud, Viman Nagar, and Hinjewadi. Hearty thalis, kurkure momos, artisanal pizzas, and thickshakes delivered in under 30 minutes.",
    popularDishes: ["Paneer Butter Masala", "Kurkure Momos", "Peri Peri Loaded Fries", "Belgian Chocolate Shake", "Cheese Corn Pizza"],
    highlights: ["Special student budget passes", "Midnight delivery till 2:30 AM", "Fast delivery to IT parks"],
    landmarks: ["Fergusson College Road", "Viman Nagar Phoenix Mall", "Kothrud Stand", "Hinjewadi Phase 1", "Deccan Gymkhana"],
    geo: { lat: 18.5204, lng: 73.8567 },
    faqs: [
      {
        q: "Do you deliver to student hostels near FC Road?",
        a: "Yes! Direct hostel gate delivery is available with live order tracking."
      }
    ],
    nearbySlugs: ["mumbai-bandra", "bengaluru", "lucknow", "allahabad", "connaught-place"],
    reviews: [
      { author: "Tanmay D., Viman Nagar", rating: 5, dish: "Kurkure Momos & Shake", text: "Crispy and spicy, perfect for midnight cravings." }
    ]
  },

  // --- KARNATAKA ---
  {
    slug: "bengaluru",
    name: "Bengaluru (Koramangala & Indiranagar)",
    shortName: "Bengaluru",
    zone: "Karnataka",
    city: "Bengaluru",
    state: "Karnataka",
    pincodes: ["560034", "560038", "560001"],
    avgDeliveryMinutes: "22-28",
    hub: "Koramangala 5th Block Hub",
    tagline: "Tech Capital's Favorite High-Speed Cloud Bites",
    description: "Serving startup founders and developers across Koramangala, Indiranagar, MG Road, and HSR Layout. Savor authentic North Indian thalis, artisan burgers, rolls, and cold brews delivered in record time.",
    popularDishes: ["Shahi Paneer Thali", "Chicken Tikka Kathi Roll", "Smoked Cold Brew", "Penne Alfredo", "Oreo Brownie Shake"],
    highlights: ["Fast desk drops to tech co-working spaces", "Late-night shifts active till 3:00 AM", "Eco-friendly zero-plastic packaging"],
    landmarks: ["Koramangala Sony World Signal", "100ft Road Indiranagar", "HSR Layout Sector 1", "MG Road Metro", "Church Street"],
    geo: { lat: 12.9352, lng: 77.6245 },
    faqs: [
      {
        q: "Do you deliver to co-working spaces in Koramangala?",
        a: "Yes! Direct desk delivery with tamper-proof seal is available."
      }
    ],
    nearbySlugs: ["mumbai-bandra", "pune", "allahabad", "lucknow", "connaught-place"],
    reviews: [
      { author: "Siddharth N., Koramangala", rating: 5, dish: "Chicken Tikka Kathi Roll", text: "Best rolls in Koramangala. 20 mins flat delivery." }
    ]
  },

  // --- BIHAR ---
  {
    slug: "patna",
    name: "Patna (Boring Road & Kankarbagh)",
    shortName: "Patna",
    zone: "Bihar",
    city: "Patna",
    state: "Bihar",
    pincodes: ["800001", "800020", "800013"],
    avgDeliveryMinutes: "25-32",
    hub: "Boring Road Express Station",
    tagline: "Capital's Premier Hygienic Food Delivery Hub",
    description: "Serving students and families across Boring Road, Kankarbagh, Fraser Road, and Bailey Road. Enjoy rich Mughlai curries, crisp kathi rolls, Chinese bowls, and thalis delivered steaming hot.",
    popularDishes: ["Special Maharaja Thali", "Kadhai Paneer Handi", "Crispy Veg Kathi Roll", "Chowmein Manchurian Combo", "Gulab Jamun"],
    highlights: ["Covers major coaching hubs near Boring Road", "Pure Desi Ghee preparations", "Reliable COD and instant UPI payment"],
    landmarks: ["Boring Road Chauraha", "Kankarbagh Colony", "Dak Bunglow Chauraha", "Gandhi Maidan", "Bailey Road"],
    geo: { lat: 25.5941, lng: 85.1376 },
    faqs: [
      {
        q: "What is the delivery time across Boring Road and Kankarbagh?",
        a: "Most orders reach within 25 to 30 minutes straight from our central kitchen."
      }
    ],
    nearbySlugs: ["varanasi", "allahabad", "lucknow", "kolkata", "kanpur"],
    reviews: [
      { author: "Ravi Shankar, Boring Road", rating: 5, dish: "Special Maharaja Thali", text: "Very delicious and clean. Reminded me of five-star hotel taste in Patna." }
    ]
  },

  // --- WEST BENGAL ---
  {
    slug: "kolkata",
    name: "Kolkata (Park Street & Salt Lake)",
    shortName: "Kolkata",
    zone: "West Bengal",
    city: "Kolkata",
    state: "West Bengal",
    pincodes: ["700016", "700091", "700064"],
    avgDeliveryMinutes: "25-30",
    hub: "Park Street Heritage Kitchen",
    tagline: "City of Joy's Ultimate Cravings Delivered",
    description: "Serving Park Street, Salt Lake Sector 5 IT hub, New Town, and Ballygunge. Enjoy legendary Kolkata style rolls, Mughlai biryanis, Hakka noodles, and gourmet cakes delivered hot and fresh.",
    popularDishes: ["Kolkata Kathi Roll", "Mughlai Chicken Biryani", "Chilli Chicken Hakka Combo", "Firni", "Chocolate Truffle Cake"],
    highlights: ["Signature paratha wrap rolls", "Express drops to Salt Lake Sector 5 offices", "Late night active till 2:00 AM"],
    landmarks: ["Park Street", "Salt Lake Sector 5", "New Town Eco Park", "Ballygunge Phari", "Camac Street"],
    geo: { lat: 22.5535, lng: 88.3512 },
    faqs: [
      {
        q: "How fast is delivery to Salt Lake Sector 5 IT offices?",
        a: "Average transit time is 22 to 28 minutes to all major IT tech parks."
      }
    ],
    nearbySlugs: ["patna", "varanasi", "allahabad", "lucknow", "bengaluru"],
    reviews: [
      { author: "Debanjan S., Salt Lake Sec 5", rating: 5, dish: "Kolkata Kathi Roll", text: "Crispy, generous filling, and true authentic Kolkata roll taste." }
    ]
  },

  // --- MADHYA PRADESH (MP) ---
  {
    slug: "bhopal",
    name: "Bhopal (MP Nagar & Arera Colony)",
    shortName: "Bhopal",
    zone: "Madhya Pradesh",
    city: "Bhopal",
    state: "Madhya Pradesh",
    pincodes: ["462011", "462016", "462001"],
    avgDeliveryMinutes: "25-30",
    hub: "MP Nagar Zone 1 Kitchen Hub",
    tagline: "City of Lakes' Favorite Fast Dining Kitchen",
    description: "Serving MP Nagar, Arera Colony, New Market, and Kolar Road. Pure vegetarian feasts, royal gravies, burgers, and pizzas delivered warm in 30 minutes.",
    popularDishes: ["Paneer Lababdar", "Special Dal Makhani", "Tandoori Malai Chaap", "Cold Coffee Flask", "Chur Chur Naan"],
    highlights: ["Speedy delivery across commercial MP Nagar", "Pure ghee preparation", "Spill-proof packaging"],
    landmarks: ["MP Nagar Zone 1 & 2", "Arera Colony", "DB City Mall", "New Market", "Upper Lake VIP Road"],
    geo: { lat: 23.2599, lng: 77.4126 },
    faqs: [
      {
        q: "Do you deliver to Arera Colony and MP Nagar?",
        a: "Yes, our central kitchen hub delivers to both areas within 25 minutes."
      }
    ],
    nearbySlugs: ["indore", "kanpur", "allahabad", "lucknow", "jaipur"],
    reviews: [
      { author: "Manish V., MP Nagar", rating: 5, dish: "Paneer Lababdar & Naan", text: "Rich flavor and delivered steaming hot." }
    ]
  },
  {
    slug: "indore",
    name: "Indore (Vijay Nagar & Chhappan)",
    shortName: "Indore",
    zone: "Madhya Pradesh",
    city: "Indore",
    state: "Madhya Pradesh",
    pincodes: ["452010", "452001", "452009"],
    avgDeliveryMinutes: "22-28",
    hub: "Vijay Nagar Express Hub",
    tagline: "Food Capital of Central India's Express Kitchen",
    description: "Serving India's cleanest city! From Vijay Nagar to Palasia and Chhappan Dukaan surroundings. Relish chatpata street treats, wholesome thalis, and gourmet shakes with guaranteed 30-min delivery.",
    popularDishes: ["Special Maharaja Thali", "Crispy Kurkure Momos", "Paneer Tikka Roll", "Oreo Hazelnut Shake", "Chilli Garlic Noodles"],
    highlights: ["Cleanest cloud kitchen standards", "Night owl delivery operational till 2:30 AM", "Free delivery above ₹499"],
    landmarks: ["Vijay Nagar C21 Mall", "Chhappan Dukan", "Old Palasia", "Treasure Island Mall", "Rajwada Market"],
    geo: { lat: 22.7533, lng: 75.8937 },
    faqs: [
      {
        q: "How fast is delivery to Vijay Nagar?",
        a: "Orders reach in 20 to 25 minutes from our central Vijay Nagar hub."
      }
    ],
    nearbySlugs: ["bhopal", "mumbai-bandra", "jaipur", "kanpur", "allahabad"],
    reviews: [
      { author: "Ankita J., Vijay Nagar", rating: 5, dish: "Special Maharaja Thali", text: "Indore food standards are high, and Eat & Chill passed with flying colors!" }
    ]
  },

  // --- RAJASTHAN ---
  {
    slug: "jaipur",
    name: "Jaipur (C-Scheme & Malviya Nagar)",
    shortName: "Jaipur",
    zone: "Rajasthan",
    city: "Jaipur",
    state: "Rajasthan",
    pincodes: ["302001", "302017", "302015"],
    avgDeliveryMinutes: "25-30",
    hub: "MI Road Heritage Kitchen",
    tagline: "Pink City's Royal Gastronomy Delivered Hot",
    description: "Serving C-Scheme, Malviya Nagar, Raja Park, and Mansarovar. Indulge in authentic Dal Baati style royal platters, spicy kathi rolls, wood-fired style pizzas, and rich desserts.",
    popularDishes: ["Royal Thali Platter", "Paneer Butter Masala", "Kathi Roll Special", "Kulhad Masala Chai", "Gulab Jamun"],
    highlights: ["Doorstep drop in C-Scheme and Malviya Nagar", "Desi Ghee aroma", "Fast 30-minute delivery promise"],
    landmarks: ["C-Scheme Statue Circle", "World Trade Park (WTP) Malviya Nagar", "Raja Park Main Market", "MI Road", "Mansarovar Metro"],
    geo: { lat: 26.9124, lng: 75.7873 },
    faqs: [
      {
        q: "Do you deliver to Malviya Nagar and C-Scheme?",
        a: "Yes, both areas are covered with 25-30 minute delivery."
      }
    ],
    nearbySlugs: ["gurugram-cyber-city", "connaught-place", "bhopal", "indore", "allahabad"],
    reviews: [
      { author: "Raghav S., C-Scheme", rating: 5, dish: "Royal Thali Platter", text: "Royal taste and fresh ghee aroma. Arrived very hot." }
    ]
  },

  // --- HARYANA ---
  {
    slug: "gurugram-cyber-city",
    name: "Gurugram Cyber City & Golf Course Road",
    shortName: "Gurugram",
    zone: "Haryana",
    city: "Gurugram",
    state: "Haryana",
    pincodes: ["122002", "122009", "122011"],
    avgDeliveryMinutes: "22-28",
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
    nearbySlugs: ["connaught-place", "hauz-khas", "dwarka", "noida-sector-18", "jaipur"],
    reviews: [
      { author: "Vikram N., CyberHub Building 10", rating: 5, dish: "Chicken Tikka Roll & Shake", text: "Arrived in 20 mins right to our 7th floor lobby. Impressive packaging and taste." }
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
    const remaining = MARKET_LOCATIONS.filter(
      (loc) => loc.slug !== current.slug && !current.nearbySlugs.includes(loc.slug)
    );
    return [...nearby, ...remaining].slice(0, limit);
  }
  return MARKET_LOCATIONS.filter((loc) => loc.slug !== current.slug).slice(0, limit);
}

export function getAllZones() {
  const zones = new Set(MARKET_LOCATIONS.map((loc) => loc.zone));
  return ["All States / Regions", ...Array.from(zones)];
}

export function getMarketLocationsByZone(zone) {
  if (!zone || zone === "All States / Regions" || zone === "All Zones") return MARKET_LOCATIONS;
  return MARKET_LOCATIONS.filter((loc) => loc.zone === zone);
}
