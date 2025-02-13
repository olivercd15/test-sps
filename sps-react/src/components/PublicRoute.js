import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  // Si el usuario está autenticado y está intentando acceder a una ruta pública restringida
  if (isAuthenticated() && restricted) {
    return <Navigate to="/users" />;
  }

  return <Component {...rest} />;
};

export default PublicRoute;
