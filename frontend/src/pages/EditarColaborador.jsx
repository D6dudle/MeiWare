import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { PlusCircle } from "react-feather";
import TextInput from "../components/TextInput";
import GoBackButton from "../components/GoBackButton";
import { useLocation, useNavigate } from "react-router-dom";
import UtilizadoresService from "../services/get-utilizadores.service";

import { Loading } from "../components/Loading";
export default function EditarColaborador() {
  const navigate = useNavigate();
  const personId = useLocation().search.slice(4);

  const [userEdit, setUserEdit] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [isLoading, setLoading] = useState(true); // Loading state
  const [gestList, setGestList] = useState([]);
  const [gestAssociado, setGestAssociado] = useState([]);

  const fakeManagerList = [
    { label: "Francisco", value: "Francisco" },
    { label: "Jon Jones", value: "Jon Jones" },
  ];

  const ManagerList = [];
  
  useEffect(() => {
    //Obter lista de gestores
    UtilizadoresService.getGestoresAll().then((data)=>{
      setGestList(data);

      for(var i = 0; i < data.length; i++){
      
        var manager = {
          label: data[i].nome,
          value: data[i].nome,
          id: data[i].id,
        }
        ManagerList.push(manager);
      }
      
    }); 
  }, []);
  
  useEffect(() => {
    UtilizadoresService.getUtilizadoresById(personId).then((utilizador)=>{
      setInitialData(utilizador);
      
      console.log(utilizador);

      pubFields[0]["value"] = utilizador.nome;
      pubFields[1]["value"] = utilizador.email;

      if(utilizador.isAdministrador){
        pubFields[2]["value"] = rolesList[0];
      }
      else if(utilizador.isGestor){
        pubFields[2]["value"] = rolesList[1];
      }
      else{
        pubFields[2]["value"] = rolesList[2];
      }
      
      for(var i = 0; i < ManagerList.length; i++){
        if(ManagerList[i].id = utilizador.managerId){
          pubFields[3]["value"]["value"] = ManagerList[i].nome;
        }
      }
      

    });
  }, []);





  //Dumb Data
  const initialDatas = {
    id: 1,
    name: "Jenny Wilson",
    email: "jenny.wilson@example.com",
    role: "Colaborador",
    age: 29,
    imgUrl:
      "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    budgetUsed: "300,00 €",
    emAprovacao: "40,00 €",
    numFormacao: 2,
    manager: {
      id: 2,
      name: "Jon Jones",
      email: "jon.jones@example.com",
      role: "Gestor",
      age: 31,
    },
  };

  
  const rolesList = [
    { label: "Administrador", value: "administrador" },
    { label: "Gestor", value: "gestor" },
    { label: "Colaborador", value: "colaborador" },
  ]

  var prevUrl = useLocation().state;
  if (prevUrl === null) {
    prevUrl = "/home/controlo/colaboradores";
  } else {
    prevUrl = prevUrl.prevUrl;
  }

  const [image, setImage] = useState({
    preview: initialData.imgUrl,
    raw: initialData.imgUrl,
  });

  const filterManager = (inputValue) => {
    return ManagerList.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const references = [useRef(null), useRef(null), useRef(null), useRef(null)];

  

  const config = (handleType, handleDropdown) => {
    const fields = [];


    fields.push({
      name: "Nome",
      required: true,
      callback: handleType,
      value: initialData.name,
      trigger: references[0],
    });
    fields.push({
      name: "email",
      required: true,
      callback: handleType,
      value: initialData.email,
      trigger: references[1],
    });
    fields.push({
      name: "cargo",
      type: "dropsearch",
      required: true,
      callback: handleType,
      value: rolesList[0],
      trigger: references[2],
    });
    fields.push({
      name: "gestor responsável",
      type: "dropsearch",
      list: gestList,
      callback: handleDropdown,
      value: ManagerList, //Preencher com manager
      searchCall: filterManager,
      trigger: references[3],
    });
    return fields;
  };

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.some((file) => {
      if (file.size) {
        setImage({
          preview: URL.createObjectURL(file),
          raw: file.path,
        });
      }
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
  });

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
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log("Button Submeter pressed!");

    for (let i = 0; i < pubFields.length; i++) {
      if (pubFields[i]["trigger"]) {
        pubFields[i]["trigger"].current();
      }
    }

    initialData.nome = pubFields[0]["value"];
    initialData.email = pubFields[1]["value"];
    if(pubFields[2]["value"] == rolesList[0].value){
      initialData.isAdministrador = true;
      initialData.isGestor = false;
      initialData.isColaborador = false;
    }
    else if(pubFields[2]["value"] ==  rolesList[1].value){
      initialData.isAdministrador = false;
      initialData.isGestor = true;
      initialData.isColaborador = true;
    }
    else{
      initialData.isAdministrador = false;
      initialData.isGestor = false;
      initialData.isColaborador = true;
    }

    //initialData.manager.name = pubFields[3]["value"]["value"];
    console.log(initialData);

    UtilizadoresService.updateUtilizador(initialData).then((data)=>{
      console.log(data);
    });

    
  };

  const goBack = () => {
    navigate("/home/controlo/colaboradores");
  };



  return (
    <div className="w-full h-full overflow-y-hidden ml-8 mr-8">
      <div className="sticky mt-16 ml-8 flex flex-row items-center gap-5">
        <GoBackButton url={prevUrl} />
        <h1 className="text-white font-bold text-3xl">Editar Colaborador</h1>
      </div>

      <div className="w-full h-full overflow-scroll scrollbar-hide">
        <div className="mt-10 flex justify-evenly">
          <form onSubmit={handleFormSubmit} className="" noValidate>
            <div className="flex justify-between sm:justify-start">
              <div className="mr-20">
                {/* Image */}
                <div className="flex items-center justify-center">
                  <div
                    {...getRootProps()}
                    className="relative w-16 h-16 mb-4 cursor-pointer"
                  >
                    <img className="rounded-full" src={image.preview} />
                    <PlusCircle className="bottom-0 left-10 absolute w-5 h-5 text-primary" />
                    <input {...getInputProps()} />
                  </div>
                </div>

                <ul className="grid grid-cols-2">
                  {pubFields.map((field, index) => (
                    <li key={index}>
                      <div className="mb-4 mx-10 w-[295px]">
                        <TextInput
                          index={index}
                          name={field.name}
                          callback={field.callback}
                          value={field.value}
                          required={field.required}
                          type={field.type}
                          list={field.list}
                          multi={field.multi}
                          style={field.style}
                          error={field.error}
                          trigger={field.trigger}
                          searchCall={field.searchCall}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="absolute right-20 bottom-10">
              <button
                className="sticky bottom-0 mr-2 px-4 py-2 bg-darkBlack text-gray4 font-semibold text-sm rounded-sm hover:shadow-btn border-[1px] border-gray4  focus:border-white"
                onClick={goBack}
              >
                Cancelar
              </button>
              <button className="sticky bottom-0 px-4 py-2 bg-primary text-darkBlack font-semibold text-sm rounded-sm hover:shadow-btn focus:border-white">
                Editar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
