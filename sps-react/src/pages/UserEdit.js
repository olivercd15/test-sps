import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById, updateUser } from "../services/UserService"; 
import Navbar from "../components/Navbar"; 
import { Container, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa el CSS de Bootstrap


const UserEdit = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchUserById(userId); 
        setUser(userData);
        setName(userData.name);
        setEmail(userData.email);
      } catch (error) {
        alert("Error al cargar los datos del usuario");
      }
    };

    getUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateUser(userId, name, email); 
      alert("Usuario actualizado");
      navigate("/users");
    } catch (error) {
      alert("Error al actualizar el usuario");
    }

    setIsSubmitting(false);
  };

  if (!user) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <Navbar />
      <Container className="mt-5" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4">Editar Usuario</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="w-100 mt-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default UserEdit;
