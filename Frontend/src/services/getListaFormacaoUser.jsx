import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/formacao/";

async function getListaFormacaoUser(userId) {
  return axios
    .get(API_URL + "pedidosFormacaoByUserId", {
      params: { id: userId },
      headers: authHeader(),
    })
    .then((r) => r.data);
}

const ListaFormacaoUserService = {
  getListaFormacaoUser,
};

export default ListaFormacaoUserService;
