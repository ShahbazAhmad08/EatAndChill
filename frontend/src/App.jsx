import { Route, Routes } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import { useState, Suspense, lazy } from "react";
import LoginComponent from "./components/loginComponent/LoginComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy loaded pages
const Home = lazy(() => import("./pages/home/Home"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const PlaceOrder = lazy(() => import("./pages/placeOrder/PlaceOrder"));
const Verify = lazy(() => import("./pages/verify/Verify"));
const MyOrders = lazy(() => import("./pages/myOrders/MyOrders"));

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
        <ToastContainer />

        <Suspense
          fallback={
            <div className="loading-screen">
              <div className="spinner"></div>
              <p>Loading...</p>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/myorders" element={<MyOrders />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </>
  );
};

export default App;
