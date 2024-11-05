import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CrearUsuario = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direcciones, setDirecciones] = useState([]);
  const [ciudad, setCiudad] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [calle, setCalle] = useState("");
  const [pais, setPais] = useState("");

  const handleAgregarDireccion = () => {
    if (ciudad && codigoPostal && calle && pais) {
      setDirecciones([...direcciones, { ciudad, codigoPostal, calle, pais }]);
      setCiudad("");
      setCodigoPostal("");
      setCalle("");
      setPais("");
    }
  };

  const handleCrearUsuario = async (e) => {
    e.preventDefault();
    const usuario = {
      nombre,
      correo,
      telefono,
      direcciones,
    };
    try {
      await axios.post("http://localhost:8080/api/usuarios", usuario);
      alert("Usuario creado con éxito");
      // Resetea el formulario
      setNombre("");
      setCorreo("");
      setTelefono("");
      setDirecciones([]);
    } catch (error) {
      console.error("Error creando usuario:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Crear Usuario</h2>
      <form onSubmit={handleCrearUsuario}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="correo" className="form-label">
            Correo
          </label>
          <input
            type="email"
            className="form-control"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">
            Teléfono
          </label>
          <input
            type="tel"
            className="form-control"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>

        <h4 className="mt-3">Direcciones</h4>

        <div className="mb-3">
          <label htmlFor="ciudad" className="form-label">
            Ciudad
          </label>
          <input
            type="text"
            className="form-control"
            id="ciudad"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="codigoPostal" className="form-label">
            Código Postal
          </label>
          <input
            type="text"
            className="form-control"
            id="codigoPostal"
            value={codigoPostal}
            onChange={(e) => setCodigoPostal(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="calle" className="form-label">
            Calle
          </label>
          <input
            type="text"
            className="form-control"
            id="calle"
            value={calle}
            onChange={(e) => setCalle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="pais" className="form-label">
            País
          </label>
          <input
            type="text"
            className="form-control"
            id="pais"
            value={pais}
            onChange={(e) => setPais(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="btn btn-secondary mb-3"
          onClick={handleAgregarDireccion}
        >
          Agregar Dirección
        </button>

        <h4 className="mt-3">Direcciones Agregadas</h4>
        <ul className="list-group mb-3">
          {direcciones.map((direccion, index) => (
            <li key={index} className="list-group-item">
              {direccion.ciudad}, {direccion.codigoPostal}, {direccion.calle},{" "}
              {direccion.pais}
            </li>
          ))}
        </ul>

        <button type="submit" className="btn btn-success">
          Crear Usuario
        </button>
      </form>
    </div>
  );
};

export default CrearUsuario;
