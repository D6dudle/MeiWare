import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/utilizador/";

const getColaboradoresAll = () => {
  return axios
    .get(API_URL + "colaboradores", { headers: authHeader() })
    .then((r) => r.data);
};

const getColaboradoresManager = (gestorId) => {
  return axios
    .get(API_URL + "pedidosFormacaoEquipa", {
      params: { id: gestorId },
      headers: authHeader(),
    })
    .then((r) => r.data);
};

const ColaboradoresService = {
  getColaboradoresAll,
  getColaboradoresManager,
};

export default ColaboradoresService;
