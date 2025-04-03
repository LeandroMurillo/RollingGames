import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Inicializamos el estado de usuarios leyendo de localStorage o, en su defecto, con el usuario root por defecto
  const [usuarios, setUsuarios] = useState(() => {
    const storedUsuarios = localStorage.getItem('usuarios');
    if (storedUsuarios) {
      return JSON.parse(storedUsuarios);
    } else {
      return [
        {
          nombre: 'Root',
          apellido: 'User',
          usuario: 'root',
          correo: 'root@admin.com',
          password: 'root',
          ultimoAcceso: '',
          fotoPerfil: '',
          estado: 'Aprobado'
        }
      ];
    }
  });

  // Estado para guardar el usuario logueado, inicializado a partir de localStorage (o null)
  const [usuarioLogueado, setUsuarioLogueado] = useState(() => {
    const storedUser = localStorage.getItem('usuario_logueado');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Sincronizamos los estados con localStorage
  useEffect(() => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }, [usuarios]);

  useEffect(() => {
    if (usuarioLogueado) {
      localStorage.setItem('usuario_logueado', JSON.stringify(usuarioLogueado));
    } else {
      localStorage.removeItem('usuario_logueado');
    }
  }, [usuarioLogueado]);

  // Función para registrar un nuevo usuario
  const registrarUsuario = (nuevoUsuario) => {
    setUsuarios((prevUsuarios) => [...prevUsuarios, nuevoUsuario]);
  };

  // Función para actualizar el estado de un usuario (por ejemplo, desde UsuariosAdmin)
  const actualizarEstadoUsuario = (index, nuevoEstado) => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((usuario, i) =>
        i === index ? { ...usuario, estado: nuevoEstado } : usuario
      )
    );
  };

  // Función para actualizar el último acceso de un usuario (usada en Login)
  const actualizarUltimoAcceso = (index) => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((usuario, i) =>
        i === index ? { ...usuario, ultimoAcceso: new Date().toLocaleString() } : usuario
      )
    );
  };

  // Función que actualiza el último acceso en el array y, si corresponde, en el usuario logueado
  const actualizarUltimoAccesoYUsuarioLogueado = (index) => {
    const newAccessTime = new Date().toLocaleString();
    setUsuarios((prevUsuarios) => {
      const updatedUsuarios = prevUsuarios.map((usuario, i) =>
        i === index ? { ...usuario, ultimoAcceso: newAccessTime } : usuario
      );
      // Si el usuario logueado coincide con el usuario actualizado, se actualiza también en el estado global.
      if (usuarioLogueado && updatedUsuarios[index].correo === usuarioLogueado.correo) {
        setUsuarioLogueado(updatedUsuarios[index]);
      }
      return updatedUsuarios;
    });
  };

  return (
    <UserContext.Provider
      value={{
        usuarios,
        usuarioLogueado,
        setUsuarioLogueado,
        registrarUsuario,
        actualizarEstadoUsuario,
        actualizarUltimoAcceso,
        actualizarUltimoAccesoYUsuarioLogueado
      }}>
      {children}
    </UserContext.Provider>
  );
};
