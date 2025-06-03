import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Shimmer from "../shimmer/Shimmer";

const PrivateRoute = ({ children, url }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const res = await axios.get(url + "/api/admin/verify-token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(res);

        if (res.data.success) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (err) {
        setIsValid(false);
      }
    };

    verifyToken();
  }, []);

  if (isValid === null)
    return (
      <div>
        <Shimmer />
      </div>
    );
  if (isValid === false) {
    localStorage.removeItem("adminToken");
    return <Navigate to="/login" replace />;
  }
  if (isValid === false) return <Navigate to="/login" replace />;
  return children;
};

export default PrivateRoute;
