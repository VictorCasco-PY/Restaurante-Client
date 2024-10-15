import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menus/Menu";
import Mesa from "./components/Reservas/Mesa";
import Usuario from "./components/Usuarios/Usuario";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar/Navbar";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservas" element={<Mesa />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/usuarios" element={<Usuario />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
