import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir después de login
import { loginUser } from "../services/UserService"; // Usamos el servicio de login
import { saveToken } from "../utils/auth"; // Importamos la función para guardar el token
import { Button, CircularProgress, Container, Box, Link } from "@mui/material"; // Material UI
import { Form, Input } from "../components/DefaultStyle"; // Usamos los componentes personalizados

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Hook para redirigir

  // Función que maneja el submit del formulario de login
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que se recargue la página
    setIsLoading(true);

    try {
      // Intentamos loguear al usuario
      const token = await loginUser(email, password); // Llamamos al servicio de login
      saveToken(token); // Guardamos el token en localStorage
      setIsLoading(false);
      navigate("/users"); // Redirigimos a la página de usuarios después de login exitoso
    } catch (err) {
      setIsLoading(false);
      setError("Credenciales incorrectas. Intenta de nuevo.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 5 }}>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <Input
            name="email"
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ marginBottom: "16px" }}
          />
          <Input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ marginBottom: "16px" }}
          />
          {error && (
            <div className="alert alert-danger" style={{ marginBottom: "16px" }}>
              {error}
            </div>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading} // Deshabilitamos el botón mientras está cargando
            sx={{ padding: "10px", fontSize: "16px" }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Iniciar sesión"
            )}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
