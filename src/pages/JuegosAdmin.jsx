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
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="text-center">ID</th>
            <th className="text-center">Imagen</th>
            <th className="text-center">Nombre</th>
            <th className="text-center">Slug</th>
            <th className="text-center">Géneros</th>
            <th className="text-center">Rating</th>
            <th className="text-center">Fecha de Lanzamiento</th>
            <th className="text-center">Descripción</th>
            <th className="text-center">Precio</th>
          </tr>
        </thead>
        <tbody>
          {juegos.map((juego) => (
            <tr key={juego.id}>
              <td className="text-center">{juego.id}</td>
              <td className="text-center">
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
              <td className="text-center">{juego.name}</td>
              <td className="text-center">{juego.slug}</td>
              <td className="text-center">
                {juego.genres && juego.genres.length > 0
                  ? juego.genres.map((g) => g.name).join(', ')
                  : 'Sin género'}
              </td>
              <td className="text-center">{juego.rating}</td>
              <td className="text-center">{juego.released}</td>
              <td className="text-center">
                <Button variant="warning" size="sm" onClick={() => handleEditGame(juego)}>
                  Editar
                </Button>
              </td>
              <td className="text-center">
                <Form.Control
                  type="text"
                  value={juego.price}
                  onChange={(e) => handlePriceChange(juego.id, e.target.value)}
                  style={{ maxWidth: '120px', margin: '0 auto' }}
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
