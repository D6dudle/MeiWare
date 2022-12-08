import React, { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { PlusCircle } from "react-feather";
import TextInput from "../components/TextInput";
import DefaultAvatar from "../assets/DefaultAvatar.png";
import GoBackButton from "../components/GoBackButton";
import { useLocation } from "react-router-dom";
import { getDataUsers } from "../constants/tabelaUtilizadores";
import DropdownFilter from "../components/DropdownFilter";
import { input } from "@material-tailwind/react";

export default function EditarColaborador() {
  const personId = useLocation().search.slice(4);
  //Dumb Data
  const initialData = {
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

  const fakeManagerList = [
    { label: "Francisco", value: "Francisco" },
    { label: "Jon Jones", value: "Jon Jones" },
  ];

  var prevUrl = useLocation().state;
  if (prevUrl === null) {
    console.log("NADA");
    prevUrl = "/home/controlo/colaboradores";
  } else {
    prevUrl = prevUrl.prevUrl;
  }

  const [image, setImage] = useState({
    preview: initialData.imgUrl,
    raw: initialData.imgUrl,
  });

  const filterManager = (inputValue) => {
    return fakeManagerList.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const references = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const config = (handleType, handleDropdown) => {
    const fields = [];
    fields.push({
      name: "nome",
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
      required: true,
      callback: handleType,
      value: initialData.role,
      trigger: references[2],
    });
    fields.push({
      name: "gestor responsável",
      type: "dropsearch",
      list: fakeManagerList,
      callback: handleDropdown,
      value: fakeManagerList[1], //Preencher com manager
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

    //TODO: UPLOAD DA FOTO PARA A BASE DE DADOS
    // ver: https://www.bezkoder.com/react-file-upload-spring-boot/
    initialData.name = pubFields[0]["value"];
    initialData.email = pubFields[1]["value"];
    initialData.role = pubFields[2]["value"];
    initialData.manager.name = pubFields[3]["value"]["value"];

    console.log(initialData);
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
              <button className="sticky bottom-0 px-4 py-2 bg-primary text-darkBlack font-semibold text-sm rounded-sm hover:shadow-btn focus:border-white">
                Submeter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
