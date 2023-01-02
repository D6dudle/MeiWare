import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/formacao/";

const getPedidosFormacaoAll = () => {
    return axios.get(API_URL + "pedidosFormacao", { headers: authHeader() }).then((r) => r.data);
};

const getPedidosFormacaoEquipa = (gestorId) => {
    return axios.get(API_URL + "pedidosFormacaoEquipa", { params: { id: gestorId }, headers: authHeader() }).then((r) => r.data);
};

const PedidoFormacaoService = {
  getPedidosFormacaoAll,
  getPedidosFormacaoEquipa
};

export default PedidoFormacaoService;
