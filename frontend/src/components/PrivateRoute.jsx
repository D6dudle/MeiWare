import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthService from "../services/auth.service";

const PrivateRoute = () => {
  const isLoggedIn = AuthService.isLoggedIn();
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
