import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom"; // Correcto: usamos RouterProvider para las rutas
import router from "./routes"; // Rutas que hemos configurado

// Crear el root y renderizar la aplicación en el contenedor con id "root"
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />{" "}
    {/* Usamos RouterProvider para manejar las rutas */}
  </React.StrictMode>
);
