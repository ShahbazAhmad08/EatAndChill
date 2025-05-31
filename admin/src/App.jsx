import React from "react";
import NavBar from "./components/navBar/NavBar";
import SideBar from "./components/sideBar/SideBar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/add/Add";
import List from "./pages/list/List";
import Order from "./pages/orders/Order";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

const App = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  return (
    <div>
      <ToastContainer />
      <NavBar />
      <hr />
      <div className="app-content">
        <SideBar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Order url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
