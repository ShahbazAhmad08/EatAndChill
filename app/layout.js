import "./globals.css";
import { StoreContextProvider } from "@/context/StoreContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import { Toaster } from "react-hot-toast";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://eatandchill.com"),
  title: {
    default: "Eat & Chill | Best Online Food Delivery in Delhi NCR - 30-Min Fast Delivery",
    template: "%s | Eat & Chill Delhi",
  },
  description:
    "Craving delicious food in Delhi? Order online from Eat & Chill! Authentic Butter Chicken, Kathi Rolls, Momos, Shahi Paneer, Pastas, Sandwiches & Shakes. Fast 30-min late night delivery across Connaught Place, South Delhi, Dwarka, Rohini & NCR. Cash on Delivery, UPI & Stripe accepted.",
  keywords: [
    "food delivery delhi",
    "online food order delhi",
    "best rolls in delhi",
    "late night food delivery delhi",
    "south delhi food delivery",
    "connaught place food order",
    "eat and chill delhi",
    "butter paneer delivery",
    "momos delivery delhi",
    "30 min food delivery delhi",
    "fast food delivery new delhi",
  ],
  authors: [{ name: "Shahbaz Ahmad" }],
  creator: "Eat & Chill Delhi",
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
    title: "Eat & Chill | Best Online Food Delivery in Delhi NCR",
    description:
      "Order hot & fresh food online in Delhi NCR. Rolls, Biryani, Curries, Pastas, Desserts with express 30-min delivery & live tracking.",
    siteName: "Eat & Chill Delhi",
    images: [
      {
        url: "/assets/header_img.png",
        width: 1200,
        height: 630,
        alt: "Eat & Chill Delhi Food Delivery Menu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eat & Chill | Online Food Delivery in Delhi",
    description: "Delicious food delivered in 30 minutes across Delhi NCR. Order now with COD & UPI!",
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

