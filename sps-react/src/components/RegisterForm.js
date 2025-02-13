import React, { useState } from "react";
import { registerUser } from "../services/UserService"; // Importamos el servicio para el registro
import { useNavigate } from "react-router-dom"; // Usamos el hook useNavigate para redirigir

import { Button, CircularProgress, Container, Box, Link, TextField } from "@mui/material"; // Material UI
import { Form, Input } from "../components/DefaultStyle"; // Usamos los componentes personalizados


const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await registerUser(name, email, password); // Intentamos registrar al usuario
      alert("Usuario registrado exitosamente");
      navigate("/signin"); // Redirigimos al usuario a la página de inicio de sesión
    } catch (error) {
      alert("Error: " + error.message); // Si hay error, mostramos un mensaje
    }

    setIsSubmitting(false);
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 5 }}>
        <h2>Registrar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{ marginBottom: "16px" }}
          />
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
            disabled={isSubmitting} // Deshabilitamos el botón mientras está cargando
            sx={{ padding: "10px", fontSize: "16px" }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Registrar"
            )}
          </Button>
        </form>
        <Box sx={{ marginTop: 2 }}>
          <Link href="/signin" variant="body2">
            Ya tengo una cuenta
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm;
