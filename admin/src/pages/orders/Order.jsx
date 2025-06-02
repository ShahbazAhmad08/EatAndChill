import React, { useEffect, useState } from "react";
import "./Order.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import Shimmer from "../../components/shimmer/Shimmer"; // Adjust path as needed

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url + "/api/order/list");

      if (response.data.success) {
        setOrders(response.data.data);
        // console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  const statusHAndler = async (e, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: e.target.value,
      });

      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  if (loading) {
    return <Shimmer />; // Loader while orders are being fetched
  }

  return (
    <div className="order">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div className="order-item" key={index}>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order?.items.map((item, index) => {
                    return `${item?.name} X ${item?.quantity}${
                      index === order.items.length - 1 ? "" : ", "
                    }`;
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street + ", "}</p>
                  <p>{`${order.address.city}, ${order.address.state}, ${order.address.country} ${order.address.zipcode}`}</p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
              <select
                onChange={(event) => statusHAndler(event, order._id)}
                value={order.status}
              >
                <option value="food processing">Food processing</option>
                <option value="out for delivery">Out For Delivery</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          ))
        ) : (
          <p style={{ padding: "1rem", color: "gray" }}>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Order;
