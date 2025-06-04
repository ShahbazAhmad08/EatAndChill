import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../foodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  if (food_list > 0) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <div className="food-display" id="food-display">
      <h2>Explore our food</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
      {/* <hr /> */}
    </div>
  );
};

export default FoodDisplay;
