import React from "react";

const Navbar = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            RestauranteApp
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-link" aria-current="page" href="/">
                Inicio
              </a>
              <a class="nav-link" href="/reservas">
                Reservas
              </a>
              <a class="nav-link" href="/menu">
                Menus
              </a>
              <a class="nav-link" href="/usuarios">
                Usuarios
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
