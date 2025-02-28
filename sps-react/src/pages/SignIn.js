import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir después de login
import { loginUser } from "../services/UserService"; // Usamos el servicio de login
import { saveToken } from "../utils/auth"; // Importamos la función para guardar el token
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom"; // Importa Link para la navegación
import "bootstrap/dist/css/bootstrap.min.css";

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
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
      <div className="p-4 shadow rounded bg-white">
        <h2 className="text-center mb-4">Iniciar Sesión en App</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Cargando...
              </>
            ) : (
              "Iniciar sesión"
            )}
          </Button>
        </Form>

        {/* Enlace para registrarse */}
        <div className="text-center mt-3">
          <span>¿No tienes una cuenta? </span>
          <Link to="/signup" className="text-decoration-none">
            Regístrate
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default SignIn;
