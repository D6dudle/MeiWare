import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";
var loggedIn = false;

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        loggedIn = true;
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  loggedIn = false;
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
  return user != null;
};

const AuthService = {
  login,
  logout,
  register,
  isLoggedIn,
};

export default AuthService;
