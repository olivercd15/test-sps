import React from "react";
import { RouterProvider } from "react-router-dom"; // Importamos RouterProvider
import router from "./routes"; // Importamos las rutas configuradas

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />{" "}
      {/* Renderizamos las rutas dentro de RouterProvider */}
    </div>
  );
};

export default App;
