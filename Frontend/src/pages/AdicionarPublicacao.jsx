import { useState, useEffect, useRef } from 'react';
import { DollarSign, Search } from 'react-feather';
import TextInput from '../components/TextInput';
import DropzoneFiles from "../components/Dropzone";

export default function AdicionarPublicacao() {

  const formation = [
    { label: 'Shark', value: 'Shark' },
    { label: 'Dolphin', value: 'Dolphin' },
    { label: 'Whale', value: 'Whale' },
    { label: 'Octopus', value: 'Octopus' },
    { label: 'Crab', value: 'Crab' },
    { label: 'Lobster', value: 'Lobster' },
  ];

  const tagList = [
    { label: 'React', value: 'React' },
    { label: 'Angular', value: 'Angular' },
    { label: 'C++', value: 'C++' },
    { label: 'Java', value: 'Java' },
    { label: 'Python', value: 'Python' },
    { label: 'Javascript', value: 'Javascript' },
  ];

  const filterTags = (inputValue) => {
    return tagList.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const filterFormation = (inputValue) => {
    return formation.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const [values, setValues] = useState([]);

  const references = [];
  for(let i=0; i<4; i++){
    references.push(useRef(null))
  }

  const handleType = (index, event) => {
    let data = [...values];
    data[index] = event.target.value;
    setValues(data);
  };

  const handleDropdown = (index, opt) => {
    let data = [...values];
    data[index] = opt;
    setValues(data);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log("Button Submeter pressed!");

    //Verificar se estão vazios
    for(let i=0; i<references.length; i++){
      if(references[i]){
        references[i].current();
      }
    }

    for(let i=0; i<pubFields.length; i++){
      console.log("Field -> ",pubFields[i]);
    }
    //navigate(`/home`); 
  };


  return (
    <div className="flex flex-col pl-8 pr-8 w-full h-full overflow-hidden">
      <h1 className="sticky top-5 text-white font-bold text-3xl">
        Adicionar publicação
      </h1>

      <div className="w-full h-full mt-8 overflow-scroll scrollbar-hide">
        <form onSubmit={handleFormSubmit} noValidate>

          <div className='w-[30rem] mb-2'>
            <TextInput index={0}
              name={"título"}
              callback={handleType}
              value={values[0]}
              trigger={references[0]}/>
          </div>

          <div className='w-[40rem] mb-4'>
            <TextInput index={1}
              name={"tags"} 
              type="dropsearch" 
              titleStyle={"font-bold mb-1 text-2xl"}
              list={tagList} 
              multi={true}
              error={"Por favor selecione ou adicione uma tag"} 
              value={values[1]}
              trigger={references[1]}
              callback={handleDropdown} 
              searchCall={filterTags}/>
          </div>

          <div className='w-[40rem] mb-4'>
          <TextInput index={2}
            name={"associar formação"} 
            titleStyle={"font-bold mb-1 text-2xl"}
            callback={handleDropdown} 
            type="dropsearch"
            list={formation}
            error={"Por favor selecione a formação associada"} 
            value={values[2]}
            trigger={references[2]}
            searchCall={filterFormation}/>
          </div>

          <div>
          <TextInput index={3}
            name={"descrição"} 
            callback={handleType} 
            type="textarea" 
            value={values[3]}
            trigger={references[3]}
            />
          </div>

          <div className='w-fit mb-4'>
          <DropzoneFiles />
          </div>
            


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
