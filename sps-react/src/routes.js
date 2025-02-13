import React from "react";
import { createBrowserRouter } from "react-router-dom";

// Importamos las páginas de la aplicación
import SignIn from "./pages/SignIn";
import RegisterForm from "./components/RegisterForm";
import Users from "./pages/Users";
import UserEdit from "./pages/UserEdit";

// Rutas públicas y privadas
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

// Definir las rutas
const router = createBrowserRouter([
  // Rutas públicas
  {
    path: "/",
    element: <PublicRoute component={SignIn} />,
  },
  {
    path: "/register",
    element: <PublicRoute component={RegisterForm} />, // Ruta de registro
  },

  // Rutas privadas (requieren autenticación)
  {
    path: "/users",
    element: <PrivateRoute component={Users} />,
  },
  {
    path: "/users/:userId",
    element: <PrivateRoute component={UserEdit} />, // No es necesario el loader aquí
  },

  // Ruta para crear usuario, sin loader
  {
    path: "/users/create",
    element: <PrivateRoute component={RegisterForm} />, // Redirigimos al formulario de registro
  },
]);

export default router;
