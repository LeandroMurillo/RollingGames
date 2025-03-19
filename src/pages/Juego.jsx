import { useParams } from 'react-router-dom';

export default function Juego() {
  const { idJuego } = useParams();
  return (
    <>
      <p>la página del Juego {idJuego} funciona!</p>
    </>
  );
}
