import React from 'react';
import { Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BarraJuegos = ({ titulo, items = [] }) => {
  return (
    <div className="mb-4">
      <h3>{titulo}</h3>
      <Stack direction="horizontal" gap={3} className="flex-wrap">
        {items.map((game) => (
          <Link key={game.id} to={`/juegos/${game.slug}`} style={{ textDecoration: 'none' }}>
            <div style={{ width: '150px', cursor: 'pointer' }}>
              <img
                src={game.background_image}
                alt={game.name}
                style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: '4px' }}
              />
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#000' }}>{game.name}</p>
            </div>
          </Link>
        ))}
      </Stack>
    </div>
  );
};

export default BarraJuegos;
