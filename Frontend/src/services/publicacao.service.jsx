import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/publicacao/";

const getPublicacoesPendentes = () => {
    return axios.get(API_URL + "publicacoesPendentes", { headers: authHeader() }).then((r) => r.data);
};

const getPublicacoesAprovadas = () => {
    return axios.get(API_URL + "publicacoesAprovadas", { headers: authHeader() }).then((r) => r.data);
};

const arquivarPublicacao = (publicacaoId) => {
  return axios.put(API_URL + "arquivarPublicacao", { id: publicacaoId }, { headers: authHeader() }).then((r) => r.data);
}

const aprovarPublicacao = (publicacaoId) => {
  return axios.put(API_URL + "aprovarPublicacao", { id: publicacaoId }, { headers: authHeader() }).then((r) => r.data);
};

const PublicacaoService = {
  getPublicacoesPendentes,
  getPublicacoesAprovadas,
  arquivarPublicacao,
  aprovarPublicacao
};

export default PublicacaoService;