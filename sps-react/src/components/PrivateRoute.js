import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
