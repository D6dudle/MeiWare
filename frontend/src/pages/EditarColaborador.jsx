import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { List, PlusCircle } from "react-feather";
import TextInput from "../components/TextInput";
import GoBackButton from "../components/GoBackButton";
import { useLocation, useNavigate } from "react-router-dom";
import UtilizadoresService from "../services/get-utilizadores.service";

import { Loading } from "../components/Loading";
export default function EditarColaborador() {
  const navigate = useNavigate();
  const personId = useLocation().search.slice(4);

  const [initialData, setInitialData] = useState({});
  const [isLoading, setLoading] = useState(true); // Loading state
  const [gestList, setGestList] = useState([]);
  const [gestAssociado, setGestAssociado] = useState([]);
  const [roleAssociado, setRoleAssociado] = useState([]);

  const [search, setSearch] = useState();

  const rolesList = [
    { label: "Administrador", value: "administrador" },
    { label: "Gestor", value: "gestor" },
    { label: "Colaborador", value: "colaborador" },
  ];

  var ManagerList = [];

  useEffect(() => {
    //Obter lista de gestores
    UtilizadoresService.getGestoresDropdown().then((data) => {
      setGestList(data);
    });
  }, []);

  useEffect(() => {
    UtilizadoresService.getUtilizadoresById(personId).then((utilizador) => {
      setInitialData(utilizador);

      pubFields[0]["value"] = utilizador.nome;
      pubFields[1]["value"] = utilizador.email;

      if (utilizador.isAdministrador) {
        pubFields[2]["value"] = rolesList[0];
        setRoleAssociado(rolesList[0]);
      } else if (utilizador.isGestor) {
        pubFields[2]["value"] = rolesList[1];
        setRoleAssociado(rolesList[1]);
      } else {
        pubFields[2]["value"] = rolesList[2];
        setRoleAssociado(rolesList[2]);
      }
    });
  }, []);

  useEffect(() => {
    pubFields[3]["list"] = gestList;

    for (var i = 0; i < gestList.length; i++) {
      if (gestList[i].id == initialData.managerId) {
        pubFields[3]["value"] = gestList[i];
        setGestAssociado(gestList[i]);
      }
    }
  }, [gestList]);

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
      //trigger: references[0],
    });
    fields.push({
      name: "email",
      required: true,
      callback: handleType,
      value: initialData.email,
      //trigger: references[1],
    });
    fields.push({
      name: "cargo",
      type: "dropdown",
      list: rolesList,
      required: true,
      callback: handleDropdown,
      value: search,
      //trigger: references[2],
    });
    fields.push({
      name: "gestor responsável",
      type: "dropdown",
      list: gestList,
      callback: handleDropdown,
      value: gestAssociado, //Preencher com manager
      //searchCall: filterManager,
      //trigger: references[3],
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

    for (let i = 0; i < pubFields.length; i++) {
      if (pubFields[i]["trigger"]) {
        pubFields[i]["trigger"].current();
      }
    }

    var sent = {
      id: Number(personId),
      nome: pubFields[0]["value"],
      email: pubFields[1]["value"],
      managerId: pubFields[3]["value"].id,
      role: pubFields[2]["value"]["value"],
    };

    initialData.managerId = pubFields[3]["value"].id;

    //initialData.manager.name = pubFields[3]["value"]["value"];

    UtilizadoresService.updateUtilizador(sent).then((data) => {
      goBack();
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
                    {/*
                    <img className="rounded-full" src={image.preview} />
                    */}
                    <div className="inline-flex items-center justify-center w-16 h-16 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                      <span className="font-medium text-gray-600 dark:text-gray-300">
                        {pubFields[0]["value"]
                          ? pubFields[0]["value"].charAt(0)
                          : ""}
                      </span>
                    </div>
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
                          searchCall={filterManager}
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
