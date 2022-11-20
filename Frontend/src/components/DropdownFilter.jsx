import React from "react";
import Select from 'react-select';

const DropdownFilter = ({ placeHolder, options, setFilter}) => {

  const handleChange = (selectedOption) => {
    setFilter(selectedOption.value)
  };

  const customStyles = {
    option: (provided, state)=> ({
      ...provided,
        color: '#F2F2F2',
        background: '#282828',
        primary25: '#E0E0E0',
      

    }),
    control: (base, state) => ({
      ...base,
      background: "#282828",
      // Overwrittes the different states of border
      borderColor: state.isFocused ? '#FF9090' : '#6D6D6D',
      // Removes weird border around container
      boxShadow: state.isFocused ? '#ECC039' : '#ECC039',
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? '#ECC039' : '#ECC039',
      },

    }),  



    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0
    })
  };

  /* Se alguem conseguir mudar a cor da opção selecionada no dropdown*/
  return (
    <div className="container">
        <div className="row ">
          <div className="col-md-3"></div>
            <div className="col-md-6">
              <Select 
                options={options} 
                onChange={handleChange}  
                placeholder={placeHolder}
                styles={customStyles}

              />
            </div>
          <div className="col-md-4"></div>
        </div>
      </div>
  );
};

export default DropdownFilter;