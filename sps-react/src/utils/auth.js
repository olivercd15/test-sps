// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  };
  
  // Función para guardar el token
  export const saveToken = (token) => {
    localStorage.setItem("token", token);
  };
  
  // Función para eliminar el token (logout)
  export const removeToken = () => {
    localStorage.removeItem("token");
  };
  