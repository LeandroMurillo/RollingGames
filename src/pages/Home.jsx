import React, { useContext } from 'react';
import { JuegosContext } from '../JuegosContext';
import { Container, Spinner, Alert } from 'react-bootstrap';
import GameStack from '../components/GameStack';

const Home = () => {
  const { juegos, loading, error } = useContext(JuegosContext);

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

  // Agrupamos los juegos por cada género, filtrando duplicados en cada categoría
  const genreGroups = {};
  juegos.forEach((game) => {
    if (game.genres && game.genres.length > 0) {
      game.genres.forEach((genre) => {
        const genreName = genre.name;
        if (!genreGroups[genreName]) {
          genreGroups[genreName] = [];
        }
        // Agregar el juego solo si no está ya presente en la categoría
        if (!genreGroups[genreName].some((g) => g.id === game.id)) {
          genreGroups[genreName].push(game);
        }
      });
    }
  });

  return (
    <Container className="mt-3">
      {Object.keys(genreGroups).map((genreName) => (
        <GameStack key={genreName} title={genreName} games={genreGroups[genreName]} />
      ))}
    </Container>
  );
};

export default Home;
