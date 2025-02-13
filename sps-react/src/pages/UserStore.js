import React, { useState } from "react";
import { registerUser } from "../services/UserService"; // Importamos el servicio para el registro
import { useNavigate } from "react-router-dom"; // Usamos el hook useNavigate para redirigir
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom"; // Si usas React Router para la navegación
import "bootstrap/dist/css/bootstrap.min.css"; // Importa el CSS de Bootstrap


const UserStore = () => {
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
      navigate("/users"); // Redirigimos al usuario a la página de inicio de sesión
    } catch (error) {
      alert("Error: " + error.message); // Si hay error, mostramos un mensaje
    }

    setIsSubmitting(false);
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
      <div className="p-4 shadow rounded bg-white">
        <h2 className="text-center mb-4">Registrar Usuario</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
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
            type="submit"
            variant="primary"
            className="w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Registrando...
              </>
            ) : (
              "Registrar"
            )}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default UserStore;
