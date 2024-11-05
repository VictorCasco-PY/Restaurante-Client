import axios from "axios";
import React, { useEffect, useState } from "react";

const Mesa = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getMesas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/reservas/mesas/page/1"
        );
        setData(response.data.items);
      } catch (error) {
        console.log(error.message);
      }
    };

    getMesas();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Listado de Mesas</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Número de Mesa</th>
            <th>Capacidad</th>
            <th>Activo</th>
          </tr>
        </thead>
        <tbody>
          {data.map((mesa) => (
            <tr key={mesa.id}>
              <td>{mesa.id}</td>
              <td>{mesa.numeroMesa}</td>
              <td>{mesa.capacidad}</td>
              <td>{mesa.activo ? "Sí" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Mesa;
