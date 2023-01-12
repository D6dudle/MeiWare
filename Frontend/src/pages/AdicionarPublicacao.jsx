import { useState, useEffect, useRef } from 'react';
import { DollarSign, Search } from 'react-feather';
import TextInput from '../components/TextInput';
import DropzoneFiles from "../components/Dropzone";
import { useNavigate} from "react-router-dom";
import PublicacaoService from '../services/publicacao.service';
import getListaFormacaoUser from '../services/getListaFormacaoUser';
import UserService from '../services/user.service';

const mapResponseToValuesAndLabels = (data) => ({
    value: data.id,
    label: data.nomeFormacao,
  });

export default function AdicionarPublicacao({updateSidebar=null}) {

  const navigate = useNavigate();
  const user = UserService.getCurrentUser();

  const [tagList, setTagList] = useState([]);
  const [formation, setFormation] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    //Obter lista de tags no dropdown
    PublicacaoService.getExistingTags().then(r => setTagList(r))
    getListaFormacaoUser.getListaFormacaoUser(user.id).then((r) => r.listaFormacoes.map(mapResponseToValuesAndLabels)).then(r => setFormation(r))
  }, []);

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
  for(let i=0; i<3; i++){
    references.push(useRef(null))
  }

  const handleFiles = (files) => {
    console.log(files)
    setFiles(files)
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

    /* for(let i=0; i<values.length; i++){
      console.log("Field -> ",values[i]);
    } */

    //Ver se os campos obrigatórios estão preenchidos
    if(values[0] && values[1] && values[3]){
      console.log(values[0])
      console.log(values[1])
      console.log(values[2])
      console.log(values[3])
      let publicacao = {
        "titulo" : values[0],
        "tags" : values[1].map(data => data.label),
        "tituloFormacao" : (values[2] == undefined ? "" : values[2].label),
        "descricao" : values[3]
      }
      console.log(publicacao)
      PublicacaoService.submitPublicacao(publicacao, files)
    }

  };

  
  const goBack = () => {
    
    if(updateSidebar){
      updateSidebar( "/home/knowledge","/home/knowledge/adicionar-publicacao")
    }
    
    navigate("/home/knowledge");
    
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
              type="creatable" 
              titleStyle={"font-bold mb-1 text-2xl"}
              list={ tagList }
              multi={true}
              error={"Por favor selecione ou adicione uma tag"} 
              placeholder="tags..."
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
            placeholder="formação..."
            error={"Por favor selecione a formação associada"} 
            value={values[2]}
            clearable={true}
            searchCall={filterFormation}/>
          </div>

          <div>
          <TextInput index={3}
            name={"descrição"} 
            callback={handleType} 
            type="textarea" 
            value={values[3]}
            trigger={references[2]}
            />
          </div>

          <div className='w-fit mb-4'>
          <DropzoneFiles callback={handleFiles}/>
          </div>
            


          <div className='absolute right-20 bottom-10'>
            <button className="sticky bottom-0 mr-2 px-4 py-2 bg-darkBlack text-gray4 font-semibold text-sm rounded-sm hover:shadow-btn border-[1px] border-gray4  focus:border-white" onClick={goBack} >
              Cancelar
            </button>

            <button className="sticky bottom-0 px-4 py-2 bg-primary text-darkBlack font-semibold text-sm rounded-sm hover:shadow-btn focus:border-white" >
              Submeter
            </button>
            
          </div>
        </form>

      </div>


    </div>
  )
}
