import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Contacto = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Contáctanos</h1>
      <Form>
        <Form.Group controlId="formNombre" className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Ingresa tu nombre" />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Ingresa tu email" />
        </Form.Group>
        <Form.Group controlId="formMensaje" className="mb-3">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control as="textarea" rows={5} placeholder="Escribe tu mensaje" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </Container>
  );
};

export default Contacto;
