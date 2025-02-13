import React, { useState } from "react";
import { Button, CircularProgress, Container, Box, Link } from "@mui/material"; // Material UI
import { Form, Input } from "./DefaultStyle"; // Usamos los componentes personalizados

const LoginForm = ({ handleLogin, isSubmitting }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password); // Llamamos a la función handleLogin que viene como prop
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 5 }}>
        <h2>Iniciar Sesión</h2>
        <Form onSubmit={handleSubmit}>
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSubmitting}
            sx={{ padding: "10px", fontSize: "16px", marginBottom: "16px" }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Iniciar sesión"
            )}
          </Button>
        </Form>
        <Box sx={{ marginTop: 2 }}>
          <Link href="/register" variant="body2">
            Crear cuenta
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
