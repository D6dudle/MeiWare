import { useState, useEffect, useRef } from 'react';
import { DollarSign, Search } from 'react-feather';
import TextInput from '../components/TextInput';
import DropzoneFiles from "../components/Dropzone";

import ForumTopic from "../components/ForumTopic";

export default function AprovarPublicacao() {

  const pubList = [
    { 
      username: "Bruno Gandres",
      dataFormacao:"21/11/2000",
      titulo:"Materiais React JS",
      nomeformacao:"Introdução",
      descricao:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget lobortis lectus, non sodales purus. Duis eget ex congue, mattis nulla vel, suscipit velit. Cras sollicitudin lectus ut nibh sollicitudin, eu sodales ligula bibendum. Integer elementum congue ultrices. Curabitur justo nulla, scelerisque id pellentesque nec, placerat vel urna. Duis condimentum lacinia auctor. Morbi sed nisl non magna congue convallis vitae sed enim.",
      cursoId:"G-C-765"
    },
    { 
      username: "Nelso Gervásio",
      dataFormacao:"25/12/1969",
      titulo:"Materiais MongoDB",
      nomeformacao:"Introdução",
      descricao:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget lobortis lectus, non sodales purus. Duis eget ex congue, mattis nulla vel, suscipit velit. Cras sollicitudin lectus ut nibh sollicitudin, eu sodales ligula bibendum. Integer elementum congue ultrices. Curabitur justo nulla, scelerisque id pellentesque nec, placerat vel urna. Duis condimentum lacinia auctor. Morbi sed nisl non magna congue convallis vitae sed enim.",
      cursoId:"G-C-777"
    },
  ];

  const [publicacoes, setPublicacoes] = useState(pubList);

  const tagList = [
    { label: 'React', value: 'React' },
    { label: 'Angular', value: 'Angular' },
    { label: 'C++', value: 'C++' },
    { label: 'Java', value: 'Java' },
    { label: 'Python', value: 'Python' },
    { label: 'Javascript', value: 'Javascript' },
  ];

  const users = [
    { label: 'Shark', value: 'Shark' },
    { label: 'Dolphin', value: 'Dolphin' },
    { label: 'Whale', value: 'Whale' },
    { label: 'Octopus', value: 'Octopus' },
    { label: 'Crab', value: 'Crab' },
    { label: 'Lobster', value: 'Lobster' },
  ];

  const filterTags = (inputValue) => {
    return tagList.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const filterColaborador = (inputValue) => {
    return users.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const [values, setValues] = useState([]);

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

    for(let i=0; i<pubFields.length; i++){
      console.log("Field -> ",pubFields[i]);
    }
    //navigate(`/home`); 
  };


  return (
    <div className="flex flex-col pl-8 pr-8 w-full h-full overflow-hidden">

      <div className='sticky top-5'>
        <h1 className=" text-white font-bold text-3xl">
          Aprovar publicação
        </h1>
        <div className="pt-4">
          <div className='w-full mb-1'>
              <TextInput index={0}
                type="searchbar" 
                noTitle={true}
                callback={handleType}
                value={values[0]}
              />
            </div>

          <div className='w-full mb-1'>
            <TextInput index={1}
              name={"tags"} 
              type="dropsearch" 
              list={tagList} 
              multi={true}
              value={values[1]}
              placeholder="tags..."
              callback={handleDropdown} 
              searchCall={filterTags}/>
          </div>

          <div className='w-full mb-1'>
            <TextInput index={2}
              name={"colaborador"}
              type="dropsearch" 
              list={users} 
              multi={true}
              value={values[2]}
              placeholder="colaborador..."
              callback={handleDropdown} 
              searchCall={filterColaborador}/>
          </div>
        </div>
      </div>

      <div className="w-full h-full mt-8 overflow-scroll scrollbar-hide">
        <ul className='justify-start'>
          {publicacoes.map((pub, index) =>(    
            <li key={index}> 
                <div className='mb-4'>
                  <div>
                      <ForumTopic
                        username={pub.username}
                        dataFormacao={pub.dataFormacao}
                        titulo={pub.titulo}
                        nomeformacao={pub.nomeformacao}
                        descricao={pub.descricao}
                        cursoId={pub.cursoId}
                        arquivar={true}
                        publicacaoCompleta={true}
                        aprovar={true}
                        urlBack={"/home/forum/aprovar-publicacao"}
                      />
                  </div>
                </div>
            </li>
          ))}
        </ul>
      </div>


    </div>
  )
}
