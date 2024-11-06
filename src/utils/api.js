import axios from "axios";

const baseURL = "http://localhost:8080/api"

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Ignorar el uso del token para las rutas /auth/register y /auth/login
      if (config.url !== "/auth/register" && config.url !== "/auth/login") {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;


/*
 * Ejemplo de utilizacion:
 * import api from "./utils/api.js"
 * api.[peticion]("/ruta sin localhost");
 * api.post("/clientes", clientes);
 * api.get("/clientes");
 */