import React, { useState, useEffect } from 'react';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Hook para detectar el ancho de la ventana
const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
};

// Componente para la imagen del juego con efecto hover
const GameImage = ({ src, alt }) => {
  const [hover, setHover] = useState(false);

  return (
    <Image
      src={src}
      alt={alt}
      fluid
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '12px',
        transition: 'transform 0.3s ease-in-out',
        transform: hover ? 'scale(1.1)' : 'scale(1)'
      }}
    />
  );
};

const GameStack = ({ title, games }) => {
  const windowWidth = useWindowWidth();
  const totalGames = games.length;

  // Para móviles se muestra 1 juego a la vez; en escritorio, se muestra 5 si hay al menos 5, o el total si es menor.
  const visibleCount = windowWidth < 768 ? 1 : totalGames < 5 ? totalGames : 5;

  // Definimos el gap entre tarjetas (en px)
  const gap = 10;

  // Calculamos el ancho de cada tarjeta (valor numérico)
  let numericCardWidth;
  if (windowWidth < 768) {
    numericCardWidth = windowWidth;
  } else if (totalGames < 5) {
    numericCardWidth = (windowWidth - (totalGames - 1) * gap) / totalGames;
  } else {
    numericCardWidth = 200; // ancho fijo para 5 o más juegos
  }
  const cardWidth = `${numericCardWidth}px`;

  // Si hay menos de 5 juegos, usamos 100% del ancho; si no, calculamos el ancho visible
  const visibleAreaWidth =
    totalGames < 5 ? '100%' : `${visibleCount * numericCardWidth + (visibleCount - 1) * gap}px`;

  const [startIndex, setStartIndex] = useState(0);
  const offset = startIndex * (numericCardWidth + gap);

  const handleNext = () => {
    if (startIndex + visibleCount < totalGames) {
      setStartIndex(startIndex + visibleCount);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - visibleCount);
    }
  };

  return (
    <div className="mb-4 bg-dark text-light p-3 rounded">
      <div className={totalGames >= visibleCount ? 'ms-3' : 'ms-0'}>
        <h3 className="text-light">{title}</h3>
      </div>
      <div className="d-flex align-items-center">
        {totalGames >= visibleCount && (
          <Button variant="secondary" onClick={handlePrev} disabled={startIndex === 0}>
            &#8249;
          </Button>
        )}
        <div className="mx-2" style={{ width: visibleAreaWidth, overflow: 'hidden' }}>
          <div
            style={{
              display: 'flex',
              gap: `${gap}px`,
              transition: 'transform 0.4s ease-in-out',
              transform: `translateX(-${offset}px)`
            }}>
            {games.map((game, index) => (
              <div key={`${game.id}-${index}`} style={{ width: cardWidth, flexShrink: 0 }}>
                <Link
                  to={`/juegos/${game.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '300px',
                      overflow: 'hidden',
                      borderRadius: '12px'
                    }}>
                    <GameImage src={game.background_image} alt={game.name} />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        background: 'rgba(0, 0, 0, 0.6)',
                        color: 'white',
                        padding: '5px',
                        textAlign: 'center',
                        fontSize: '1.2rem'
                      }}>
                      {game.name}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        {totalGames >= visibleCount && (
          <Button
            variant="secondary"
            onClick={handleNext}
            disabled={startIndex + visibleCount >= totalGames}>
            &#8250;
          </Button>
        )}
      </div>
    </div>
  );
};

export default GameStack;
