import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CrearReserva = () => {
  const [clienteId, setClienteId] = useState(null);
  const [nombreCliente, setNombreCliente] = useState("");
  const [clientes, setClientes] = useState([]);
  const [fechaReserva, setFechaReserva] = useState("");
  const [estado, setEstado] = useState("Confirmada");
  const [mesas, setMesas] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [mesaId, setMesaId] = useState("");
  const [numeroPersonas, setNumeroPersonas] = useState("");

  // Fetch mesas
  const fetchMesas = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/reservas/mesas/page/1"
      );
      setMesas(response.data.items);
    } catch (error) {
      console.error("Error fetching mesas:", error);
    }
  };

  // Fetch clientes based on name
  const fetchClientes = async (nombre) => {
    if (nombre) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/usuarios/search?nombre=${nombre}`
        );
        setClientes(response.data); // Suponiendo que devuelve una lista de usuarios
      } catch (error) {
        console.error("Error fetching clientes:", error);
      }
    } else {
      setClientes([]); // Limpiar los clientes si no hay nombre
    }
  };

  useEffect(() => {
    fetchMesas();
  }, []);

  const handleClienteSearch = (e) => {
    const { value } = e.target;
    setNombreCliente(value);
    fetchClientes(value); // Llamar a la función de búsqueda
  };

  const handleClienteSelect = (cliente) => {
    setClienteId(cliente.id);
    setNombreCliente(cliente.nombre); // Establecer el nombre del cliente seleccionado
    setClientes([]); // Limpiar la lista de clientes después de seleccionar uno
  };

  const handleAgregarDetalle = () => {
    if (mesaId && numeroPersonas) {
      setDetalles([
        ...detalles,
        { mesaId: parseInt(mesaId), numeroPersonas: parseInt(numeroPersonas) },
      ]);
      setMesaId("");
      setNumeroPersonas("");
    }
  };

  const handleCrearReserva = async (e) => {
    e.preventDefault();
    const reserva = {
      clienteId,
      fechaReserva,
      estado,
      detalles,
    };
    try {
      await axios.post("http://localhost:8080/api/reservas", reserva);
      alert("Reserva creada con éxito");
      // Resetea el formulario
      setFechaReserva("");
      setDetalles([]);
      setClienteId(null);
      setNombreCliente(""); // Limpiar el campo de nombre
      setClientes([]); // Limpiar lista de clientes
    } catch (error) {
      console.error("Error creando reserva:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Crear Reserva</h2>
      <form onSubmit={handleCrearReserva}>
        <div className="mb-3">
          <label htmlFor="nombreCliente" className="form-label">
            Nombre del Cliente
          </label>
          <input
            type="text"
            className="form-control"
            id="nombreCliente"
            value={nombreCliente}
            onChange={handleClienteSearch}
            required
          />
          {nombreCliente && (
            <ul className="list-group">
              {clientes.map((cliente) => (
                <li
                  key={cliente.id}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleClienteSelect(cliente)}
                >
                  {cliente.nombre}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="fechaReserva" className="form-label">
            Fecha Reserva
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="fechaReserva"
            value={fechaReserva}
            onChange={(e) => setFechaReserva(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mesaId" className="form-label">
            Mesa
          </label>
          <select
            className="form-select"
            id="mesaId"
            value={mesaId}
            onChange={(e) => setMesaId(e.target.value)}
          >
            <option value="">Seleccionar mesa</option>
            {mesas.map((mesa) => (
              <option key={mesa.id} value={mesa.id}>
                Mesa {mesa.numeroMesa} (Capacidad: {mesa.capacidad})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="numeroPersonas" className="form-label">
            Número de Personas
          </label>
          <input
            type="number"
            className="form-control"
            id="numeroPersonas"
            value={numeroPersonas}
            onChange={(e) => setNumeroPersonas(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAgregarDetalle}
        >
          Agregar Detalle
        </button>

        <h4 className="mt-3">Detalles Agregados</h4>
        <ul className="list-group mb-3">
          {detalles.map((detalle, index) => (
            <li key={index} className="list-group-item">
              Mesa ID: {detalle.mesaId}, Número de Personas:{" "}
              {detalle.numeroPersonas}
            </li>
          ))}
        </ul>

        <button type="submit" className="btn btn-success">
          Crear Reserva
        </button>
      </form>
    </div>
  );
};

export default CrearReserva;
