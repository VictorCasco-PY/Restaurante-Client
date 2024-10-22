import React from "react";
import Table from "../Table/Table";
import { useSelector } from "react-redux";

const ListaReservas = () => {
  const count = useSelector((state) => state.counter.value);

  const data = [
    {
      fechaYHora: "2024-10-15 14:00",
      name: "Juan Pérez",
      estado: "Confirmada",
    },
    { fechaYHora: "2024-10-15 16:00", name: "Ana Gómez", estado: "Pendiente" },
    {
      fechaYHora: "2024-10-16 12:00",
      name: "Pedro Martínez",
      estado: "Cancelada",
    },
    // Más reservas...
  ];

  const columns = [
    { Header: "Fecha y hora", accessor: "fechaYHora" },
    { Header: "Cliente", accessor: "name" },
    { Header: "Estado", accessor: "estado" },
  ];
  return (
    <div className="container mt-5">
      <h2>Tabla de Reservas {count}</h2>
      <Table columns={columns} data={data} itemsPerPage={5} />
    </div>
  );
};

export default ListaReservas;
