import { useState, useRef } from 'react';
import TextInput from '../components/TextInput';

export default function Exemplo() {

  const aquaticCreatures = [
    { label: 'Shark', value: 'Shark' },
    { label: 'Dolphin', value: 'Dolphin' },
    { label: 'Whale', value: 'Whale' },
    { label: 'Octopus', value: 'Octopus' },
    { label: 'Crab', value: 'Crab' },
    { label: 'Lobster', value: 'Lobster' },
  ];

  const filterCreature = (inputValue) => {
    return aquaticCreatures.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };


  //Para o pai chamar funções do filho
  //precisamos de uma referência para cada
  const references = [];

  for(let i=0; i<5; i++){
    references.push(useRef(null))
  }

  const config = (handleType, handleDropdown) => {
    const fields = [];
    fields.push({name:"Search", type:"searchbar", callback:handleType });

    fields.push({
      name:"Dropdown Search",
      type:"dropsearch",
      placeholder:"colaborador...",
      list:aquaticCreatures,
      callback:handleDropdown,
      searchCall:filterCreature
    });

    //Para podermos verificar o campo quando carregamos no Submit
    //temos que passar para uma referência
    fields.push({
      name:"Dropdown Search Required", 
      type:"dropsearch",
      list:aquaticCreatures, 
      callback:handleDropdown, 
      searchCall:filterCreature,
      trigger:references[0]
    });

    fields.push({
      name:"Dropdown Search Multi",
      type:"dropsearch", 
      multi:true, 
      list:aquaticCreatures, 
      callback:handleDropdown, 
      searchCall:filterCreature 
    });

    fields.push({
      name:"Dropdown",
      type:"dropdown",
      list:aquaticCreatures,
      multi:true,
      callback:handleDropdown
    });

    fields.push({name:"Dropdown Required", type:"dropdown", list:aquaticCreatures, callback:handleDropdown, trigger:references[1]});
    fields.push({name:"Text", callback:handleType, trigger:references[2]});
    fields.push({name:"Text with styles", callback:handleType, style:"min-h-[100px]", trigger:references[3]});
    fields.push({name:"Textarea", type:"textarea", callback:handleType});
    fields.push({name:"Data", type:"datepicker", callback:handleDropdown, trigger:references[4]});
    return fields;
  }

  //Callbacks dos componentes filho
  //Ex. Ações de escrever
  const [pubFields, setPubFields] = useState(() => {
      const handleType = (index, event) => {
        let data = [...pubFields];
        data[index]["value"] = event.target.value;
        setPubFields(data);
      };

      const handleDropdown = (index, opt) => {
        let data = [...pubFields];
        data[index]["value"] = opt;
        setPubFields(data);
      };

      return config(handleType, handleDropdown);
    }
  );

  const [newField, setNewField] = useState("");

  const addField = () =>{
    setPubFields([...pubFields,{name:newField, value:""}]);
    setNewField("");
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log("Button Submeter pressed!");

    //Verificar se estão vazios
    for(let i=0; i<pubFields.length; i++){
      if(pubFields[i]["trigger"]){
        pubFields[i]["trigger"].current();
      }
    }

    for(let i=0; i<pubFields.length; i++){
      console.log("Field -> ",pubFields[i]["value"]);
    }
    //navigate(`/home`); 
  };


  return (
    <div className="flex flex-col pl-8 pr-8 w-full h-full overflow-hidden">
      <h1 className="sticky top-5 text-white font-bold text-3xl">
        Adicionar publicação
      </h1>

      <div className="w-full h-full mt-10 overflow-scroll scrollbar-hide">
        <form onSubmit={handleFormSubmit} noValidate>
            <ul className='w-80 justify-start'>
                {pubFields.map((field, index) =>(    
                  <li key={index}> 
                      <div className='mb-4'>
                        <TextInput index={index} name={field.name} callback={field.callback} value={field.value} required={field.required} type={field.type} list={field.list} multi={field.multi} style={field.style} error={field.error} trigger={field.trigger} searchCall={field.searchCall} placeholder={field.placeholder}/>
                      </div>
                  </li>
                ))}
            </ul>
          
            {/* <h2>Campos extra</h2>
            <div className='inline'>
              <input type='text' placeholder="Campo" value={newField} className='mr-2 p-2 bg-transparent text-white placeholder-gray3 border border-gray3 rounded-[2px] text-sm mb-4 mt-2 focus:border-primary focus:outline-0 focus:backdrop-blur-lg focus:shadow-btn transition transform duration-100 ease-out' onChange={ e => setNewField(e.target.value) }/>
              <button type="button" className='px-4 py-2 bg-primary text-darkBlack font-semibold text-sm rounded-sm hover:shadow-btn focus:border-white' onClick={ addField }>Adicionar campo</button>
            </div> */}

        <div className='absolute right-20 bottom-10'>
          <button className="sticky bottom-0 px-4 py-2 bg-primary text-darkBlack font-semibold text-sm rounded-sm hover:shadow-btn focus:border-white" >
            Submeter
          </button>
        </div>
        </form>

      </div>


    </div>
  )
}
