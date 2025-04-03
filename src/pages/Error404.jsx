import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Error404 = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1 className="display-4">404</h1>
          <p className="lead">¡Oops! La página que buscas no existe.</p>
          <Button variant="primary" href="/">
            Volver al inicio
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Error404;