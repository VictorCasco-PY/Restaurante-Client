import React from "react";

const Menu = () => {
  return (
    <div className="container mt-5">
      <h2>Crear Menú</h2>
      <form>
        {/* Campo para el nombre del menú */}
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre del Menú
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            placeholder="Ingresa el nombre del menú"
          />
        </div>

        {/* Campo para la descripción del menú */}
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripción del Menú
          </label>
          <textarea
            className="form-control"
            id="descripcion"
            rows="3"
            placeholder="Ingresa una descripción para el menú"
          ></textarea>
        </div>

        {/* Select para la categoría del menú */}
        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">
            Categoría del Menú
          </label>
          <select className="form-select" id="categoria">
            <option value="">Selecciona una categoría</option>
            <option value="entradas">Entradas</option>
            <option value="plato-principal">Plato Principal</option>
            <option value="postres">Postres</option>
            <option value="bebidas">Bebidas</option>
          </select>
        </div>

        {/* Botón para enviar el formulario */}
        <button type="submit" className="btn btn-primary">
          Crear Menú
        </button>
      </form>
    </div>
  );
};

export default Menu;
