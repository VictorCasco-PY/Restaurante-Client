import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Mesa from "../components/Reservas/Mesa";
import Menu from "../components/Menus/Menu";
import Usuario from "../components/Usuarios/Usuario";
import ErrorPage from "../pages/ErrorPage";
import ListaReservas from "../components/Reservas/ListaReservas";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/reservas/lista" element={<ListaReservas />} />
      <Route path="/menu/crear" element={<Menu />} />
      <Route path="/usuarios/crear" element={<Usuario />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
