import React, { useContext, useState } from "react";
import "./LoginComponent.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
const LoginComponent = ({ toggleLoginPopup }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Sign up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
    // console.log(data);
  };
  function handleStateChange(state) {
    return function () {
      setCurrState(state);
    };
  }
  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      toggleLoginPopup();
    } else {
      alert(response.data.message);
    }
  };
  return (
    <div className="login-popup">
      <form className="login-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img src={assets.cross_icon} alt="" onClick={toggleLoginPopup} />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              placeholder="You Name"
              required
            />
          )}
          <input
            type="email"
            placeholder="Your Email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            required
          />
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            placeholder="your Password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Login" ? "Login" : "Create account"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create an Account?{" "}
            <span onClick={handleStateChange("Sing up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an Account?{" "}
            <span onClick={handleStateChange("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginComponent;
