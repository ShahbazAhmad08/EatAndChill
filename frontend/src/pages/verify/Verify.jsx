import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url, setCartItems, cartItems } = useContext(StoreContext);
  const navigate = useNavigate();
  // console.log(cartItems);

  const verifyPayment = async () => {
    const userId = localStorage.getItem("userId");
    let response = await axios.post(url + "/api/order/verify", {
      success,
      orderId,
      userId,
    });
    if (response.data.success) {
      setTimeout(() => {
        setCartItems({});
        navigate("/myorders");
        toast.success("Order Placed");
      }, 1000);
    } else {
      setTimeout(() => {
        navigate("/");
        toast.error("Order Failed");
      }, 1000);
    }
  };
  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
      <p>Verifying Payment...</p>
    </div>
  );
};

export default Verify;
