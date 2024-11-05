import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CrearMenu = () => {
  const [menu, setMenu] = useState({
    nombre: "",
    descripcion: "",
  });

  const [detalles, setDetalles] = useState([]);
  const [nuevoPlato, setNuevoPlato] = useState({
    nombrePlato: "",
    descripcion: "",
    precio: "",
  });

  const handleMenuChange = (e) => {
    const { name, value } = e.target;
    setMenu((prevMenu) => ({
      ...prevMenu,
      [name]: value,
    }));
  };

  const handlePlatoChange = (e) => {
    const { name, value } = e.target;
    setNuevoPlato((prevPlato) => ({
      ...prevPlato,
      [name]: value,
    }));
  };

  const agregarPlato = (e) => {
    e.preventDefault();
    if (nuevoPlato.nombrePlato && nuevoPlato.descripcion && nuevoPlato.precio) {
      setDetalles((prevDetalles) => [...prevDetalles, nuevoPlato]);
      setNuevoPlato({ nombrePlato: "", descripcion: "", precio: "" });
    }
  };

  const crearMenu = async (e) => {
    e.preventDefault();
    const data = {
      menu: {
        nombre: menu.nombre,
        descripcion: menu.descripcion,
      },
      detalles: detalles,
    };

    try {
      await axios.post("http://localhost:8080/api/menus", data);
      alert("Menú creado exitosamente");
      // Reiniciar el formulario si es necesario
      setMenu({ nombre: "", descripcion: "" });
      setDetalles([]);
    } catch (error) {
      console.error("Error al crear el menú:", error);
      alert("Error al crear el menú");
    }
  };

  return (
    <div className="container mt-4">
      <h1>Crear Menú</h1>
      <form onSubmit={crearMenu}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre del Menú
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={menu.nombre}
            onChange={handleMenuChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripción del Menú
          </label>
          <textarea
            className="form-control"
            id="descripcion"
            name="descripcion"
            value={menu.descripcion}
            onChange={handleMenuChange}
            required
          ></textarea>
        </div>

        <h4>Detalles del Menú</h4>
        <div className="mb-3">
          <label htmlFor="nombrePlato" className="form-label">
            Nombre del Plato
          </label>
          <input
            type="text"
            className="form-control"
            id="nombrePlato"
            name="nombrePlato"
            value={nuevoPlato.nombrePlato}
            onChange={handlePlatoChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcionPlato" className="form-label">
            Descripción del Plato
          </label>
          <textarea
            className="form-control"
            id="descripcionPlato"
            name="descripcion"
            value={nuevoPlato.descripcion}
            onChange={handlePlatoChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="precio" className="form-label">
            Precio del Plato
          </label>
          <input
            type="number"
            className="form-control"
            id="precio"
            name="precio"
            value={nuevoPlato.precio}
            onChange={handlePlatoChange}
            required
            step="0.01"
          />
        </div>
        <button className="btn btn-primary" onClick={agregarPlato}>
          Agregar Plato
        </button>

        <h5 className="mt-4">Platos Agregados</h5>
        <ul className="list-group mb-3">
          {detalles.map((detalle, index) => (
            <li key={index} className="list-group-item">
              {detalle.nombrePlato} - {detalle.descripcion} - ${detalle.precio}
            </li>
          ))}
        </ul>

        <button type="submit" className="btn btn-success">
          Crear Menú
        </button>
      </form>
    </div>
  );
};

export default CrearMenu;
