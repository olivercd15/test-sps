import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById, updateUser } from "../services/UserService"; 
import Navbar from "../components/Navbar"; 
import * as Yup from 'yup'; 
import { Form, Input, Button } from "../components/DefaultStyle"; 

// Esquema de validación con Yup
const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Mínimo 3 caracteres')
    .required('El nombre es obligatorio'),
  email: Yup.string()
    .email('Ingrese un correo electrónico válido')
    .required('El correo electrónico es obligatorio'),
});

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
      <div className="container mt-5" style={{ maxWidth: '600px' }}> {/* Ajustamos el tamaño máximo del formulario */}
        <h2 className="text-center">Editar Usuario</h2>
        <form schema={schema} onSubmit={handleSubmit}>
          <div className="mb-3">
            <Input
              name="name"
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: '100%' }} // Controlando el tamaño del input
            />
          </div>
          <div className="mb-3">
            <Input
              name="email"
              type="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%' }} // Controlando el tamaño del input
            />
          </div>
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            style={{ 
              width: '100%', 
              textAlign: 'center', // Centra el texto
              marginTop: '20px' // Espaciado superior
            }}
          >
            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
