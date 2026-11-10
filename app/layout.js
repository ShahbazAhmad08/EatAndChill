import "./globals.css";
import { StoreContextProvider } from "@/context/StoreContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import { Toaster } from "react-hot-toast";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://eatandchill.com"),
  title: {
    default: "Eat & Chill | Express Online Food Delivery - 30-Min Fast Delivery",
    template: "%s | Eat & Chill",
  },
  description:
    "Craving delicious food? Order online from Eat & Chill! Handcrafted Kathi Rolls, Momos, Shahi Paneer, Biryanis, Pastas, Sandwiches & Shakes. Fast 30-min express delivery right to your doorstep. Cash on Delivery, UPI & Card accepted.",
  keywords: [
    "food delivery",
    "online food order",
    "express food delivery",
    "kathi rolls online",
    "paneer tikka delivery",
    "momos delivery",
    "eat and chill",
    "30 min food delivery",
    "fast food delivery",
  ],
  authors: [{ name: "Eat & Chill" }],
  creator: "Eat & Chill",
  publisher: "Eat & Chill",
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
    url: "https://eatandchill.com",
    title: "Eat & Chill | Express Online Food Delivery",
    description:
      "Order hot & fresh food online with express 30-min delivery & live tracking.",
    siteName: "Eat & Chill",
    images: [
      {
        url: "/assets/header_img.png",
        width: 1200,
        height: 630,
        alt: "Eat & Chill Online Food Delivery Menu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eat & Chill | Online Food Delivery",
    description: "Delicious food delivered in 30 minutes to your doorstep. Order now with COD & UPI!",
    images: ["/assets/header_img.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col justify-between bg-white text-gray-900 font-sans">
        <StoreContextProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <Navbar />
          <LoginModal />
          <main className="flex-1">{children}</main>
          <Footer />
        </StoreContextProvider>
      </body>
    </html>
  );
}

