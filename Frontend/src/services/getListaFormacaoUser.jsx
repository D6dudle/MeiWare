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

const finalizaFormacaoUser = (formacaoId, nomeFormacao) => {
  return axios
    .put(
      API_URL + "finalizarPedidoFormacao",
      {
        pedidoFormacaoId: formacaoId,
        nomeFormacao: nomeFormacao,
      },
      { headers: authHeader() }
    )
    .then((r) => r.data);
};

const aprovarFormacaoUser = (formacaoId, adminId) => {
  return axios
    .put(
      API_URL + "finalizarPedidoFormacao",
      {
        pedidoFormacaoId: formacaoId,
        adminId: adminId,
      },
      { headers: authHeader() }
    )
    .then((r) => r.data);
};

const ListaFormacaoUserService = {
  getListaFormacaoUser,
  finalizaFormacaoUser,
  aprovarFormacaoUser,
};

export default ListaFormacaoUserService;
