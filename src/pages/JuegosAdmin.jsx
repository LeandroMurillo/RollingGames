import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const JuegosAdmin = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Administración de Juegos</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre del Juego</th>
            <th>Género</th>
            <th>Desarrollador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>The Adventure Quest</td>
            <td>Aventura</td>
            <td>Game Studio</td>
            <td>
              <Button variant="warning" className="me-2">
                Editar
              </Button>
              <Button variant="danger">Eliminar</Button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Puzzle Mania</td>
            <td>Puzzle</td>
            <td>Puzzle Masters</td>
            <td>
              <Button variant="warning" className="me-2">
                Editar
              </Button>
              <Button variant="danger">Eliminar</Button>
            </td>
          </tr>
          {/* Añade más filas según sea necesario */}
        </tbody>
      </Table>
      <Button variant="primary">Añadir Nuevo Juego</Button>
    </Container>
  );
};

export default JuegosAdmin;
