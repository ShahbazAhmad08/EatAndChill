import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false); // Track loading state

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/food/list`);

      if (response.data.success) {
        setTimeout(() => {
          setList(response.data.data);
          setLoading(false);
        }, 1500);
      } else {
        toast.error("Error fetching food list.");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Server error");
      setLoading(false);
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodId,
      });
      await fetchList();

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Failed to remove item");
      }
    } catch (error) {
      toast.error("Error removing item");
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  if (!list || loading) {
    return (
      <div className="spinner-container">
        {/* <div className="dual-ring"></div> */}
        <div className="loader"></div>
        <p> Loading... please wait</p>
      </div>
    );
  }
  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-formate title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="list-table-formate">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>&#8377; {item.price}</p>
              <p className="cursor" onClick={() => removeFood(item._id)}>
                X
              </p>
            </div>
          ))
        ) : (
          <p style={{ padding: "1rem", color: "gray" }}>
            No food items available.
          </p>
        )}
      </div>
    </div>
  );
};

export default List;
