import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = import.meta.env.VITE_BACKEND_URL;
  const [IsLoading, setIsLoading] = useState(true);
  // console.log(url);

  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: 1,
      }));
    } else {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1,
      }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
    // toast.success("Item Added to Cart");
  };
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
    // toast("Item Removed From Cart");
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        console.log(itemInfo);

        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const fetchFoodList = async () => {
    setIsLoading(true);
    const response = await axios.get(url + "/api/food/list");
    setIsLoading(false);
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    // console.log(response.data.cartData);

    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    IsLoading,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
