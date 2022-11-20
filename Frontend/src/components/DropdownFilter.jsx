import React from "react";
import Select from 'react-select';
const DropdownFilter = ({ placeHolder, options }) => {


  return (
    <div className="container">
        <div className="row bg-transparent">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <Select options={options} />
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
  );
};

export default DropdownFilter;