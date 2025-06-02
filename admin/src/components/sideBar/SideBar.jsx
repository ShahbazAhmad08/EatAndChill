import "./SideBar.css";
import { assets } from "../../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SideBar = () => {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Clear token
    toast.success("Logged out successfully");
    navigate("/login"); // Redirect to login page
  };
  return (
    <div className="side-bar">
      <div className="side-bar-options">
        <NavLink to="/add" className="side-bar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="side-bar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/orders" className="side-bar-option">
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
        {token && (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default SideBar;
