import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Inicializamos el estado de usuarios leyendo de localStorage o, en su defecto, con el usuario root por defecto.
  // Se asigna una propiedad "id" única a cada usuario.
  const [usuarios, setUsuarios] = useState(() => {
    const storedUsuarios = localStorage.getItem('usuarios');
    if (storedUsuarios) {
      const parsedUsuarios = JSON.parse(storedUsuarios);
      // Si el arreglo está vacío, devolvemos el arreglo con el usuario root.
      if (parsedUsuarios && parsedUsuarios.length > 0) {
        return parsedUsuarios;
      }
    }
    return [
      {
        id: 'root', // Identificador único para el usuario root
        nombre: 'Root',
        apellido: 'User',
        usuario: 'root',
        correo: 'root@admin.com',
        password: 'root', // Nota: En producción, no se deben almacenar contraseñas en texto plano.
        ultimoAcceso: '',
        fotoPerfil: '',
        estado: 'Aprobado'
      }
    ];
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

  // Listener para sincronizar cambios entre pestañas
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'usuarios') {
        const newValue = event.newValue ? JSON.parse(event.newValue) : [];
        // Si se recibe un arreglo vacío, reestablecemos el usuario root.
        if (newValue.length === 0) {
          setUsuarios([
            {
              id: 'root',
              nombre: 'Root',
              apellido: 'User',
              usuario: 'root',
              correo: 'root@admin.com',
              password: 'root',
              ultimoAcceso: '',
              fotoPerfil: '',
              estado: 'Aprobado'
            }
          ]);
        } else {
          setUsuarios(newValue);
        }
      }
      if (event.key === 'usuario_logueado') {
        setUsuarioLogueado(event.newValue ? JSON.parse(event.newValue) : null);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Función para registrar un nuevo usuario. Se asigna un id único si no se proporciona.
  const registrarUsuario = (nuevoUsuario) => {
    if (!nuevoUsuario.id) {
      nuevoUsuario.id = Date.now().toString();
    }
    setUsuarios((prevUsuarios) => [...prevUsuarios, nuevoUsuario]);
  };

  // Función para actualizar el estado de un usuario (por ejemplo, desde UsuariosAdmin)
  const actualizarEstadoUsuario = (userId, nuevoEstado) => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((usuario) =>
        usuario.id === userId ? { ...usuario, estado: nuevoEstado } : usuario
      )
    );
  };

  // Función para actualizar el último acceso de un usuario (usada en Login)
  const actualizarUltimoAcceso = (userId) => {
    const newAccessTime = new Date().toLocaleString();
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((usuario) =>
        usuario.id === userId ? { ...usuario, ultimoAcceso: newAccessTime } : usuario
      )
    );
  };

  // Función que actualiza el último acceso en el array y, si corresponde, en el usuario logueado
  const actualizarUltimoAccesoYUsuarioLogueado = (userId) => {
    const newAccessTime = new Date().toLocaleString();
    setUsuarios((prevUsuarios) => {
      const updatedUsuarios = prevUsuarios.map((usuario) =>
        usuario.id === userId ? { ...usuario, ultimoAcceso: newAccessTime } : usuario
      );
      // Si el usuario logueado coincide con el usuario actualizado, se actualiza también en el estado global.
      const usuarioActualizado = updatedUsuarios.find((usuario) => usuario.id === userId);
      if (usuarioLogueado && usuarioActualizado.correo === usuarioLogueado.correo) {
        setUsuarioLogueado(usuarioActualizado);
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
