import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { UserContext } from '../UserContext.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMsg, setAlertMsg] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { usuarios, setUsuarioLogueado, actualizarUltimoAcceso } = useContext(UserContext);

  useEffect(() => {
    // Si se pasó la bandera del registro, mostramos el mensaje de agradecimiento.
    if (location.state && location.state.mensajeRegistro) {
      setAlertMsg({
        message: (
          <>
            Gracias por registrarte en nuestro sitio, intenta loguearte más tarde. Mientras tanto
            sigue navegando nuestro catálogo de juegos <Link to="/">aquí</Link>.
          </>
        ),
        variant: 'info'
      });
      // Limpiar el estado de la navegación para evitar que el mensaje se muestre nuevamente
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (usuarios && usuarios.length > 0) {
      // Buscamos un usuario que coincida en correo y contraseña
      const userCandidate = usuarios.find(
        (user) => user.correo === email && user.password === password
      );

      if (userCandidate) {
        if (userCandidate.estado === 'Aprobado') {
          // Usuario aprobado: actualizamos el último acceso usando el id y asignamos el usuario logueado
          const newAccessTime = new Date().toLocaleString();
          actualizarUltimoAcceso(userCandidate.id);
          const updatedUser = { ...userCandidate, ultimoAcceso: newAccessTime };
          setUsuarioLogueado(updatedUser);
          setAlertMsg({ message: 'Inicio de sesión correcto', variant: 'success' });
          if (updatedUser.usuario === 'root') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        } else if (userCandidate.estado === 'Pendiente') {
          // Usuario en estado Pendiente: mostramos mensaje informativo
          setAlertMsg({
            message: 'Tu cuenta aún no se encuentra activada. Inténtalo más tarde',
            variant: 'warning'
          });
        } else {
          // Cualquier otro caso se trata como credenciales incorrectas
          setAlertMsg({
            message: 'Usuario o Contraseña incorrectos, vuelva a intentarlo',
            variant: 'danger'
          });
        }
      } else {
        setAlertMsg({
          message: 'Usuario o Contraseña incorrectos, vuelva a intentarlo',
          variant: 'danger'
        });
      }
    } else {
      setAlertMsg({ message: 'No existe ningún usuario registrado', variant: 'danger' });
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={4}>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          {alertMsg && <Alert variant={alertMsg.variant}>{alertMsg.message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-4">
              Ingresar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
