import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Image, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  // Ruta a la foto de perfil por defecto
  const defaultProfilePic = 'https://picsum.photos/100';
  // Estado inicial del usuario
  const estado = 'Pendiente';

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setAlert({ message: 'Las contraseñas no coinciden. Inténtalo de nuevo.', variant: 'danger' });
      return;
    }

    const nuevoUsuario = {
      nombre,
      apellido,
      usuario,
      correo,
      password,
      fotoPerfil: defaultProfilePic,
      estado,
      ultimoAcceso: '-'
    };

    // Obtener el arreglo de usuarios existente en localStorage
    const storedUsersString = localStorage.getItem('usuarios');
    let usuariosArray = [];
    if (storedUsersString) {
      try {
        usuariosArray = JSON.parse(storedUsersString);
        if (!Array.isArray(usuariosArray)) {
          usuariosArray = [];
        }
      } catch (error) {
        usuariosArray = [];
      }
    }
    // Agregar el nuevo usuario al arreglo existente
    usuariosArray.push(nuevoUsuario);
    // Guardar el arreglo actualizado en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuariosArray));

    // Redirigir a /login y pasar una bandera en el estado para mostrar el mensaje
    navigate('/login', { state: { mensajeRegistro: true } });
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <h2 className="text-center mb-4">Registro de Usuario</h2>
          {alert && <Alert variant={alert.variant}>{alert.message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formApellido" className="mt-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formUsuario" className="mt-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Elige un nombre de usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formCorreo" className="mt-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword" className="mt-3">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirma tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-4">
              Registrarse
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
