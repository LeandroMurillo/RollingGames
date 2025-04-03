// Ejemplo de cambio en App.jsx o el componente de rutas
import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Error404 from './pages/Error404.jsx';
import Layout from './layouts/Layout.jsx';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import Contacto from './pages/Contacto.jsx';
import Admin from './pages/Admin.jsx';
import UsuariosAdmin from './pages/UsuariosAdmin.jsx';
import JuegosAdmin from './pages/JuegosAdmin.jsx';
import Juego from './pages/Juego.jsx';
import OlvideMiContraseña from './pages/OlvideMiContraseña.jsx';
import Home from './pages/Home.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import { UserContext, UserProvider } from './UserContext.jsx';
import JuegosProvider from './JuegosContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles.css';
import CustomNavbar from './components/CustomNavbar.jsx';
import Footer from './components/Footer.jsx';

function AppRoutes() {
  const { usuarioLogueado } = useContext(UserContext);

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/juegos/:slugJuego" element={<Juego />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/juegos" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Error404 />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/olvide-mi-contraseña" element={<OlvideMiContraseña />} />

      {/* Ruta protegida para admin */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute>
            {usuarioLogueado && usuarioLogueado.usuario === 'root' ? (
              <Admin />
            ) : (
              <>
                <CustomNavbar />
                <Error404 />
                <Footer />
              </>
            )}
          </PrivateRoute>
        }>
        <Route path="usuarios" element={<UsuariosAdmin />} />
        <Route path="juegos" element={<JuegosAdmin />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <UserProvider>
      <JuegosProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </JuegosProvider>
    </UserProvider>
  );
}
