import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button, Form } from "react-bootstrap";

const ListaReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [clientes, setClientes] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState([]);
  const [searchName, setSearchName] = useState(""); // Nuevo estado para el nombre
  const [filterEstado, setFilterEstado] = useState(""); // Nuevo estado para el estado

  const fetchReservas = async (page) => {
    try {
      const response = await api.get(`/reservas/page/${page}`);
      setReservas(response.data.items);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      await fetchClientes(response.data.items);
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
        return { id: clienteId, nombre: "Desconocido" };
      }
    });

    const clienteData = await Promise.all(clientePromises);
    const clienteMap = clienteData.reduce((acc, cliente) => {
      acc[cliente.id] = cliente.nombre;
      return acc;
    }, {});

    setClientes(clienteMap);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/reservas/${id}`);
        toast.success("Reserva eliminada con éxito");
        fetchReservas(currentPage);
      } catch (error) {
        toast.error("Error al eliminar la reserva");
      }
    }
  };

  const handleEdit = (reserva) => {
    setSelectedReserva(reserva);
    setUpdatedDetails(reserva.detalles);
    setShowModal(true);
  };

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...updatedDetails];
    newDetails[index] = {
      ...newDetails[index],
      [field]: value,
    };
    setUpdatedDetails(newDetails);
  };

  const handleSave = async () => {
    try {
      const updatedReserva = {
        clienteId: selectedReserva.clienteId,
        fechaReserva: selectedReserva.fechaReserva,
        estado: selectedReserva.estado,
        detalles: updatedDetails,
      };
      await api.put(`/reservas/${selectedReserva.id}`, updatedReserva);
      toast.success("Reserva actualizada con éxito");
      fetchReservas(currentPage);
      setShowModal(false);
    } catch (error) {
      toast.error("Error al actualizar la reserva");
    }
  };

  useEffect(() => {
    fetchReservas(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Filtrar las reservas según el nombre del cliente y el estado
  const filteredReservas = reservas.filter((reserva) => {
    const clienteNombre = clientes[reserva.clienteId] || "";
    const matchesName = clienteNombre
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const matchesEstado = filterEstado ? reserva.estado === filterEstado : true;
    return matchesName && matchesEstado;
  });

  return (
    <div className="container mt-4">
      <h1>Reservas</h1>

      {/* Filtros de búsqueda */}
      <div className="mb-3">
        <Form.Control
          type="text"
          placeholder="Buscar por nombre de cliente"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="mb-2"
        />
        <Form.Select
          value={filterEstado}
          onChange={(e) => setFilterEstado(e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="Confirmada">Confirmada</option>
          <option value="Cancelada">Cancelada</option>
        </Form.Select>
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Fecha Reserva</th>
            <th>Estado</th>
            <th>Detalles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservas.map((reserva) => (
            <tr key={reserva.id}>
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
              <td>
                <button
                  className="btn btn-warning mx-2"
                  onClick={() => handleEdit(reserva)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(reserva.id)}
                >
                  Eliminar
                </button>
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
      <ToastContainer />

      {/* Modal para editar reserva */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Reserva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Fecha Reserva</Form.Label>
              <Form.Control
                type="datetime-local"
                value={selectedReserva ? selectedReserva.fechaReserva : ""}
                onChange={(e) =>
                  setSelectedReserva({
                    ...selectedReserva,
                    fechaReserva: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                value={selectedReserva ? selectedReserva.estado : ""}
                onChange={(e) =>
                  setSelectedReserva({
                    ...selectedReserva,
                    estado: e.target.value,
                  })
                }
              />
            </Form.Group>
            <h5>Detalles</h5>
            {updatedDetails.map((detalle, index) => (
              <div key={index}>
                <Form.Group>
                  <Form.Label>Mesa ID</Form.Label>
                  <Form.Control
                    type="number"
                    value={detalle.mesaId}
                    onChange={(e) =>
                      handleDetailChange(index, "mesaId", e.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Número de Personas</Form.Label>
                  <Form.Control
                    type="number"
                    value={detalle.numeroPersonas}
                    onChange={(e) =>
                      handleDetailChange(
                        index,
                        "numeroPersonas",
                        e.target.value
                      )
                    }
                  />
                </Form.Group>
              </div>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListaReservas;
