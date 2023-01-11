import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/utilizador/";

const getUtilizadoresAll = () => {

    return axios.get(API_URL + "utilizadores", { headers: authHeader() }).then((r) => r.data);
};


const getUtilizadoresById = (utilizadorId) => {

  return axios.get(API_URL + "utilizadorById", { params: { id: utilizadorId }, headers: authHeader() }).then((r) => r.data);
};

const removeUtilizador = (utilizadorId) => {

  return axios.delete(API_URL + "removeUtilizador", { params: { id: utilizadorId }, headers: authHeader() }).then((r) => r.data);
};

const getGestoresAll = () => {
  //console.log("Entrou no service" + authHeader);
  return axios.get(API_URL + "gestores", { headers: authHeader() }).then((r) => r.data);
};

const updateUtilizador = (updatedUtilizador) => {
  //console.log("Entrou no service" + authHeader);
  return axios.put(API_URL + "updateUtilizador", {params: { Utilzador: updatedUtilizador }, headers: authHeader() }).then((r) => r.data);
};


const UtilizadoresService = {
  getUtilizadoresAll,
  getUtilizadoresById,
  removeUtilizador,
  getGestoresAll,
  updateUtilizador,
};



export default UtilizadoresService;
