import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated, removeToken } from "../utils/auth";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material"; // Material-UI
import { useNavigate } from "react-router-dom"; // Para navegación

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken(); // Eliminamos el token
    navigate("/signin"); // Redirigimos a la página de login
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              Aplicación
            </Link>
          </Typography>
          {!isAuthenticated() ? (
            <>
              <Button color="inherit" component={Link} to="/signin">
                Iniciar sesión
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Registrarse
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/users">
                Usuarios
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
