import React from "react";
import NavBar from "./components/navBar/NavBar";
import SideBar from "./components/sideBar/SideBar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/add/Add";
import List from "./pages/list/List";
import Order from "./pages/orders/Order";
import Login from "./components/login/Login"; // import login
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import PrivateRoute from "./components/privateRoute/PrivateRoute"; // import route guard

const App = () => {
  const url = import.meta.env.VITE_BACKEND_URL;

  return (
    <div>
      <ToastContainer />
      {/* <Login /> */}
      <NavBar />
      <hr />
      <div className="app-content">
        <SideBar />
        <Routes>
          <Route path="/login" element={<Login url={url} />} />
          <Route
            path="/"
            element={
              <PrivateRoute url={url}>
                <List url={url} />
              </PrivateRoute>
            }
          />
          <Route
            path="/add"
            element={
              <PrivateRoute url={url}>
                <Add url={url} />
              </PrivateRoute>
            }
          />
          <Route
            path="/list"
            element={
              <PrivateRoute url={url}>
                <List url={url} />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute url={url}>
                <Order url={url} />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Login url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
