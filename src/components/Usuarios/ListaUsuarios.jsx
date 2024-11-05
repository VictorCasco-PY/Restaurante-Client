import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [busquedaActiva, setBusquedaActiva] = useState(false);

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/usuarios/page/0"
      );
      setUsuarios(response.data); // Asumiendo que los usuarios están en `content`
    } catch (error) {
      console.error("Error obteniendo usuarios:", error);
    }
  };

  const buscarUsuarios = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8080/api/usuarios/search?nombre=${nombre}`
      );
      setUsuarios(response.data); // Actualiza la lista de usuarios con el resultado de la búsqueda
      setBusquedaActiva(true); // Indica que estamos en modo búsqueda
    } catch (error) {
      console.error("Error buscando usuarios:", error);
    }
  };

  useEffect(() => {
    if (!busquedaActiva) {
      obtenerUsuarios();
    }
  }, [busquedaActiva]);

  return (
    <div className="container mt-4">
      <h2>Listar Usuarios</h2>

      <form className="mb-3" onSubmit={buscarUsuarios}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Buscar
          </button>
        </div>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Direcciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.telefono}</td>
              <td>
                <ul>
                  {usuario.direcciones.map((direccion) => (
                    <li key={direccion.id}>
                      {direccion.ciudad}, {direccion.codigoPostal},{" "}
                      {direccion.calle}, {direccion.pais}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaUsuarios;
