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

const aprovarFormacaoUserAdmin = (formacaoId, adminId) => {
  return axios
    .put(
      API_URL + "aprovarPedidoFormacaoAdmin",
      {
        pedidoFormacaoId: formacaoId,
        adminId: adminId,
      },
      { headers: authHeader() }
    )
    .then((r) => r.data);
};

const aprovarPedidoFormacaoGestor = (formacaoId, gestorId) => {
  return axios
    .put(
      API_URL + "aprovarPedidoFormacaoGestor",
      {
        pedidoFormacaoId: formacaoId,
        gestorId: gestorId,
      },
      { headers: authHeader() }
    )
    .then((r) => r.data);
};

const rejeitarPedidoFormacaoAdmin = (formacaoId, adminId, comentario) => {
  return axios
    .put(
      API_URL + "rejeitarPedidoFormacaoAdmin",
      {
        pedidoFormacaoId: formacaoId,
        adminId: adminId,
        comentario: comentario,
      },
      { headers: authHeader() }
    )
    .then((r) => r.data);
};

const rejeitarPedidoFormacaoGestor = (formacaoId, gestorId, comentario) => {
  return axios
    .put(
      API_URL + "rejeitarPedidoFormacaoGestor",
      {
        pedidoFormacaoId: formacaoId,
        gestorId: gestorId,
        comentario: comentario,
      },
      { headers: authHeader() }
    )
    .then((r) => r.data);
};

const criaPedidoFormacao = (files, pedidoFormacao, formandos) => {
  var bodyFormData = new FormData();
  bodyFormData.append(
    "pedidoFormacao",
    new Blob([JSON.stringify(pedidoFormacao)], { type: "application/json" })
  );

  bodyFormData.append(
    "formandos",
    new Blob([JSON.stringify(formandos)], { type: "application/json" })
  );

  files.map((file) => {
    bodyFormData.append("files", file);
  });

  return axios
    .post(API_URL + "createPedidoFormacao", bodyFormData, {
      headers: { ...authHeader(), "Content-Type": "multipart/form-data;" },
    })
    .then((r) => r.data);
};

const ListaFormacaoUserService = {
  getListaFormacaoUser,
  finalizaFormacaoUser,
  aprovarFormacaoUserAdmin,
  aprovarPedidoFormacaoGestor,
  rejeitarPedidoFormacaoAdmin,
  rejeitarPedidoFormacaoGestor,
  criaPedidoFormacao,
};

export default ListaFormacaoUserService;
