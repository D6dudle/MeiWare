import React from 'react'

function TextInput({index, name, callback, type, value="", required=false, error=false}) {
    switch(type){
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
                </div>
            )
    }
}

export default TextInput;