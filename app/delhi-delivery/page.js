import React from "react";
import Link from "next/link";
import { DELHI_LOCALITIES } from "@/lib/delhiLocalities";
import {
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  Phone,
  Flame,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "Fast 30-Min Food Delivery Zones in Delhi NCR | Eat & Chill",
  description:
    "Check our Delhi delivery coverage across Connaught Place, South Delhi, Hauz Khas, Saket, Dwarka, Rohini, Karol Bagh & NCR. Open 11 AM to 3 AM. Free delivery on orders above ₹499.",
  alternates: {
    canonical: "/delhi-delivery",
  },
};

export default function DelhiDeliveryPage() {
  const zones = [
    {
      region: "Central Delhi",
      pincodes: "110001, 110002, 110005, 110006",
      areas: [
        "Connaught Place (CP)",
        "Karol Bagh",
        "Pahar Ganj",
        "Chandni Chowk",
        "Daryaganj",
        "Barakhamba Road",
      ],
      time: "20-25 mins",
      hub: "CP Cloud Kitchen Hub",
    },
    {
      region: "South Delhi",
      pincodes: "110016, 110017, 110019, 110024, 110048, 110070",
      areas: [
        "Hauz Khas & HKV",
        "Saket & Select CityWalk",
        "Greater Kailash (GK 1 & 2)",
        "Malviya Nagar",
        "Green Park",
        "Vasant Kunj",
        "Nehru Place",
        "Lajpat Nagar",
      ],
      time: "25-30 mins",
      hub: "South Ex & Saket Delivery Kitchen",
    },
    {
      region: "West Delhi",
      pincodes: "110015, 110026, 110027, 110058, 110063",
      areas: [
        "Rajouri Garden",
        "Punjabi Bagh",
        "Janakpuri",
        "Paschim Vihar",
        "Tagore Garden",
        "Tilak Nagar",
      ],
      time: "30-35 mins",
      hub: "Rajouri Express Hub",
    },
    {
      region: "North & North-West Delhi",
      pincodes: "110007, 110009, 110034, 110085",
      areas: [
        "DU North Campus (Hudson Lane / GTB)",
        "Model Town",
        "Pitampura",
        "Rohini (Sectors 1-18)",
        "Civil Lines",
      ],
      time: "30-35 mins",
      hub: "North Campus & Rohini Kitchen",
    },
    {
      region: "East Delhi & NCR Border",
      pincodes: "110091, 110092, 110095",
      areas: [
        "Mayur Vihar Phase 1 & 2",
        "Laxmi Nagar",
        "Preet Vihar",
        "Anand Vihar",
        "Noida Sector 15-18 border",
      ],
      time: "30-40 mins",
      hub: "Mayur Vihar Kitchen",
    },
    {
      region: "South-West Delhi (Dwarka & Aerocity)",
      pincodes: "110037, 110075, 110077",
      areas: [
        "Dwarka Subcity (All Sectors)",
        "Delhi Aerocity & IGI Hotels",
        "Mahipalpur",
        "Palam",
      ],
      time: "25-35 mins",
      hub: "Dwarka Sector 10 Hub",
    },
  ];

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-orange-100/70 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            Delhi NCR Delivery Network
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
            Fast 30-Minute Food Delivery in Delhi
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Eat &amp; Chill operates specialized cloud kitchens strategically positioned across Delhi NCR. Enjoy piping hot meals with multi-layer thermal insulation and zero spills.
          </p>
        </div>

        {/* Highlights Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-brand-600 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Average 30-Min Delivery</h3>
              <p className="text-xs text-gray-500">Live order updates from stove to door</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Late Night Active: Till 3 AM</h3>
              <p className="text-xs text-gray-500">Midnight hunger cravings sorted</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Free Delivery on ₹499+</h3>
              <p className="text-xs text-gray-500">Nominal ₹50 for small orders</p>
            </div>
          </div>
        </div>

        {/* Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {zones.map((zone, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 border-b border-gray-100 pb-3 mb-3">
                  <div>
                    <h2 className="font-black text-lg text-gray-900">{zone.region}</h2>
                    <p className="text-xs text-brand-600 font-semibold">{zone.hub}</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    {zone.time}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Key Delhi Localities:
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {zone.areas.map((area, aIdx) => (
                        <span
                          key={aIdx}
                          className="text-xs bg-gray-50 text-gray-700 px-2.5 py-1 rounded-lg border border-gray-100"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Delhi Pincodes:
                    </p>
                    <p className="text-xs text-gray-600 font-mono mt-0.5">{zone.pincodes}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100">
                <Link
                  href="/#explore-menu"
                  className="w-full py-2.5 px-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-brand-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Order to {zone.region}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Delhi Localities Directory */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
              Neighborhood Specific Delivery
            </span>
            <h2 className="text-2xl font-black text-gray-900 mt-1">
              Select Your Delhi Locality
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Get hyper-local delivery times, dedicated kitchen hubs, and neighborhood specials
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {DELHI_LOCALITIES.map((loc) => (
              <Link
                key={loc.slug}
                href={`/delhi-delivery/${loc.slug}`}
                className="group p-3 rounded-2xl border border-gray-100 bg-gray-50/60 hover:bg-orange-50 hover:border-brand-500 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-extrabold text-gray-900 group-hover:text-brand-600 transition-colors">
                    {loc.name}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{loc.zone}</div>
                </div>
                <div className="mt-2 text-[11px] font-bold text-brand-600 flex items-center justify-between">
                  <span>⚡ {loc.avgDeliveryMinutes}m</span>
                  <span className="text-xs">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Delhi Delivery Support CTA */}
        <div className="bg-gradient-to-r from-brand-600 to-amber-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-black">
              Need assistance with your Delhi delivery?
            </h2>
            <p className="text-xs sm:text-sm text-orange-100 max-w-xl">
              Our 24x7 Delhi order helpline and rider dispatch team is ready to assist. Call or WhatsApp anytime.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+917755013772"
              className="px-6 py-3.5 rounded-xl bg-white text-gray-900 font-bold text-sm shadow hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-brand-500" />
              <span>Call Delhi Hub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

