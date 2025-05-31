import React from "react";
import "./NavBar.css";
import { assets } from "../../assets/assets";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <div className="img">
        <img className="logo" src={assets.logo} alt="" />
        <p>Admin Panel</p>
      </div>

      <img src={assets.profile_image} alt="" />
    </div>
  );
};

export default NavBar;
