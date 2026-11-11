"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token") || "";
    }
    return "";
  });
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const name = localStorage.getItem("userName");
      const id = localStorage.getItem("userId");
      if (name || id) return { name: name || "Foodie", id };
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [loginPopup, setLoginPopup] = useState(false);
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterVeg, setFilterVeg] = useState("all"); // 'all', 'veg', 'delhi'
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [availableLocations, setAvailableLocations] = useState([]);
  const [userCoords, setUserCoords] = useState(null);
  const [userDistanceKm, setUserDistanceKm] = useState(null);
  const [isCheckingDistance, setIsCheckingDistance] = useState(false);
  const [distanceError, setDistanceError] = useState(null);

  const [settings, setSettings] = useState({
    storeName: "REAL BROTHER'S RESTAURANT",
    storePhone: "+91 78271 18412",
    deliveryFee: 40,
    freeDeliveryThreshold: 499,
    maxDeliveryDistanceKm: 3,
    restaurantLat: 28.583,
    restaurantLng: 77.388,
    stripeEnabled: true,
    codEnabled: true,
    upiEnabled: true,
    upiId: "7827118412@ybl",
    bannerNotice: "⚡ Real Brother's Restaurant · Sarfabad Sector 73 Noida | Free Delivery Above ₹499 | Authentic Ghar Jaisa Swad!",
    googleBusinessUrl: "https://share.google/UPOhBCowyPZ07exvK",
  });

  const toggleLoginPopup = () => setLoginPopup((prev) => !prev);

  // Helper to calculate distance in KM between 2 coordinates (Haversine Formula)
  const calculateDistanceInKm = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
    const R = 6371; // Earth's radius in KM
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Number((R * c).toFixed(1));
  };

  // Check User Geolocation & Compute Distance from Kitchen
  const checkUserDistance = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setDistanceError("Geolocation is not supported by your device");
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsCheckingDistance(true);
    setDistanceError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const uLat = position.coords.latitude;
        const uLng = position.coords.longitude;
        setUserCoords({ lat: uLat, lng: uLng });

        const rLat = settings.restaurantLat !== undefined ? settings.restaurantLat : 28.583;
        const rLng = settings.restaurantLng !== undefined ? settings.restaurantLng : 77.388;
        const dist = calculateDistanceInKm(uLat, uLng, rLat, rLng);
        setUserDistanceKm(dist);
        setIsCheckingDistance(false);

        const maxRadius =
          settings.maxDeliveryDistanceKm !== undefined ? settings.maxDeliveryDistanceKm : 3;

        if (dist > maxRadius) {
          toast(
            `📍 You are ${dist} km away (Covered radius is ${maxRadius} km). Please message on WhatsApp for custom distance delivery!`,
            { icon: "⚠️", duration: 5500 }
          );
        } else {
          toast.success(
            `🎉 You are ${dist} km away from our Sarfabad kitchen — Inside express delivery radius!`
          );
        }
      },
      (err) => {
        console.warn("Geolocation permission error:", err.message);
        setIsCheckingDistance(false);
        setDistanceError("Please allow location access to calculate delivery distance");
        toast.error("Location permission denied. Please allow access or order via WhatsApp.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  // Fetch Available Locations (dynamic from API / DB)
  const fetchAvailableLocations = async () => {
    try {
      const res = await fetch(`/api/locations?t=${Date.now()}`, { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setAvailableLocations(data.data);
      }
    } catch (err) {
      console.error("Failed to load available locations:", err);
    }
  };

  // Fetch Food List
  const fetchFoodList = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/food/list?t=${Date.now()}`, { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setFoodList(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch food list:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Store & Payment Settings
  const fetchSettings = async () => {
    try {
      const res = await fetch(`/api/admin/settings?t=${Date.now()}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success && data.data) {
        const cleanSettings = { ...data.data };
        if (!cleanSettings.storeName || cleanSettings.storeName.includes("Eat & Chill")) {
          cleanSettings.storeName = "REAL BROTHER'S RESTAURANT";
        }
        if (!cleanSettings.storePhone || cleanSettings.storePhone.includes("7755013772")) {
          cleanSettings.storePhone = "+91 78271 18412";
        }
        setSettings(cleanSettings);
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
    }
  };

  // Load Cart Data from server
  const loadCartData = async (userToken) => {
    try {
      const res = await fetch("/api/cart/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: userToken,
        },
      });
      const data = await res.json();
      if (data.success && data.cartData) {
        setCartItems(data.cartData);
      }
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
  };

  // Add to Cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    toast.success("Item added to cart", { duration: 1500 });

    if (token) {
      try {
        await fetch("/api/cart/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({ itemId }),
        });
      } catch (err) {
        console.error("Cart sync error:", err);
      }
    }
  };

  // Remove from Cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });

    if (token) {
      try {
        await fetch("/api/cart/remove", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({ itemId }),
        });
      } catch (err) {
        console.error("Cart sync error:", err);
      }
    }
  };

  // Calculate Total Cart Amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((p) => p._id === item || p.id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Total quantity of items in cart
  const getTotalCartCount = () => {
    return Object.values(cartItems).reduce((acc, count) => acc + count, 0);
  };

  // Delivery location persistence
  const updateSelectedLocation = (loc) => {
    setSelectedLocation(loc);
    if (typeof window !== "undefined") {
      if (loc) {
        localStorage.setItem("eatandchill_market_location", JSON.stringify(loc));
        toast.success(`📍 Delivery location set to ${loc.name}`, { duration: 2500 });
      } else {
        localStorage.removeItem("eatandchill_market_location");
      }
    }
  };

  // Delivery charge calculation
  const getDeliveryFee = () => {
    const subtotal = getTotalCartAmount();
    if (subtotal === 0) return 0;
    if (subtotal >= (settings.freeDeliveryThreshold || 499)) return 0;
    return settings.deliveryFee || 50;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setToken("");
    setUser(null);
    setCartItems({});
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    fetchFoodList();
    fetchSettings();
    fetchAvailableLocations();

    const storedToken = localStorage.getItem("token");
    const storedName = localStorage.getItem("userName");
    const storedId = localStorage.getItem("userId");

    if (storedToken) {
      setToken(storedToken);
      if (storedName || storedId) {
        setUser({ name: storedName || "Foodie", id: storedId });
      }
      loadCartData(storedToken);
    }

    const storedLoc = localStorage.getItem("eatandchill_market_location");
    if (storedLoc) {
      try {
        setSelectedLocation(JSON.parse(storedLoc));
      } catch (err) {
        console.error("Failed to parse stored location:", err);
      }
    }
  }, []);

  const value = {
    cartItems,
    setCartItems,
    food_list,
    setFoodList,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartCount,
    getDeliveryFee,
    selectedLocation,
    setSelectedLocation: updateSelectedLocation,
    availableLocations,
    fetchAvailableLocations,
    userCoords,
    userDistanceKm,
    isCheckingDistance,
    distanceError,
    checkUserDistance,
    calculateDistanceInKm,
    token,
    setToken,
    user,
    setUser,
    isLoading,
    loginPopup,
    toggleLoginPopup,
    category,
    setCategory,
    searchQuery,
    setSearchQuery,
    filterVeg,
    setFilterVeg,
    settings,
    fetchSettings,
    fetchFoodList,
    logout,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreContextProvider");
  }
  return context;
};

