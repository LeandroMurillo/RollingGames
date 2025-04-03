import React from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

export default function CustomNavbar() {
  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="navbar-logo"
          style={{ color: 'white', fontWeight: 'bold' }}>
          RollingGames
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" className="navbar-toggle" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto navbar-menu">
            <Nav.Link as={NavLink} to="/contacto">
              Contacto
            </Nav.Link>
            <Nav.Link as={NavLink} to="/sobre-nosotros">
              Sobre Nosotros
            </Nav.Link>
            <Nav.Link as={NavLink} to="/carrito">
              Carrito
            </Nav.Link>
            <Nav.Link as={NavLink} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={NavLink} to="/registro">
              Registrarse
            </Nav.Link>
          </Nav>
          <Form className="d-flex navbar-search">
            <FormControl
              type="search"
              placeholder="Buscar juegos..."
              className="me-2"
              aria-label="Search"
              id="search-input"
            />
            <Button variant="outline-primary" id="search-btn">
              🔍
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
