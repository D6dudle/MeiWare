import { useState } from 'react';
import { Search } from 'react-feather';
import React from 'react';
import Select from 'react-select';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './calendar.css';

function TextInput({index, name, callback, type, value="", required=false, error="", list=[], multi=false, style=null, trigger}) {

  const [isValidated, setValidation] = useState(true);

  const validate = () =>{
    setValidation(false)
  }

  if(trigger){
    React.useEffect(() => {
      trigger.current = validate
    }, [trigger])
  }

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
      case "searchbar":
        return(
          <div className='mb-4'>
            <label htmlFor={name} className='text-gray5 text-[14px]'>{name}</label>
            <div className='relative flex items-center'>
                <Search className="absolute mb-2 ml-1" />
                <input
                  type='search'
                  className='inputFilter pl-[35px]'
                  id={name}
                  placeholder='pesquisa...'
                  onChange={(e) => { callback(index, e); }}
                  value={value}
                />
              </div>
          </div>
        )
      case "datepicker":
        const [datePick, setDatePick] = useState(false);
        const [isPicked, setPicked] = useState(false);
        const [date, setDate] = useState(new Date());
        return(
          <div className='mb-4'>
                <label htmlFor={name} className='text-gray5 text-[14px]'>{name}</label>
                <div className='relative'>
                  <input
                    readOnly={true}
                    type='text'
                    className={`inputText ${style} ${isValidated ? null : (isPicked ? null : 'border-error')}`}
                    id={name}
                    placeholder={name}
                    value={date.toLocaleDateString()}
                    onClick={(e) => { setDatePick(!datePick) }}
                  />
                  <p className='inputTextErrors'>{error}</p>
                  <div style={{display : datePick ? 'block' : 'none'}}>
                    <Calendar
                      className='relative'
                      color=''
                      onChange={ (e) => { setDate(e); setDatePick(!datePick); setPicked(true); callback(index, e); }}
                      date={date} />
                  </div>
                </div>
              </div>
        )
      case "dropdown":
          return(
              <div className="mb-4">
                  <label htmlFor={name} className='text-gray5 text-[14px] '>{name}</label>
                  <div className='relative'>
                      <Select
                      className={` ${style} ${isValidated ? null : (value ? null : 'border-error') }`}
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
                className={`inputText min-h-[130px] ${style} ${isValidated ? null : (value ? null : 'border-error') }`}
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
                      className={`inputText ${style} ${isValidated ? null : (value ? null : 'border-error') }`}
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