import React, { useState } from "react";
import api from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CrearMesa = () => {
  const [numeroMesa, setNumeroMesa] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [activo, setActivo] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaMesa = {
      numeroMesa: parseInt(numeroMesa),
      capacidad: parseInt(capacidad),
      activo,
    };

    try {
      await api.post("/reservas/mesas", nuevaMesa);
      toast.success("Mesa creada exitosamente");
      setNumeroMesa("");
      setCapacidad("");
      setActivo(true);
    } catch (error) {
      toast.error("Error al crear la mesa");
      console.error("Error al crear mesa:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Crear Mesa</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="numeroMesa" className="form-label">
            Número de Mesa
          </label>
          <input
            type="number"
            className="form-control"
            id="numeroMesa"
            value={numeroMesa}
            onChange={(e) => setNumeroMesa(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="capacidad" className="form-label">
            Capacidad
          </label>
          <input
            type="number"
            className="form-control"
            id="capacidad"
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value)}
            required
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="activo"
            checked={activo}
            onChange={(e) => setActivo(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="activo">
            Activo
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Crear Mesa
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CrearMesa;
