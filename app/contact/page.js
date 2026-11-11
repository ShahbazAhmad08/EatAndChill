"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, ExternalLink, Star } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    toast.success("Thank you! Your message has been sent to Real Brother's Restaurant.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen w-full max-w-full overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-3.5 py-1.5 rounded-full border border-amber-300">
            We are here to serve you
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight">
            Contact Real Brother&apos;s Restaurant
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Have questions about your food delivery, bulk party orders, catering, or menu inquiries? Reach out to us directly or visit us in Sarfabad, Sector 73 Noida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Info */}
          <div className="md:col-span-5 bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-amber-200/80 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center justify-between">
              <span>Restaurant Details</span>
              <span className="text-xs text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 font-bold">
                ⭐ 4.9 on Google
              </span>
            </h2>

            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 text-xs">Primary Address</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Gali Number 5, Vishal, Sarfabad Village, Sector 73, Noida, Uttar Pradesh - 201301 (Near Tivoli Banquet Hall / Sector 74)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 text-xs">Calling &amp; WhatsApp Support</p>
                  <div className="space-y-0.5">
                    <a href="tel:+917827118412" className="block text-xs font-bold text-brand-600 hover:underline">
                      +91 78271 18412 (Primary)
                    </a>
                    <a href="tel:+916366414326" className="block text-xs text-gray-600 hover:underline">
                      +91 63664 14326 (Kitchen Order Desk)
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 text-xs">Timings &amp; Delivery Hours</p>
                  <p className="text-xs text-gray-600">
                    Open Daily: 08:00 AM – 12:00 AM Midnight
                  </p>
                </div>
              </div>
            </div>

            {/* Google Business Profile Action Card */}
            <div className="pt-2 border-t border-gray-100">
              <a
                href="https://share.google/UPOhBCowyPZ07exvK"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs flex items-center justify-between transition-colors shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>Google Business Profile</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-amber-700" />
              </a>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4">
              Send us a Message or Catering Inquiry
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="yourname@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. Party Order / Food Delivery / Feedback"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what you'd like to order or ask..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-700 hover:to-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-brand-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
