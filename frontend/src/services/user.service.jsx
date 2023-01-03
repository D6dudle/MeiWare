import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

const getCurrentUser = () => {

  return JSON.parse(localStorage.getItem("user"));
};

//Exemplo - não está testado pq a back-end não está pronta para tal.
const getColaboradores = () => {
  
  return axios.get(API_URL + "colaboradores", { headers: authHeader() });
};


const UserService = {
  getCurrentUser,
  getColaboradores,
};

export default UserService;
