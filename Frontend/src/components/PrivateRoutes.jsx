import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { ErrorPage } from "../pages/ErrorPage";

const PrivateRoute = () => {
  const isLoggedIn = AuthService.isLoggedIn();
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

const GestorRoute = () => {
  const isGestor = UserService.getCurrentUser().isGestor;
  return isGestor ? <Outlet /> : <ErrorPage />;
};

const PrivateRoutes = {
  PrivateRoute,
  GestorRoute
};

export default PrivateRoutes;
