import React, { useState, useEffect } from "react";

// Componente reutilizable para tablas con paginación y buscador
const Table = ({ columns, data, itemsPerPage }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);

  // Filtrar los datos cuando cambia el término de búsqueda
  useEffect(() => {
    const filtered = data.filter((item) =>
      columns.some((column) =>
        item[column.accessor]
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reiniciar a la primera página cuando se realiza una búsqueda
  }, [searchTerm, data, columns]);

  // Calcular los índices de los elementos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar página
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Obtener el número total de páginas
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div>
      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-3"
      />

      {/* Tabla */}
      <table className="table table-striped">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor}>{column.Header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.accessor}>{row[column.accessor]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center">
                No se encontraron datos
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              <span className="page-link">{index + 1}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Table;
