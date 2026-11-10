import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, ArrowRight, MapPin } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Eat & Chill Delhi NCR",
  description:
    "Learn how Eat & Chill protects your personal information, order data, and payment privacy across our Delhi NCR food delivery platform.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-orange-100/70 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>Data Protection &amp; Security</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
            Last updated: November 2026. Your privacy and trust are our highest priorities.
          </p>
        </div>

        {/* Content Cards */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-8 text-xs sm:text-sm text-gray-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>1. Information We Collect</span>
            </h2>
            <p>
              When you order from Eat &amp; Chill, we collect necessary contact information (name, phone number, delivery address, pincode, and order preferences) strictly to fulfill your meal preparation, live GPS dispatch, and customer support.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-brand-500" />
              <span>2. Payment &amp; Financial Security</span>
            </h2>
            <p>
              We do not store your raw debit/credit card numbers or UPI MPINs on our servers. All digital transactions are securely encrypted and processed through RBI-authorized payment gateways (Stripe &amp; standard UPI channels).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-500" />
              <span>3. Location &amp; Delivery Tracking</span>
            </h2>
            <p>
              Your selected delivery market area (e.g., Connaught Place, Hauz Khas, Saket, Noida) is saved locally on your device to ensure accurate delivery turnaround estimates and local cloud hub routing.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-500" />
              <span>4. Zero Third-Party Data Selling</span>
            </h2>
            <p>
              We never sell, rent, or trade your personal information to third-party telemarketers or advertisers. Your data is used exclusively to bring you hot, delicious food.
            </p>
          </section>
        </div>

        {/* FAQs about Privacy */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
          <h2 className="text-base font-black text-gray-900">
            Privacy &amp; Security FAQs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
              <strong className="text-gray-900 block mb-1">
                Can I request deletion of my account or order history?
              </strong>
              <span>
                Yes, simply contact our support team at sa798027@gmail.com and we will delete your stored profile details within 48 hours.
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
              <strong className="text-gray-900 block mb-1">
                Are my delivery addresses stored safely?
              </strong>
              <span>
                All saved addresses are stored in encrypted MongoDB databases protected with strict IP access rules and multi-factor authentication.
              </span>
            </div>
          </div>
        </div>

        {/* Quick Links Footer Banner */}
        <div className="text-center pt-2">
          <Link
            href="/contact"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 underline inline-flex items-center gap-1"
          >
            <span>Have questions about your data? Contact our Data Privacy Officer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

