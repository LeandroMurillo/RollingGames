import React, { useContext } from 'react';
import { Table, Image, DropdownButton, Dropdown } from 'react-bootstrap';
import { UserContext } from '../UserContext.jsx';

export default function UsuariosAdmin() {
  const { usuarios, actualizarEstadoUsuario } = useContext(UserContext);

  // Se recibe el id del usuario para actualizar su estado
  const handleEstadoChange = (userId, nuevoEstado) => {
    actualizarEstadoUsuario(userId, nuevoEstado);
  };

  return (
    <div className="container mt-4">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="text-center">Nombre</th>
            <th className="text-center">Apellido</th>
            <th className="text-center">Usuario</th>
            <th className="text-center">Correo</th>
            <th className="text-center">Contraseña</th>
            <th className="text-center">Último Acceso</th>
            <th className="text-center">Foto de Perfil</th>
            <th className="text-center">Estado</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td className="text-center">{usuario.nombre}</td>
              <td className="text-center">{usuario.apellido}</td>
              <td className="text-center">{usuario.usuario}</td>
              <td className="text-center">{usuario.correo}</td>
              <td className="text-center">{usuario.password}</td>
              <td className="text-center">{usuario.ultimoAcceso}</td>
              <td className="text-center">
                {usuario.fotoPerfil ? (
                  <Image
                    src={usuario.fotoPerfil}
                    alt="Foto de Perfil"
                    roundedCircle
                    width="50"
                    height="50"
                  />
                ) : (
                  'Sin foto'
                )}
              </td>
              <td className="text-center">
                <DropdownButton
                  id={`dropdown-${usuario.id}`}
                  title={usuario.estado || 'Sin estado'}
                  onSelect={(selectedKey) => handleEstadoChange(usuario.id, selectedKey)}
                  disabled={usuario.usuario === 'root'}>
                  <Dropdown.Item eventKey="Pendiente">Pendiente</Dropdown.Item>
                  <Dropdown.Item eventKey="Aprobado">Aprobado</Dropdown.Item>
                  <Dropdown.Item eventKey="Suspendido">Suspendido</Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
