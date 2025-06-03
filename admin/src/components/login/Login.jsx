import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { toast } from "react-toastify";
import Shimmer from "../shimmer/Shimmer";

const Login = ({ url }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  function onChangeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  }

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!data.email || !data.password)
      return toast.warning("Please fill all fields");

    try {
      const res = await axios.post(`${url}/api/admin/login`, {
        data,
      });

      //   console.log(res);

      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token); // Store token
        toast.success("Login successful");
        navigate("/list"); // Redirect to dashboard page
      } else {
        setData({ name: "", password: "" });
        toast.error(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      toast.error("Server error");
    }
    if (isLoading) {
      <Shimmer />;
    }
  };

  return (
    <form className="login-page" onSubmit={loginHandler} method="post">
      <h2>Admin Login</h2>
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={data.email}
        onChange={onChangeHandler}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={data.password}
        onChange={onChangeHandler}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
