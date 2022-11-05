import React from 'react';
import Sidebar from './components/Sidebar'
import { Camera } from 'react-feather';
import { Breadcrum } from './components/Breadcrum';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import MainScreen from './pages/MainScreen';



const App = () => {
  return (
    <div className="font-IBM ">
      <Routes>
        {/* Definir todas as routes existentes */}
        <Route path="/" element={<Login/>}/>
        <Route path="/main" element={<MainScreen/>}/>
      </Routes>
      
      
    </div>
  );
};

export default App;
