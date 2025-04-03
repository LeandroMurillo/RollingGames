import React from 'react';
import Error404 from '../pages/Error404.jsx';

const PrivateRoute = ({ children }) => {
  // Se lee el usuario desde la prop del componente padre (ya no se lee de localStorage aquí)
  // El componente App se encarga de pasar el usuarioLogueado mediante ProtectedAdmin
  // Por eso, si no hay usuario logueado, se muestra la 404.
  return children;
};

export default PrivateRoute;
