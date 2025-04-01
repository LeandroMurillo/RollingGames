import React, { useContext, useEffect } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../UserContext.jsx';

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUsuarioLogueado } = useContext(UserContext);

  useEffect(() => {
    // Si la ruta es exactamente "/admin", redirige a "/admin/usuarios"
    if (location.pathname === '/admin') {
      navigate('/admin/usuarios', { replace: true });
    }
  }, [location, navigate]);

  const handleLogout = () => {
    // Cierra la sesión eliminando el usuario logueado del estado global y localStorage
    setUsuarioLogueado(null);
    localStorage.removeItem('usuario_logueado');
    navigate('/login');
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            Panel de Administración
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Button variant="outline-danger" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <div className="container mt-4">
        <h2>Bienvenido</h2>
        <Nav variant="tabs" defaultActiveKey="/admin/usuarios">
          <Nav.Item>
            <Nav.Link
              as={NavLink}
              to="/admin/usuarios"
              className={({ isActive }) => (isActive ? 'fw-bold' : '')}>
              Usuarios
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={NavLink}
              to="/admin/juegos"
              className={({ isActive }) => (isActive ? 'fw-bold' : '')}>
              Juegos
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}
