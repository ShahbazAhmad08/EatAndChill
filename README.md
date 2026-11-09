# Eat & Chill - Delhi NCR Online Food Delivery & Admin Platform

A modern, full-stack **Next.js 14 (App Router)** cloud kitchen food ordering and restaurant management platform specially crafted and SEO-optimized for **Delhi NCR**.

---

## 🌟 Key Features & Architecture

### 1. Unified Next.js 14 App Router
- Full-stack unified architecture completely replacing the legacy separate `admin`, `backend`, and `frontend` folders.
- Server-side Rendering (SSR), Static Generation (SSG), and Dynamic API routes (`app/api/...`).
- Zero reload, fast client-side navigation with React 18, Tailwind CSS, and Lucide icons.

### 2. High-Performance Delhi NCR SEO Optimization
- **Programmatic Locality Pages**: Pre-rendered SSG landing pages for 12+ Delhi NCR neighborhoods:
  - `/delhi-delivery/connaught-place`
  - `/delhi-delivery/hauz-khas`
  - `/delhi-delivery/saket`
  - `/delhi-delivery/greater-kailash`
  - `/delhi-delivery/dwarka`
  - `/delhi-delivery/rohini`
  - `/delhi-delivery/karol-bagh`
  - `/delhi-delivery/vasant-kunj`
  - `/delhi-delivery/mayur-vihar`
  - `/delhi-delivery/punjabi-bagh`
  - `/delhi-delivery/chandni-chowk`
  - `/delhi-delivery/lajpat-nagar`
- **Dedicated Dish Detail Pages (`/dish/[id]`)**:
  - Full Google `Product` and `MenuItem` JSON-LD Schemas.
  - Live inventory stock check (`InStock` / `OutOfStock`), spice meters, and allergens.
- **Structured Data (JSON-LD)**:
  - `Restaurant` & `LocalBusiness` Schema for Delhi cloud kitchen.
  - `FAQPage` Schema for Google Search rich snippets.
- **Dynamic Automated Sitemap (`/sitemap.xml`)**: Real-time indexing of all dynamic dishes and Delhi localities directly from MongoDB.
- **Interactive Pincode Checker**: Validates 6-digit Delhi pincodes (`110001` - `110099`) with instant delivery turnaround feedback.

### 3. Comprehensive Admin Control Center (`/admin`)
- **Dashboard Overview (`/admin`)**: Real-time revenue analytics, order status distribution, active dishes, and user metrics.
- **Food & Inventory Management (`/admin/items` & `/admin/add`)**:
  - Add, edit prices, and delete dishes.
  - **Instant Out-of-Stock Toggle**: Mark dishes Sold Out / In Stock in 1-click.
  - Pure Veg badge and Delhi Speciality highlights.
  - **Cloudinary Image Upload**: Direct cloud image uploading with local storage fallback.
- **Category Manager (`/admin/categories`)**: Add, list, and delete food categories with custom icons.
- **Promo Coupons Management (`/admin/coupons`)**:
  - Create `FLAT` discount (e.g. ₹100 off) or `PERCENT` discount (e.g. 20% off).
  - Minimum order amount threshold and expiration date validation.
  - Live coupon applicator on user cart (`/cart`).
- **Kitchen Dispatch & Thermal KOT (`/admin/orders`)**:
  - **Printable 80mm Thermal KOT / Tax Invoice**: Instant one-click receipt printing for kitchen staff and rider delivery slips.
  - **Live Order Sound Alert (Kitchen Bell 🔔)**: Web Audio synthesized bell alert on new incoming orders with Mute/Unmute toggle.
  - Status updates (`Food processing`, `Out for delivery`, `Delivered`, `Cancelled`).
  - Toggle payment verification status (`Paid` / `Unpaid`).
- **Store Settings & Payment Gateways (`/admin/settings`)**:
  - **Stripe**: Enable/Disable card checkout, customize Stripe Secret & Publishable keys.
  - **Cash on Delivery (COD)**: Toggle COD on/off with 1-click.
  - **UPI / QR Payments**: Toggle UPI on/off and configure store VPA (e.g. `eatandchill@okhdfcbank`).
  - **Cloudinary Keys**: Configure Cloud Name, API Key, and API Secret directly from the UI.
  - **Delivery Rules**: Configurable delivery fee and Free Delivery threshold.
  - **Announcement Bar**: Top banner broadcast ticker for live discounts and notices.

### 4. Customer Experience (UX)
- **GPS "Auto-Detect Location"**: Automatically detects customer's Delhi address and pincode via browser Geolocation + reverse geocoding on checkout.
- **Visual 4-Step Order Tracking**: Real-time tracking through `Order Placed` ➔ `In Kitchen` ➔ `Out for Delivery` ➔ `Delivered`.
- **1-Click WhatsApp Live Support**: Direct pre-filled WhatsApp communication with kitchen manager containing order #ID.
- **Dietary Filter Pills**: Filter instantly by `Pure Veg` or `Delhi Specials`.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables (`.env`)
```env
PORT=3000
MONGODB_URI=mongodb+srv://sa798027:ks9inW6pDV7JOy7m@cluster0.bgatlhp.mongodb.net/eat-and-chill?retryWrites=true&w=majority
JWT_SECRET=eatandchill_super_secure_jwt_secret_delhi_2024_xyz
ADMIN_EMAIL=admin@eatandchill.com
ADMIN_PASSWORD=adminpassword123
STRIPE_SECRET_KEY=sk_test_51...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Run in Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🔐 Admin Credentials

Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login):
- **Email**: `admin@eatandchill.com`
- **Password**: `adminpassword123`

*(Can be updated in `.env` and `/admin/settings`)*

---

## 📂 Project Directory Structure

```
EatAndChill/
├── app/                        # Next.js 14 App Router
│   ├── layout.js               # Root layout (SEO, metadata, navbar, footer)
│   ├── page.js                 # Home page (Hero, Categories, Food Grid, Delhi Guide)
│   ├── dish/[id]/page.js       # Dedicated SEO dish detail page (Product Schema)
│   ├── delhi-delivery/         # Delhi Delivery Network directory
│   │   ├── page.js             # Overview & Pincode coverage
│   │   └── [locality]/page.js  # 12+ Hyper-local Delhi SSG pages (LocalBusiness Schema)
│   ├── cart/page.js            # Cart & Dynamic Promo Coupon application
│   ├── place-order/page.js     # Checkout, GPS Auto-detect, Stripe/COD/UPI selection
│   ├── verify/page.js          # Payment verification callback
│   ├── myorders/page.js        # 4-step live kitchen timeline & WhatsApp support
│   ├── sitemap.js              # Dynamic MongoDB + Locality sitemap
│   ├── robots.js               # Robots.txt generator
│   ├── api/                    # 20+ Unified Full-stack Next.js API routes
│   └── admin/                  # Complete Admin Portal
│       ├── page.js             # Dashboard & Analytics
│       ├── items/page.js       # Food items & Out-of-Stock toggles
│       ├── add/page.js         # Add dish with Cloudinary / local uploads
│       ├── categories/page.js  # Category management
│       ├── coupons/page.js     # Promo coupon manager
│       ├── orders/page.js      # Kitchen orders, Thermal KOT Print & Audio bell
│       └── settings/page.js    # Gateway toggles, Cloudinary, UPI, Delivery rules
├── components/                 # UI components (Navbar, Footer, FoodDisplay, etc.)
├── context/StoreContext.jsx    # Global client state (cart, auth, settings)
├── lib/                        # DB connection, models, JWT & Delhi locality data
├── public/                     # Static assets, uploads & icons
└── tailwind.config.js          # Tailwind CSS styling
```
