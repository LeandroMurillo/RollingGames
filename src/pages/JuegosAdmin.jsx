import React, { useContext } from 'react';
import { Container, Table, Image, Spinner, Alert, Button, Modal, Form } from 'react-bootstrap';
import { JuegosContext } from '../JuegosContext';

const JuegosAdmin = () => {
  const { juegos, loading, error, setJuegos } = useContext(JuegosContext);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedGame, setSelectedGame] = React.useState(null);
  const [modalDescription, setModalDescription] = React.useState('');
  const [modalPrice, setModalPrice] = React.useState('');

  const handleEditGame = (game) => {
    setSelectedGame(game);
    setShowModal(true);
    setModalDescription(game.description && game.description.trim() !== '' ? game.description : '');
    setModalPrice(game.price && game.price.trim() !== '' ? game.price : '$29.99');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedGame(null);
    setModalDescription('');
    setModalPrice('');
  };

  const handleSaveModal = () => {
    setJuegos((prevJuegos) => {
      const newGames = prevJuegos.map((game) =>
        game.id === selectedGame.id
          ? { ...game, description: modalDescription, price: modalPrice }
          : game
      );

      // Actualizamos las descripciones en localStorage
      const storedDescriptionsStr = localStorage.getItem('juegosDescriptions');
      const storedDescriptions = storedDescriptionsStr ? JSON.parse(storedDescriptionsStr) : {};
      storedDescriptions[selectedGame.id] = modalDescription;
      localStorage.setItem('juegosDescriptions', JSON.stringify(storedDescriptions));

      // Actualizamos también los precios en localStorage
      const storedPricesStr = localStorage.getItem('juegosPrices');
      const storedPrices = storedPricesStr ? JSON.parse(storedPricesStr) : {};
      storedPrices[selectedGame.id] = modalPrice;
      localStorage.setItem('juegosPrices', JSON.stringify(storedPrices));

      return newGames;
    });
    setShowModal(false);
  };

  // Función para actualizar el precio directamente en línea
  const handlePriceChange = (gameId, newPrice) => {
    setJuegos((prevJuegos) => {
      const updatedGames = prevJuegos.map((game) =>
        game.id === gameId ? { ...game, price: newPrice } : game
      );

      // Actualizamos los precios en localStorage
      const storedPricesStr = localStorage.getItem('juegosPrices');
      const storedPrices = storedPricesStr ? JSON.parse(storedPricesStr) : {};
      storedPrices[gameId] = newPrice;
      localStorage.setItem('juegosPrices', JSON.stringify(storedPrices));

      return updatedGames;
    });
  };

  if (loading) {
    return (
      <Container className="my-4 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-4">
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h2>Tablero de Juegos</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Slug</th>
            <th>Géneros</th>
            <th>Rating</th>
            <th>Fecha de Lanzamiento</th>
            <th>Descripción</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {juegos.map((juego) => (
            <tr key={juego.id}>
              <td>{juego.id}</td>
              <td>
                {juego.background_image ? (
                  <Image
                    src={juego.background_image}
                    alt={juego.name}
                    fluid
                    style={{ maxWidth: '100px' }}
                  />
                ) : (
                  'Sin imagen'
                )}
              </td>
              <td>{juego.name}</td>
              <td>{juego.slug}</td>
              <td>
                {juego.genres && juego.genres.length > 0
                  ? juego.genres.map((g) => g.name).join(', ')
                  : 'Sin género'}
              </td>
              <td>{juego.rating}</td>
              <td>{juego.released}</td>
              <td>
                {/* Sólo se muestra el botón para editar la descripción */}
                <Button variant="warning" size="sm" onClick={() => handleEditGame(juego)}>
                  Editar
                </Button>
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={juego.price}
                  onChange={(e) => handlePriceChange(juego.id, e.target.value)}
                  style={{ maxWidth: '120px' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Juego - {selectedGame?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="descriptionTextarea">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={modalDescription}
                onChange={(e) => setModalDescription(e.target.value)}
                placeholder="Ingrese la descripción manualmente"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveModal}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default JuegosAdmin;
