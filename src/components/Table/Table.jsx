// Table.js
import React, { useState, useEffect } from "react";

// Componente reutilizable para tablas con paginación y buscador
const Table = ({
  columns,
  data,
  itemsPerPage,
  totalItems,
  currentPage,
  setCurrentPage,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
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
    setCurrentPage(0); // Reiniciar a la primera página (0) cuando se realiza una búsqueda
  }, [searchTerm, data, columns, setCurrentPage]);

  // Calcular los índices de los elementos a mostrar en la página actual
  const indexOfLastItem = (currentPage + 1) * itemsPerPage; // Usamos (currentPage + 1) para la lógica
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Cambia el estado de la página actual
  };

  // Obtener el número total de páginas
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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
              key={index}
              className={`page-item ${currentPage === index ? "active" : ""}`} // Cambiar a index
              onClick={() => handlePageChange(index)} // Cambiar a index
              style={{ cursor: "pointer" }} // Asegúrate de que el cursor se vea como un puntero
            >
              <span className="page-link">{index + 1}</span>{" "}
              {/* Mostrar como index + 1 */}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Table;
