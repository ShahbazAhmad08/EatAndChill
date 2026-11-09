"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginPopup, setLoginPopup] = useState(false);
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterVeg, setFilterVeg] = useState("all"); // 'all', 'veg', 'delhi'
  const [settings, setSettings] = useState({
    deliveryFee: 50,
    freeDeliveryThreshold: 499,
    stripeEnabled: true,
    codEnabled: true,
    upiEnabled: true,
    upiId: "eatandchill@okhdfcbank",
    bannerNotice: "⚡ Delhi NCR Fast 30-Min Delivery | Free Delivery on Orders Above ₹499 | Authentic Dilli Delights!",
    storePhone: "+91 7755013772",
  });

  const toggleLoginPopup = () => setLoginPopup((prev) => !prev);

  // Fetch Food List
  const fetchFoodList = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/food/list");
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
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.success && data.data) {
        setSettings(data.data);
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

