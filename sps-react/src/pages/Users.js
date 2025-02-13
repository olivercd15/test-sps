import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir después de login
import { fetchUsers, deleteUserById } from "../services/UserService"; // Ajustar el servicio para eliminar
import {
  Button,
  CircularProgress,
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material"; // Material UI
import { MdEdit, MdDelete } from "react-icons/md"; // Para los iconos de editar y eliminar
import { Form, Input } from "../components/DefaultStyle"; // Usamos los componentes personalizados
import ConfirmDialog from "../components/ConfirmDialog"; // Componente de confirmación de eliminación
import Navbar from "../components/Navbar"; 

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const navigate = useNavigate(); // Hook para redirigir

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers(); // Llamada al servicio para obtener usuarios
        setUsers(usersData);
      } catch (error) {
        setError("Error al cargar usuarios");
      }
      setLoading(false);
    };
    getUsers();
  }, []);

  const handleEdit = (userId) => {
    navigate(`/users/${userId}`); // Redirige a la página de edición
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await deleteUserById(userToDelete); // Llamada al servicio para eliminar
      setUsers(users.filter((user) => user.id !== userToDelete)); // Filtra el usuario eliminado
      setShowConfirmDialog(false);
      setUserToDelete(null);
    } catch (error) {
      setError("Error al eliminar el usuario");
    }
    setIsSubmitting(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Cambia la página
  };

  const handleRegister = () => {
    navigate('/register'); // Redirige a la página de registro
  };

  if (loading) {
    return (
      <Container maxWidth="xs">
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginTop: 5,
          }}
        >
          {/* Botón para registrar un nuevo usuario */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleRegister()}
            sx={{ marginBottom: "20px" }}
          >
            Nuevo Registro
          </Button>

          <h2>Lista de Usuarios</h2>

          {/* Tabla de usuarios */}
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Correo Electrónico</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(page * 10, page * 10 + 10).map((user) => (
                <TableRow hover key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(user.id)}
                      sx={{ marginRight: 2 }}
                    >
                      <MdEdit size={20} />
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setUserToDelete(user.id);
                        setShowConfirmDialog(true);
                      }}
                    >
                      <MdDelete size={20} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Paginación */}
          <TablePagination
            component="div"
            count={users.length}
            rowsPerPage={10}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[]}
          />

          {/* Confirmación de eliminación */}
          {showConfirmDialog && (
            <ConfirmDialog
              title="Confirmar Eliminación"
              content={`¿Estás seguro de que deseas eliminar este usuario? Esta acción no podrá ser revertida.`}
              onCancel={() => setShowConfirmDialog(false)}
              onConfirm={handleDelete}
              loading={isSubmitting}
            />
          )}

          {error && (
            <div style={{ color: "red", marginTop: "20px" }}>{error}</div>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Users;
