import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/publicacao/";

const getPublicacoesPendentes = (gestorId) => {
    return axios.get(API_URL + "publicacoesPendentes", { params: { id: gestorId }, headers: authHeader() }).then((r) => r.data);
};

const getPublicacoesAprovadas = () => {
    return axios.get(API_URL + "publicacoesAprovadas", { headers: authHeader() }).then((r) => r.data);
};

const PublicacaoService = {
  getPublicacoesPendentes,
  getPublicacoesAprovadas
};

export default PublicacaoService;