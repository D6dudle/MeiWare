import { useState, useEffect } from 'react';
import { DollarSign, Search } from 'react-feather';
import TextInput from '../components/TextInput';

export default function AdicionarPublicacao() {

  const config = () => {
    const fields = [];
    fields.push({name:"Titulo", required:true});
    fields.push({name:"Descrição", required:true, type:"textarea"});
    return fields;
  }

  const [pubFields, setPubFields] = useState(config);

  const handleType = (index, event) => {
    let data = [...pubFields];
    data[index]["value"] = event.target.value;
    setPubFields(data);
 }

  const [newField, setNewField] = useState("");

  const addField = () =>{
    setPubFields([...pubFields,{name:newField, value:""}]);
    setNewField("");
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log("Button Submeter pressed!");
    for(let i=0; i<pubFields.length; i++){
      console.log("Field -> ",pubFields[i]["value"]);
    }
    //navigate(`/home`); 
  };


  return (
    <div className="ml-8 mr-8">
      <h1 className="text-white font-bold text-3xl mt-8">
        Adicionar publicação
      </h1>

      <div className="mt-16 flex justify-evenly items-center">
        <form onSubmit={handleFormSubmit} className="" noValidate>
        <div className='flex flex-wrap justify-between sm:justify-start'>

          <div className="mr-20">
            <ul>
                {pubFields.map((field, index) =>(                
                  <li key={index}> 
                      <div className='mb-4'>
                        <TextInput index={index} name={field.name} value={field.value} required={field.required} type={field.type} callback={handleType}/>
                      </div>
                  </li>
                ))}
            </ul>
          
            <h2>Campos extra</h2>
            <div className='inline'>
              <input type='text' placeholder="Campo" value={newField} className='mr-2 p-2 bg-transparent text-white placeholder-gray3 border border-gray3 rounded-[2px] text-sm mb-4 mt-2 focus:border-primary focus:outline-0 focus:backdrop-blur-lg focus:shadow-btn transition transform duration-100 ease-out' onChange={ e => setNewField(e.target.value) }/>
              <button type="button" className='px-4 py-2 bg-primary text-darkBlack font-semibold text-sm rounded-sm hover:shadow-btn focus:border-white' onClick={ addField }>Adicionar campo</button>
            </div>

          </div>

        </div>

        <div className='flex justify-end items-center mt-6 '>
          <button className="flex items-center px-4 py-2 bg-primary text-darkBlack font-semibold text-sm rounded-sm hover:shadow-btn focus:border-white" >
            Submeter
          </button>
        </div>
        </form>

      </div>


    </div>
  )
}
