"use client";

import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  MapPin,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Search,
  Sparkles,
  Info,
  Clock,
  Phone,
  Globe,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";

export default function AdminLocationsPage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLoc, setEditingLoc] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    slug: "",
    city: "Noida",
    zone: "Uttar Pradesh",
    state: "Uttar Pradesh",
    pincodes: "201301",
    avgDeliveryMinutes: "25-30",
    hub: "",
    tagline: "Ghar Jaisa Swad - Fast 30-Min Delivery",
    description: "",
    address: "",
    phone: "+91 78271 18412",
    googleBusinessUrl: "https://share.google/UPOhBCowyPZ07exvK",
    popularDishes: "Shahi Paneer, Paneer Tikka Kathi Roll, Momos, Dal Makhani",
    highlights: "25-30 Min Delivery, Ghar Jaisa Swad, 100% Fresh",
    landmarks: "Main Market, Metro Station Corridor",
    isActive: true,
  });

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/locations?all=true");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setLocations(data.data);
      }
    } catch (err) {
      console.error("Failed to load locations:", err);
      toast.error("Failed to load locations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleOpenAdd = () => {
    setEditingLoc(null);
    setFormData({
      name: "",
      shortName: "",
      slug: "",
      city: "Noida",
      zone: "Uttar Pradesh",
      state: "Uttar Pradesh",
      pincodes: "201301",
      avgDeliveryMinutes: "25-30",
      hub: "",
      tagline: "Ghar Jaisa Swad - Fast 30-Min Delivery",
      description: "",
      address: "",
      phone: "+91 78271 18412",
      googleBusinessUrl: "https://share.google/UPOhBCowyPZ07exvK",
      popularDishes: "Shahi Paneer, Paneer Tikka Kathi Roll, Momos, Dal Makhani",
      highlights: "25-30 Min Delivery, Ghar Jaisa Swad, 100% Fresh",
      landmarks: "Main Market, Sector Chauraha",
      isActive: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (loc) => {
    setEditingLoc(loc);
    setFormData({
      name: loc.name || "",
      shortName: loc.shortName || loc.name || "",
      slug: loc.slug || "",
      city: loc.city || "Noida",
      zone: loc.zone || "Uttar Pradesh",
      state: loc.state || "Uttar Pradesh",
      pincodes: Array.isArray(loc.pincodes) ? loc.pincodes.join(", ") : loc.pincodes || "",
      avgDeliveryMinutes: loc.avgDeliveryMinutes || "25-30",
      hub: loc.hub || "",
      tagline: loc.tagline || "",
      description: loc.description || "",
      address: loc.address || "",
      phone: loc.phone || "+91 78271 18412",
      googleBusinessUrl: loc.googleBusinessUrl || "https://share.google/UPOhBCowyPZ07exvK",
      popularDishes: Array.isArray(loc.popularDishes)
        ? loc.popularDishes.join(", ")
        : loc.popularDishes || "",
      highlights: Array.isArray(loc.highlights) ? loc.highlights.join(", ") : loc.highlights || "",
      landmarks: Array.isArray(loc.landmarks) ? loc.landmarks.join(", ") : loc.landmarks || "",
      isActive: loc.isActive !== undefined ? loc.isActive : true,
    });
    setModalOpen(true);
  };

  const handleNameChange = (val) => {
    setFormData((prev) => {
      const updated = { ...prev, name: val };
      if (!editingLoc) {
        // Auto generate slug
        updated.slug = val
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
        if (!updated.shortName) {
          updated.shortName = val.split(" ")[0];
        }
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.slug) {
      toast.error("Name and slug are required");
      return;
    }

    try {
      if (editingLoc) {
        const res = await fetch(`/api/locations/${editingLoc._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success) {
          toast.success("Location updated successfully!");
          setModalOpen(false);
          fetchLocations();
        } else {
          toast.error(data.message || "Failed to update location");
        }
      } else {
        const res = await fetch("/api/locations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success) {
          toast.success("New Location added successfully!");
          setModalOpen(false);
          fetchLocations();
        } else {
          toast.error(data.message || "Failed to add location");
        }
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      const res = await fetch(`/api/locations/${id}`, { method: "PATCH" });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        fetchLocations();
      } else {
        toast.error(data.message || "Failed to toggle status");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/locations/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Location removed");
        fetchLocations();
      } else {
        toast.error(data.message || "Could not delete");
      }
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const filteredLocations = locations.filter((loc) => {
    const q = search.toLowerCase();
    return (
      (loc.name && loc.name.toLowerCase().includes(q)) ||
      (loc.slug && loc.slug.toLowerCase().includes(q)) ||
      (loc.city && loc.city.toLowerCase().includes(q))
    );
  });

  return (
    <AdminLayout>
      <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-400 text-xs font-black uppercase tracking-wider mb-1">
              <MapPin className="w-4 h-4" />
              <span>Programmatic SEO & Delivery Hubs</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Location Hubs Manager
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Currently active single primary location with full capability to add unlimited future locations.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-500 hover:to-amber-500 text-white font-bold text-sm shadow-lg shadow-brand-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Location</span>
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-slate-800/60 border border-slate-700/70 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-xs sm:text-sm text-slate-300">
            <p className="font-bold text-white">
              Dynamic Location Mode: <span className="text-amber-400 font-black">1 Dedicated Primary Location Active</span>
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              Real Brother&apos;s Restaurant is currently serving <strong>Sarfabad, Sector 73 Noida</strong>. When you add more locations below, they will immediately appear in the user&apos;s location dropdown, homepage delivery ticker, footer directory, and get their own dedicated SEO landing page (`/[slug]`).
            </p>
          </div>
        </div>

        {/* Search & Stats Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, slug or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>

          <div className="text-xs font-semibold text-slate-400 flex items-center gap-3">
            <span>
              Total: <strong className="text-white">{locations.length}</strong>
            </span>
            <span>•</span>
            <span>
              Active: <strong className="text-emerald-400">{locations.filter((l) => l.isActive).length}</strong>
            </span>
          </div>
        </div>

        {/* Locations List Grid / Table */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-slate-400 text-sm">Loading location data...</p>
          </div>
        ) : filteredLocations.length === 0 ? (
          <div className="text-center py-16 bg-slate-800/30 rounded-2xl border border-dashed border-slate-700">
            <MapPin className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <p className="text-white font-bold text-sm">No locations found</p>
            <p className="text-slate-400 text-xs mt-1">Try adjusting your search query or add a new one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredLocations.map((loc) => (
              <div
                key={loc._id || loc.slug}
                className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all group shadow-sm hover:shadow-xl"
              >
                <div className="space-y-3">
                  {/* Status & Slug */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      onClick={() => handleToggleActive(loc._id, loc.isActive)}
                      className={`cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                        loc.isActive
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
                          : "bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30"
                      }`}
                      title="Click to toggle Active / Inactive"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${loc.isActive ? "bg-emerald-400 animate-pulse" : "bg-rose-400"}`} />
                      {loc.isActive ? "Active on Website" : "Inactive"}
                    </span>

                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      /{loc.slug}
                    </span>
                  </div>

                  {/* Name & Tagline */}
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                      {loc.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1 italic">
                      &quot;{loc.tagline || "Ghar Jaisa Swad"}&quot;
                    </p>
                  </div>

                  {/* Badges / Details */}
                  <div className="space-y-1.5 pt-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                      <span>{loc.avgDeliveryMinutes || "25-30"} mins average speed</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Phone className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                      <span className="truncate">{loc.phone || "+91 78271 18412"}</span>
                    </div>
                    {loc.pincodes && loc.pincodes.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {(Array.isArray(loc.pincodes) ? loc.pincodes : [loc.pincodes]).map((pin, i) => (
                          <span
                            key={i}
                            className="bg-slate-900 border border-slate-800 text-[10px] text-amber-300/80 px-1.5 py-0.5 rounded font-mono"
                          >
                            {pin}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <a
                    href={`/${loc.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
                  >
                    <span>View SEO Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(loc)}
                      className="p-1.5 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                      title="Edit location"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(loc._id, loc.name)}
                      className="p-1.5 text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg transition-colors"
                      title="Delete location"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal: Add / Edit Location */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      {editingLoc ? `Edit: ${editingLoc.name}` : "Add New Delivery Location"}
                    </h2>
                    <p className="text-xs text-slate-400">
                      Creates a dedicated location hub with automatic SEO page generation.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1 text-xl font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-bold block">
                      Full Location Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sarfabad (Sector 73 Noida)"
                      value={formData.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      required
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  {/* Slug */}
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-bold block">
                      URL Slug * (e.g. /sarfabad-sector-73)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. sarfabad-sector-73"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      required
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  {/* Short Name */}
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-bold block">
                      Short Badge Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sarfabad"
                      value={formData.shortName}
                      onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-bold block">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Noida"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  {/* Delivery Minutes */}
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-bold block">
                      Avg Delivery Time (mins)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 25-30"
                      value={formData.avgDeliveryMinutes}
                      onChange={(e) =>
                        setFormData({ ...formData, avgDeliveryMinutes: e.target.value })
                      }
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-bold block">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. +91 78271 18412"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  {/* Pincodes */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-slate-300 font-bold block">
                      Covered Pincodes (Comma-separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 201301, 201304, 201307"
                      value={formData.pincodes}
                      onChange={(e) => setFormData({ ...formData, pincodes: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  {/* Google Business URL */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-slate-300 font-bold block">
                      Google Business Profile (Maps) URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://share.google/UPOhBCowyPZ07exvK"
                      value={formData.googleBusinessUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, googleBusinessUrl: e.target.value })
                      }
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-slate-300 font-bold block">
                      Full Physical Address
                    </label>
                    <input
                      type="text"
                      placeholder="Gali Number 5, Vishal, Sarfabad Village, Sector 73, Noida - 201301"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  {/* Tagline */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-slate-300 font-bold block">
                      Tagline
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ghar Jaisa Swad - Sizzling North Indian & Chinese Delivered Hot"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-slate-300 font-bold block">
                      Detailed SEO Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Write 2-3 sentences about food delivery in this location..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  {/* Active Toggle */}
                  <div className="sm:col-span-2 flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="isActiveLoc"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 cursor-pointer"
                    />
                    <label htmlFor="isActiveLoc" className="text-slate-200 font-bold cursor-pointer">
                      Enable this location on public website immediately
                    </label>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-500 hover:to-amber-500 text-white font-bold shadow-lg shadow-brand-500/20"
                  >
                    {editingLoc ? "Save Changes" : "Create Location"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

