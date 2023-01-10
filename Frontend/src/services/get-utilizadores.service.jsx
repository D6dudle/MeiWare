import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/utilizador/";

const getUtilizadoresAll = () => {

    return axios.get(API_URL + "utilizadores", { headers: authHeader() }).then((r) => r.data);
};

const UtilizadoresService = {
  getUtilizadoresAll,
};

export default UtilizadoresService;
