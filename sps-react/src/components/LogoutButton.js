import React from "react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";  // Usamos la función para eliminar el token

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();  // Eliminamos el token de localStorage
    navigate("/signin");  // Redirigimos al usuario a la página de login
  };

  return (
    <button className="btn btn-danger" onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
