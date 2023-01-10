import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/utilizador/";

const getListaUtilizadores = () => {
  return axios
    .get(API_URL + "listaUtilizadores", { headers: authHeader() })
    .then((r) => r.data);
};

const ListaUtilizadoresService = {
  getListaUtilizadores,
};

export default ListaUtilizadoresService;
