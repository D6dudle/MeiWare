import React from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorPage } from "./pages/ErrorPage";
import Login from "./pages/Login";
import MainScreen from "./pages/MainScreen";
import PrivateRoutes from "./components/PrivateRoutes";

//<Route path="home/*" element={<MainScreen />} />

const App = () => {
  return (
    <div className="font-IBM">
      <Routes>
        {/* Definir todas as routes existentes */}
        <Route path="/" element={<Login />} />
        <Route path="home/*" element={<PrivateRoutes.PrivateRoute />}>
          <Route path="*" element={<MainScreen />}/>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
