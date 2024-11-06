import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Mesa = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingMesa, setEditingMesa] = useState({
    numeroMesa: "",
    capacidad: "",
    activo: true,
  });

  const getMesas = async () => {
    try {
      const response = await api.get("/reservas/mesas/page/1");
      setData(response.data.items);
    } catch (error) {
      console.error("Error fetching mesas:", error.message);
    }
  };

  useEffect(() => {
    getMesas();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la mesa de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/reservas/mesas/${id}`);
          toast.success("Mesa eliminada con éxito");
          getMesas(); // Actualizar la lista de mesas
        } catch (error) {
          toast.error("Error al eliminar la mesa");
          console.error("Error deleting mesa:", error);
        }
      }
    });
  };

  const handleEditClick = (mesa) => {
    setEditingMesa(mesa);
    setModalVisible(true);
  };

  const handleSaveEdit = async () => {
    try {
      await api.put(`/reservas/mesas/${editingMesa.id}`, editingMesa);
      toast.success("Mesa actualizada con éxito");
      setModalVisible(false);
      getMesas();
    } catch (error) {
      toast.error("Error al actualizar la mesa");
      console.error("Error updating mesa:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Listado de Mesas</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Número de Mesa</th>
            <th>Capacidad</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((mesa) => (
            <tr key={mesa.id}>
              <td>{mesa.numeroMesa}</td>
              <td>{mesa.capacidad}</td>
              <td>{mesa.activo ? "Sí" : "No"}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEditClick(mesa)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(mesa.id)}
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de edición */}
      {modalVisible && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Mesa</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalVisible(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="numeroMesa" className="form-label">
                      Número de Mesa
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="numeroMesa"
                      value={editingMesa.numeroMesa}
                      onChange={(e) =>
                        setEditingMesa({
                          ...editingMesa,
                          numeroMesa: e.target.value,
                        })
                      }
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
                      value={editingMesa.capacidad}
                      onChange={(e) =>
                        setEditingMesa({
                          ...editingMesa,
                          capacidad: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="activo"
                      checked={editingMesa.activo}
                      onChange={(e) =>
                        setEditingMesa({
                          ...editingMesa,
                          activo: e.target.checked,
                        })
                      }
                    />
                    <label className="form-check-label" htmlFor="activo">
                      Activo
                    </label>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setModalVisible(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveEdit}
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Mesa;
