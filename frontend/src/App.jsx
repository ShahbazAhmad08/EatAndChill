import { Route, Routes } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import PlaceOrder from "./pages/placeOrder/PlaceOrder";
import Footer from "./components/footer/Footer";
import { useState } from "react";
import LoginComponent from "./components/loginComponent/LoginComponent";
import Verify from "./pages/verify/Verify";
import MyOrders from "./pages/myOrders/MyOrders";

const App = () => {
  const [loginPopup, setLoginPopup] = useState(false);
  const toggleLoginPopup = () => {
    setLoginPopup(!loginPopup);
  };
  return (
    <>
      {loginPopup && <LoginComponent toggleLoginPopup={toggleLoginPopup} />}
      <div className="app">
        <Nav toggleLoginPopup={toggleLoginPopup} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
