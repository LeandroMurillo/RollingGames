import React, { useEffect, useState, useContext } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Carousel,
  Badge,
  Spinner,
  Alert,
  Button
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { JuegosContext } from '../JuegosContext';

const Juego = () => {
  // Ahora se extrae correctamente "slugJuego" de la URL
  const { slugJuego } = useParams();
  const { fetchGameDetail } = useContext(JuegosContext);

  const [gameDetail, setGameDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGameDetail = async () => {
      try {
        const detail = await fetchGameDetail(slugJuego);
        setGameDetail(detail);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadGameDetail();
  }, [slugJuego, fetchGameDetail]);

  if (loading) {
    return (
      <Container className="my-4 text-center bg-dark text-light">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-4 bg-dark text-light">
        <Alert variant="danger" className="bg-danger text-white">
          Error: {error}
        </Alert>
      </Container>
    );
  }

  const images = [];
  if (gameDetail.background_image) images.push(gameDetail.background_image);
  const categories = gameDetail.genres || [];

  return (
    <Container className="my-4 bg-dark text-light">
      <Card className="bg-dark text-light border-0">
        <Card.Header className="bg-dark text-light border-bottom border-secondary">
          <h2>{gameDetail.name}</h2>
          <div>
            {categories.map((genre, index) => (
              <Badge key={index} bg="secondary" className="me-1">
                {genre.name}
              </Badge>
            ))}
          </div>
        </Card.Header>
        <Card.Body>
          <Row className="justify-content-center">
            <Col md={8} xs={12}>
              {images.length > 0 ? (
                <Carousel>
                  {images.map((img, idx) => (
                    <Carousel.Item key={idx}>
                      <img className="d-block w-100" src={img} alt={`Slide ${idx + 1}`} />
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <p className="text-center">No hay imágenes disponibles</p>
              )}
            </Col>
            <Col md={4} xs={12} className="mt-3 mt-md-0">
              <div className="p-3 border border-secondary rounded bg-dark text-light">
                <h4 className="text-center">Precio</h4>
                <p className="display-6 text-center">{gameDetail.price}</p>
                <div className="d-grid gap-2">
                  <Button variant="primary" size="lg">
                    Comprar
                  </Button>
                  <Button variant="outline-secondary" size="lg">
                    Añadir a la lista de deseos
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Card.Text as="div">
                <strong>Descripción:</strong>
              </Card.Text>
              <Card.Text as="div">
                {gameDetail.description ? gameDetail.description : 'Sin descripción disponible'}
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Juego;
