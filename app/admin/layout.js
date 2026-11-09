import AdminLayout from "@/components/AdminLayout";

export const metadata = {
  title: "Admin Control Center | Eat & Chill",
  description: "Manage Delhi food menu, orders, payment gateways, and store settings.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({ children }) {
  return <AdminLayout>{children}</AdminLayout>;
}

