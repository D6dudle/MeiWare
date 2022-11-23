import { useState, useEffect, useRef } from 'react';
import { DollarSign, Search } from 'react-feather';
import TextInput from '../components/TextInput';
import DropzoneFiles from "../components/Dropzone";

export default function AprovarPublicacao() {

  const pubList = [
    { label: 'Shark', user: 'Shark'},
    { label: 'Dolphin', user: 'Dolphin' },
    { label: 'Whale', user: 'Whale' },
    { label: 'Octopus', user: 'Octopus' },
    { label: 'Crab', user: 'Crab' },
    { label: 'Lobster', user: 'Lobster' },
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
              callback={handleDropdown} 
              searchCall={filterColaborador}/>
          </div>
        </div>
      </div>

      <div className="w-full h-full mt-8 overflow-scroll scrollbar-hide">
        <ul className='w-80 justify-start'>
          {publicacoes.map((pub, index) =>(    
            <li key={index}> 
                <div className='mb-4'>
                  {pub.label}
                </div>
            </li>
          ))}
        </ul>
      </div>


    </div>
  )
}
