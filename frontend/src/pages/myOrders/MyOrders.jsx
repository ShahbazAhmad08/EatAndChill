import React, { useEffect, useState } from "react";
import "./MyOrders.css";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const fetchOrder = async () => {
    let response = await axios.post(
      url + "/api/order/userorders",
      {},
      {
        headers: { token },
      }
    );
    setData(response.data.data);
    // console.log(response.data.data);
  };
  useEffect(() => {
    if (token) {
      fetchOrder();
    }
  }, [token]);
  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) =>
          order.payment ? (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + "X" + item.quantity;
                  } else {
                    return item.name + "X" + item.quantity + ", ";
                  }
                })}
              </p>
              <p>&#8377; {order.amount}.00</p>
              <p>items:{order.items.length}</p>
              <p>
                <span>&#x25cf; &nbsp;</span>
                <b>{order.status}</b>
              </p>
              <button onClick={fetchOrder}>Track Order</button>
            </div>
          ) : (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + "X" + item.quantity;
                  } else {
                    return item.name + "X" + item.quantity + ", ";
                  }
                })}
              </p>
              <p>&#8377; {order.amount}.00</p>
              <p>items:{order.items.length}</p>
              <p>
                <span>&#x25cf; &nbsp;</span>
                <b>Payment Failed</b>
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MyOrders;
