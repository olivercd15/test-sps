import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers, deleteUserById } from "../services/UserService"; 
import { Button, Container, Table, Row, Col, Spinner, Modal } from "react-bootstrap";
import { MdEdit, MdDelete } from "react-icons/md";
import Navbar from "../components/Navbar"; 

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers(); 
        setUsers(usersData);
      } catch (error) {
        setError("Error al cargar usuarios");
      }
      setLoading(false);
    };
    getUsers();
  }, []);

  const handleEdit = (userId) => {
    navigate(`/users/${userId}`);
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await deleteUserById(userToDelete);
      setUsers(users.filter((user) => user.id !== userToDelete)); 
      setShowConfirmDialog(false);
      setUserToDelete(null);
    } catch (error) {
      setError("Error al eliminar el usuario");
    }
    setIsSubmitting(false);
  };

  const handleRegister = () => {
    navigate('/new'); 
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <div>
      <Navbar />
      <Container>
        <Row className="mt-5">
          <Col xs={12}>
            <Button variant="success" onClick={() => handleRegister()} className="mb-3">
              Nuevo Usuario
            </Button>

            <h2>Lista de Usuarios</h2>

            {/* Tabla de usuarios */}
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo Electrónico</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.slice(page * 10, page * 10 + 10).map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        onClick={() => handleEdit(user.id)}
                        className="mr-2"
                      >
                        <MdEdit size={20} />
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => {
                          setUserToDelete(user.id);
                          setShowConfirmDialog(true);
                        }}
                      >
                        <MdDelete size={20} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Confirmación de eliminación */}
            <Modal show={showConfirmDialog} onHide={() => setShowConfirmDialog(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Estás seguro de que deseas eliminar este usuario? Esta acción no podrá ser revertida.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowConfirmDialog(false)}>
                  Cancelar
                </Button>
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Spinner animation="border" size="sm" /> : "Eliminar"}
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Error */}
            {error && (
              <div style={{ color: "red", marginTop: "20px" }}>{error}</div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );

  
};

export default Users;
