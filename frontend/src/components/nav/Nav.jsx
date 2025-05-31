import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
const Nav = ({ toggleLoginPopup }) => {
  const [menu, setMenu] = useState("menu");
  const { getTotalCartAmount, setToken, token } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  const navMenu = [
    { id: "home", label: "Home" },
    { id: "menu", label: "Menu", href: "#explore-menu" },
    { id: "mobile-app", label: "Mobile App", href: "#app-download" },
    { id: "contact-us", label: "Contact Us", href: "#footer" },
  ];
  return (
    <div className="nav">
      <Link to={"/"}>
        <img src={assets.logo} alt="LOGO" className="logo" />
      </Link>
      <ul className="nav-menu">
        {navMenu.map((item) =>
          item.id === "home" ? (
            <Link
              to="/"
              key={item.id}
              onClick={() => setMenu(item.id)}
              className={menu === item.id ? "active" : ""}
            >
              {item.label}
            </Link>
          ) : (
            <a
              href={item.href || "#"}
              key={item.id}
              onClick={() => setMenu(item.id)}
              className={menu === item.id ? "active" : ""}
            >
              {item.label}
            </a>
          )
        )}
      </ul>

      <div className="nav-right">
        <img src={assets.search_icon} alt="" />
        <div className="search-icon">
          <Link to={"/cart"}>
            <img src={assets.bag_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() && "dot"}></div>
        </div>
        {!token ? (
          <button onClick={toggleLoginPopup}>Sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li>
                <img src={assets.logout_icon} alt="" />
                <p onClick={logout}>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
