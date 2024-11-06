import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email: email,
          password: password,
        }
      );

      // Guardar el token de acceso en localStorage
      localStorage.setItem("accessToken", response.data.accessToken);

      // Mostrar un mensaje de éxito
      alert("Login exitoso");

      // Redirigir a una página diferente o hacer lo que sea necesario después del login
      // Por ejemplo:
      // window.location.href = "/dashboard"; // o usar React Router para navegar
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Iniciar sesión</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin} className="border p-4 rounded shadow">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
