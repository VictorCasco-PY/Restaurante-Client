import React, { useState } from "react";

const TableComponent = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); // Reset to first page on new search
  };

  const filteredItems = data.items.filter((item) => {
    return item.estado.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const paginatedItems = filteredItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por estado"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "10px", padding: "5px" }}
      />
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente ID</th>
            <th>Fecha Reserva</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.clienteId}</td>
              <td>{new Date(item.fechaReserva).toLocaleString()}</td>
              <td>{item.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
        >
          Anterior
        </button>
        <span style={{ margin: "0 10px" }}>
          Página {currentPage + 1} de {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
          }
          disabled={currentPage === totalPages - 1}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
