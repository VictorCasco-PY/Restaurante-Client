import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Mesa from "../components/Reservas/Mesa";
import Menu from "../components/Menus/Menu";
import ErrorPage from "../pages/ErrorPage";
import ListaReservas from "../components/Reservas/ListaReservas";
import CrearReserva from "../components/Reservas/CrearReserva";
import CrearUsuario from "../components/Usuarios/CrearUsuario";
import ListaUsuarios from "../components/Usuarios/ListaUsuarios";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/reservas/lista" element={<ListaReservas />} />
      <Route path="/reservas/crear" element={<CrearReserva />} />
      <Route path="/reservas/mesas" element={<Mesa />} />
      <Route path="/menu/crear" element={<Menu />} />
      <Route path="/usuarios/crear" element={<CrearUsuario />} />
      <Route path="/usuarios/lista" element={<ListaUsuarios />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
