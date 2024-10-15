import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <h2 className="mb-4">Pagina no encontrada</h2>
        <p>La pagina que estas buscando no existe...</p>
        <button className="btn btn-primary" onClick={handleGoHome}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
