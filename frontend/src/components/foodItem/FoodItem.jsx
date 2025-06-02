import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);
  function handleAddCart(id) {
    return function () {
      addToCart(id);
    };
  }
  function handleRemoveCart(id) {
    return function () {
      removeFromCart(id);
    };
  }
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          src={url + "/images/" + image}
          alt={name}
          className="food-item-img"
        />
        {!cartItems[id] ? (
          <img
            src={assets.add_icon_white}
            alt="Add to Cart"
            onClick={handleAddCart(id)}
            className="add"
          />
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              alt=""
              onClick={handleRemoveCart(id)}
            />
            <p>{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              alt=""
              onClick={handleAddCart(id)}
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name} </p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price} </p>
      </div>
    </div>
  );
};

export default FoodItem;
