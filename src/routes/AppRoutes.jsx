import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Mesa from "../components/Reservas/Mesa";
import ErrorPage from "../pages/ErrorPage";
import ListaReservas from "../components/Reservas/ListaReservas";
import CrearReserva from "../components/Reservas/CrearReserva";
import CrearUsuario from "../components/Usuarios/CrearUsuario";
import ListaUsuarios from "../components/Usuarios/ListaUsuarios";
import ListaMenus from "../components/Menus/ListaMenus";
import CrearMenu from "../components/Menus/CrearMenu";
import CrearMesa from "../components/Reservas/CrearMesa";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/reservas/lista" element={<ListaReservas />} />
      <Route path="/reservas/crear" element={<CrearReserva />} />
      <Route path="/reservas/mesas/crear" element={<CrearMesa />} />
      <Route path="/reservas/mesas/lista" element={<Mesa />} />
      <Route path="/menu/crear" element={<CrearMenu />} />
      <Route path="/menu/lista" element={<ListaMenus />} />
      <Route path="/usuarios/crear" element={<CrearUsuario />} />
      <Route path="/usuarios/lista" element={<ListaUsuarios />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
