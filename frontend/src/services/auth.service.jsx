import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const register = (name, email, password, roleList) => {
  const role = roleList;
  return axios
    .post(API_URL + "signup", {
      name,
      email,
      password,
      role,
    })
    .then((response) => {
      return response.data;
    });
};

const isLoggedIn = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  return user != null && token != null;
};

const AuthService = {
  login,
  logout,
  register,
  isLoggedIn,
};

export default AuthService;
