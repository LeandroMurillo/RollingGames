import React, { createContext, useState, useEffect } from 'react';

export const JuegosContext = createContext();

export const JuegosProvider = ({ children }) => {
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Al iniciar, se usan los datos de localStorage si existen y no están vacíos;
  // de lo contrario se hace fetch a la API.
  useEffect(() => {
    const storedJuegosStr = localStorage.getItem('juegos');
    if (storedJuegosStr) {
      const parsedJuegos = JSON.parse(storedJuegosStr);
      if (parsedJuegos && parsedJuegos.length > 0) {
        setJuegos(parsedJuegos);
        setLoading(false);
        return;
      }
    }

    const fetchGames = async () => {
      try {
        // Se aumenta el page_size para obtener más juegos (ej. 100)
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&page_size=100`
        );
        if (!response.ok) {
          throw new Error('Error al obtener los juegos');
        }
        const data = await response.json();
        const apiGames = data.results.map((game) => ({
          id: game.id,
          slug: game.slug,
          name: game.name,
          background_image: game.background_image,
          // Conservamos el arreglo completo de géneros
          genres: game.genres || [],
          rating: game.rating,
          released: game.released,
          description: '', // inicializamos la descripción como vacía
          price: '$29.99' // precio por defecto
        }));

        // Fusionamos con descripciones almacenadas
        const storedDescriptionsStr = localStorage.getItem('juegosDescriptions');
        const storedDescriptions = storedDescriptionsStr ? JSON.parse(storedDescriptionsStr) : {};
        // Fusionamos con precios almacenados
        const storedPricesStr = localStorage.getItem('juegosPrices');
        const storedPrices = storedPricesStr ? JSON.parse(storedPricesStr) : {};

        const mergedGames = apiGames.map((apiGame) => {
          let newGame = { ...apiGame };
          if (storedDescriptions[apiGame.id] && storedDescriptions[apiGame.id].trim() !== '') {
            newGame.description = storedDescriptions[apiGame.id];
          }
          if (storedPrices[apiGame.id] && storedPrices[apiGame.id].trim() !== '') {
            newGame.price = storedPrices[apiGame.id];
          }
          return newGame;
        });

        setJuegos(mergedGames);
        localStorage.setItem('juegos', JSON.stringify(mergedGames));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Actualizamos localStorage cada vez que cambia el arreglo de juegos
  useEffect(() => {
    localStorage.setItem('juegos', JSON.stringify(juegos));
  }, [juegos]);

  // Función para obtener el detalle de un juego por slug
  const fetchGameDetail = async (slug) => {
    const game = juegos.find((g) => g.slug === slug);
    if (game) return game;

    // En caso poco probable de no encontrar el juego, se hace fetch a la API.
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games/${slug}?key=${import.meta.env.VITE_API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Error al obtener la información del juego');
      }
      const data = await response.json();
      const newGame = {
        id: data.id,
        slug: data.slug,
        name: data.name,
        background_image: data.background_image,
        genres: data.genres || [],
        rating: data.rating,
        released: data.released,
        description: '',
        price: '$29.99'
      };
      setJuegos((prev) => {
        if (!prev.find((g) => g.slug === newGame.slug)) {
          return [...prev, newGame];
        }
        return prev;
      });
      return newGame;
    } catch (err) {
      throw err;
    }
  };

  return (
    <JuegosContext.Provider value={{ juegos, loading, error, setJuegos, fetchGameDetail }}>
      {children}
    </JuegosContext.Provider>
  );
};

export default JuegosProvider;
