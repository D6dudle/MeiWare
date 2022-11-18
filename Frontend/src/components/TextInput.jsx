import React from 'react';
import Select from 'react-select';

function TextInput({index, name, callback, type, value="", required=false, error="", list=[], multi=false}) {
    
    const customStyles = {
        option: provided => ({
          ...provided,
          color: '#F2F2F2',
          background: '#282828',
          primary25: '#E0E0E0',
    
        }),
        control: (base, state) => ({
          ...base,
          background: "#282828",
          color: "#F2F2F2",
          backgroundColor: state.isFocused ? "#ECC039" : "3e3e3e",
    
          // Overwrittes the different states of border
    
          borderColor: value.length == 0 && required === true ? '#FF9090' : '#6D6D6D',
    
    
          // Removes weird border around container
          boxShadow: state.isFocused ? '#ECC039' : '#ECC039',
          "&:hover": {
            // Overwrittes the different states of border
            borderColor: state.isFocused ? '#ECC039' : '#ECC039',
          }
        }),
    
    
        menuList: base => ({
          ...base,
          // kill the white space on first and last option
          padding: 0
        })
      };
    
    switch(type){
        case "dropdown":
            return(
                <div className="mb-4">
                    <label htmlFor={name} className='text-gray5 text-[14px] '>{name}</label>
                    <div className='relative'>
                        <Select
                        className={` ${required ? (value ? null : 'border-error') : null}`}
                        styles={customStyles}
                        options={list}
                        isMulti={multi}
                        placeholder={name}
                        value={value}
                        onChange={(e) => { callback(index, e) }}
                        />
                        <p className='relative top-1 text-xs text-error'>{error}</p>
                    </div>
                </div>
            )
        case "textarea":
            return(
                <div className="mb-4">
                <label htmlFor={name} className='text-gray5 text-[14px] '>{name}</label>
                <textarea
                  className={`inputText min-h-[130px] ${required ? (value ? null : 'border-error') : null}`}
                  id={name}
                  placeholder={name}
                  onChange={(e) => { callback(index, e) } }
                  value={value}
                />
                <p className='inputTextErrors'>{error}</p>
              </div>
            )
        default:
            return(
                <div>
                    <label htmlFor={name} className='text-gray5 text-[14px] '>{name}</label>
                    <div className='relative'>
                        <input
                        type='text'
                        className={`inputText ${required ? (value ? null : 'border-error') : null}`}
                        id={name}
                        placeholder={name}
                        required={required ? true : false}
                        onChange={(e) => { callback(index, e) }}
                        value={value}
                        />
                    </div>
                    <p className='inputTextErrors'>{error}</p>
                </div>
            )
    }
}

export default TextInput;