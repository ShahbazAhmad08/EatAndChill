import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
// console.log(menu_list);

const ExploreMenu = ({ category, setCategory }) => {
  // console.log("Category in ExploreMenu:", category);

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delicious array of dishes crafted
        to delight every palate, Delicious Choices. Endless Flavors.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              className="explore-menu-item"
              key={index}
            >
              <img
                src={item.menu_image}
                alt={item.menu_name}
                className={category === item.menu_name ? "active" : ""}
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
