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

/* const getExistingTags = () => {
    //console.log("Entrou no service" + authHeader);
    return axios.get(API_URL + "tags", { headers: authHeader() });
}; */

const PublicacaoService = {
  getExistingTags,
};

export default PublicacaoService;
