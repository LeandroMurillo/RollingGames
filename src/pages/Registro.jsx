import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext.jsx';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const { registrarUsuario } = useContext(UserContext);

  // Ruta a la foto de perfil por defecto ubicada en la carpeta public
  // Asegúrate de que el nombre y la extensión coincidan con el archivo en public
  const defaultProfilePic = '/defaultProfilePic.png';
  // Estado inicial del usuario
  const estado = 'Pendiente';

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validación: no se aceptan campos vacíos
    if (
      !nombre.trim() ||
      !apellido.trim() ||
      !usuario.trim() ||
      !correo.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setAlert({
        message: 'Todos los campos son obligatorios. Por favor, completa la información.',
        variant: 'danger'
      });
      return;
    }

    // Validación: correo electrónico válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      setAlert({
        message: 'Por favor, ingresa un correo electrónico válido.',
        variant: 'danger'
      });
      return;
    }

    // Validación: las contraseñas deben coincidir
    if (password !== confirmPassword) {
      setAlert({
        message: 'Las contraseñas no coinciden. Inténtalo de nuevo.',
        variant: 'danger'
      });
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

    // Registra el usuario usando el contexto (se asignará un id único si no se proporciona)
    registrarUsuario(nuevoUsuario);

    // Redirige a /login y pasa una bandera en el estado para mostrar el mensaje de agradecimiento
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
