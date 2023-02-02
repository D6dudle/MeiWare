import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/formacao/";

const mapPedidoFormacao = (data) => ({
  nome: data.nomeFormacao,
  id: data.idCurso,
  justificacao: data.justificacaoFormacao,
  dataInicio: data.dataFormacao,
  cancelada: data.cancelada,
  formador: data.formador,
  apagada: data.apagada,
  descricao: data.descricao,
  preco: data.preco,
  status: data.status
});

const getPedidosFormacaoAll = () => {
  return axios
    .get(API_URL + "pedidosFormacao", { headers: authHeader() })
    .then((r) => r.data);
};

const getPedidosFormacaoEquipa = (gestorId) => {
  return axios
    .get(API_URL + "pedidosFormacaoEquipa", {
      params: { id: gestorId },
      headers: authHeader(),
    })
    .then((r) => r.data);
};

const getPedidoFormacaoById = (pedidoFormacaoId) => {
  return axios.get(API_URL + "pedidoFormacaoById", { params: { id: pedidoFormacaoId }, headers: authHeader() }).then((r) => r.data);
};

const updatePedidoFormacao = (updatedPedidoFormacao, addedFiles, removedFiles) => {
  var bodyFormData = new FormData();
  updatedPedidoFormacao = mapPedidoFormacao(updatedPedidoFormacao);
  bodyFormData.append('pedidoFormacao', new Blob([JSON.stringify(updatedPedidoFormacao)], { type: 'application/json' }));
  addedFiles.map(file => {
    bodyFormData.append('addedFiles', file);
  });
  bodyFormData.append('removedFiles', new Blob([JSON.stringify(removedFiles)], { type: 'application/json' }));

  return axios.put(API_URL + "updatePedidoFormacao", bodyFormData, { headers: { ...authHeader(), ContentType : "multipart/form-data" }}).then((r) => r.data);
}

const PedidoFormacaoService = {
  getPedidosFormacaoAll,
  getPedidosFormacaoEquipa,
  getPedidoFormacaoById,
  updatePedidoFormacao
};

export default PedidoFormacaoService;
