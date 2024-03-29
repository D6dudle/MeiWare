import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/publicacao/";

const mapResponseToValuesAndLabels = (data) => ({
  value: data,
  label: data,
});

const getPublicacoesPendentes = () => {
  return axios
    .get(API_URL + "publicacoesPendentes", { headers: authHeader() })
    .then((r) => r.data);
};

const getPublicacoesAprovadas = () => {
  return axios
    .get(API_URL + "publicacoesAprovadas", { headers: authHeader() })
    .then((r) => r.data);
};

const arquivarPublicacao = (publicacaoId) => {
  return axios
    .put(
      API_URL + "arquivarPublicacao",
      { id: publicacaoId },
      { headers: authHeader() }
    )
    .then((r) => r.data);
};

const aprovarPublicacao = (publicacaoId) => {
  return axios
    .put(
      API_URL + "aprovarPublicacao",
      { id: publicacaoId },
      { headers: authHeader() }
    )
    .then((r) => r.data);
};

async function getExistingTags() {
  try {
    const { data: response } = await axios.get(API_URL + "tags", {
      headers: authHeader(),
    });
    return response.map(mapResponseToValuesAndLabels);
  } catch (error) {}
}

async function submitPublicacao(publicacao, files) {
  var bodyFormData = new FormData();
  bodyFormData.append(
    "publicacao",
    new Blob([JSON.stringify(publicacao)], { type: "application/json" })
  );
  files.map((file) => {
    bodyFormData.append("files", file);
  });
  try {
    const { data: response } = await axios.post(
      API_URL + "createPublicacao",
      bodyFormData,
      { headers: { ...authHeader(), ContentType: "multipart/form-data" } }
    );
  } catch (error) {}
}

const PublicacaoService = {
  getPublicacoesPendentes,
  getPublicacoesAprovadas,
  arquivarPublicacao,
  aprovarPublicacao,
  getExistingTags,
  submitPublicacao,
};

export default PublicacaoService;
