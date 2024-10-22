import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          RestauranteApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>

            {/* Dropdown Reservas */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="reservasDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Reservas
              </a>
              <ul className="dropdown-menu" aria-labelledby="reservasDropdown">
                <li>
                  <Link className="dropdown-item" to="/reservas/crear">
                    Crear Reserva
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/reservas/lista">
                    Listar Reservas
                  </Link>
                </li>
              </ul>
            </li>

            {/* Dropdown Menus */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="menuDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Menus
              </a>
              <ul className="dropdown-menu" aria-labelledby="menuDropdown">
                <li>
                  <Link className="dropdown-item" to="/menu/crear">
                    Crear Menu
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/menu/lista">
                    Listar Menus
                  </Link>
                </li>
              </ul>
            </li>

            {/* Dropdown Usuarios */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="usuariosDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Usuarios
              </a>
              <ul className="dropdown-menu" aria-labelledby="usuariosDropdown">
                <li>
                  <Link className="dropdown-item" to="/usuarios/crear">
                    Crear Usuario
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/usuarios/lista">
                    Listar Usuarios
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
