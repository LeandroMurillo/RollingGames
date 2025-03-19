import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Error404 from './pages/Error404.jsx';
import Layout from './layouts/Layout.jsx';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import Juego from './pages/Juego.jsx';
import OlvideMiContraseña from './pages/OlvideMiContraseña.jsx';
import Home from './pages/Home.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/juegos/:idJuego" element={<Juego />} />
        </Route>
        <Route path="*" element={<Error404 />} />
        <Route path="/juegos" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/olvide-mi-contraseña" element={<OlvideMiContraseña />} />
      </Routes>
    </BrowserRouter>
  );
}
