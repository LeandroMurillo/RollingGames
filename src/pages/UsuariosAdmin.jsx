import React, { useContext } from 'react';
import { Table, Image, DropdownButton, Dropdown } from 'react-bootstrap';
import { UserContext } from '../UserContext.jsx'; // Ajusta la ruta

export default function UsuariosAdmin() {
  const { usuarios, actualizarEstadoUsuario } = useContext(UserContext);

  const handleEstadoChange = (index, nuevoEstado) => {
    // Crea un objeto actualizado para el usuario y usa la función correcta del contexto
    actualizarEstadoUsuario(index, nuevoEstado);
  };

  return (
    <div className="container mt-4">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Usuario</th>
            <th>Correo</th>
            <th>Contraseña</th>
            <th>Último Acceso</th>
            <th>Foto de Perfil</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr key={index}>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.usuario}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.password}</td>
              <td>{usuario.ultimoAcceso}</td>
              <td>
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
              <td>
                <DropdownButton
                  id={`dropdown-${index}`}
                  title={usuario.estado || 'Sin estado'}
                  onSelect={(selectedKey) => handleEstadoChange(index, selectedKey)}>
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
