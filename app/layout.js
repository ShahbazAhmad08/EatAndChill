import "./globals.css";
import { StoreContextProvider } from "@/context/StoreContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import WhatsAppOrderFloating from "@/components/WhatsAppOrderFloating";
import PageTransition from "@/components/PageTransition";
import CinematicLoader from "@/components/CinematicLoader";
import RouteProgressBar from "@/components/RouteProgressBar";
import { Toaster } from "react-hot-toast";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  title: {
    default: "REAL BROTHER'S RESTAURANT | Ghar Jaisa Swad - Sector 73, Sarfabad, Noida",
    template: "%s | REAL BROTHER'S RESTAURANT",
  },
  description:
    "Order online from Real Brother's Restaurant (Estd. 2024) in Sarfabad, Sector 73 Noida! Authentic North Indian handi curries, Kathi Rolls, Momos, Dal Makhani, Biryanis, and Chinese. Express 25-30 min delivery. Cash on Delivery & UPI accepted.",
  keywords: [
    "real brothers restaurant",
    "real brother restaurant noida",
    "food delivery sector 73 noida",
    "sarfabad restaurant",
    "ghar jaisa swad",
    "best rolls in noida",
    "kathi rolls online noida",
    "paneer tikka delivery",
    "momos delivery sector 73",
    "tandoori roti delivery noida",
  ],
  authors: [{ name: "REAL BROTHER'S RESTAURANT" }],
  creator: "REAL BROTHER'S RESTAURANT",
  publisher: "REAL BROTHER'S RESTAURANT",
  icons: {
    icon: "/images/logo-square.jpg",
    apple: "/images/logo-square.jpg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "http://localhost:3000",
    title: "REAL BROTHER'S RESTAURANT | Ghar Jaisa Swad",
    description:
      "Order hot & fresh home-style food online in Sarfabad, Sector 73 Noida with express 25-30 min delivery.",
    siteName: "REAL BROTHER'S RESTAURANT",
    images: [
      {
        url: "/images/logo-square.jpg",
        width: 720,
        height: 720,
        alt: "REAL BROTHER'S RESTAURANT Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "REAL BROTHER'S RESTAURANT | Ghar Jaisa Swad",
    description:
      "Delicious food delivered in 25-30 minutes to Sector 73, 74 & 76 Noida. Order now with COD & UPI!",
    images: ["/images/logo-square.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "REAL BROTHER'S RESTAURANT",
    image: "http://localhost:3000/images/logo-square.jpg",
    description:
      "Authentic home-style North Indian, Chinese and Tandoori restaurant in Sarfabad, Sector 73 Noida serving Ghar Jaisa Swad.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Gali Number 5, Vishal, Sarfabad Village, Sector 73",
      addressLocality: "Noida",
      addressRegion: "Uttar Pradesh",
      postalCode: "201301",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.583,
      longitude: 77.388,
    },
    telephone: "+91-7827118412",
    servesCuisine: ["North Indian", "Chinese", "Mughlai", "Fast Food", "Rolls", "Momos"],
    priceRange: "₹₹",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "24:00",
      },
    ],
    sameAs: ["https://share.google/UPOhBCowyPZ07exvK"],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col justify-between bg-white text-gray-900 font-sans">
        <StoreContextProvider>
          <CinematicLoader />
          <RouteProgressBar />
          <Toaster position="top-center" reverseOrder={false} />
          <Navbar />
          <LoginModal />
          <main className="flex-1 w-full max-w-full overflow-x-hidden">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <WhatsAppOrderFloating />
        </StoreContextProvider>
      </body>
    </html>
  );
}
