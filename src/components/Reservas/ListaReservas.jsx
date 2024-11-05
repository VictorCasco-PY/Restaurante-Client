import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ListaReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [clientes, setClientes] = useState({}); // Almacenaremos los nombres de los clientes aquí

  const fetchReservas = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/reservas/page/${page}`
      );
      setReservas(response.data.items);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      await fetchClientes(response.data.items); // Llama a fetchClientes con las reservas
    } catch (error) {
      console.error("Error fetching reservas:", error);
    }
  };

  const fetchClientes = async (reservas) => {
    const uniqueClienteIds = [
      ...new Set(reservas.map((reserva) => reserva.clienteId)),
    ];

    const clientePromises = uniqueClienteIds.map(async (clienteId) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/usuarios/${clienteId}`
        );
        return { id: response.data.id, nombre: response.data.nombre };
      } catch (error) {
        console.error(`Error fetching cliente con ID ${clienteId}:`, error);
        return { id: clienteId, nombre: "Desconocido" }; // En caso de error, asigna "Desconocido"
      }
    });

    const clienteData = await Promise.all(clientePromises);
    const clienteMap = clienteData.reduce((acc, cliente) => {
      acc[cliente.id] = cliente.nombre;
      return acc;
    }, {});

    setClientes(clienteMap); // Almacena los nombres en el estado
  };

  useEffect(() => {
    fetchReservas(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mt-4">
      <h1>Reservas</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Fecha Reserva</th>
            <th>Estado</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.id}</td>
              <td>{clientes[reserva.clienteId] || "Cargando..."}</td>
              <td>{new Date(reserva.fechaReserva).toLocaleString()}</td>
              <td>{reserva.estado}</td>
              <td>
                <ul>
                  {reserva.detalles.map((detalle, index) => (
                    <li key={index}>
                      Mesa ID: {detalle.mesaId}, Número de Personas:{" "}
                      {detalle.numeroPersonas}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {[...Array(totalPages).keys()].map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(page)}
              >
                {page + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ListaReservas;
