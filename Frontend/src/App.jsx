import React from 'react';
import Sidebar from './components/Sidebar'
import { Camera } from 'react-feather';
import { Breadcrum } from './components/Breadcrum';



 
const App = () => {
  return (
    <div className="font-IBM relative flex ">
      <Sidebar/>
      <div className="flex-1 flex flex-col mt-4 ml-8 mr-8">
        <Breadcrum/>
        <div className="bg-black2 h-[calc(100vh-4.5rem)] mb-8 rounded-sm text-white">
          Test
        </div>
      </div>
      
      
    </div>
  );
};

export default App;
