import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/publicacao/";

const mapResponseToValuesAndLabels = (data) => ({
    value: data,
    label: data,
  });

 async function getExistingTags() {
    //console.log("Entrou no service" + authHeader);
    try {
        const {data:response} = await axios.get(API_URL + "tags", { headers: authHeader() })
        return response.map(mapResponseToValuesAndLabels)
      }
      catch (error) {
        console.log(error);
      }
};

async function submitPublicacao(publicacao, files) {
  //console.log("Entrou no service" + authHeader);
  var bodyFormData = new FormData();
  bodyFormData.append('publicacao', new Blob([JSON.stringify(publicacao)], { type: 'application/json' }));
  files.map(file => {
    console.log(file)
    bodyFormData.append('files', file);
  })
  try {
      const {data:response} = await axios.post(API_URL + "createPublicacao", bodyFormData, { headers: { ...authHeader(), ContentType : "multipart/form-data" } })
      console.log(response)
      //return 
    }
    catch (error) {
      console.log(error);
    }
};


const PublicacaoService = {
  getExistingTags,
  submitPublicacao
};

export default PublicacaoService;
