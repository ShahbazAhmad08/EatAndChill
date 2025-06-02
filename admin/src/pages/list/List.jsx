import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import Shimmer from "../../components/shimmer/Shimmer"; // Ensure correct path

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/food/list`);

      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching food list.");
      }
    } catch (error) {
      toast.error("Server error");
    } finally {
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

  if (loading) {
    return <Shimmer />; // Display shimmer/loader while data is loading
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
              <p>${item.price}</p>
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
