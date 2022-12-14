import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { PlusCircle, XOctagon } from "react-feather";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";
import DefaultAvatar from "../assets/DefaultAvatar.png";
import GoBackButton from "../components/GoBackButton";
import AuthService from "../services/auth.service";

export default function AdicionarColaborador() {
  const navigate = useNavigate();

  const [image, setImage] = useState({
    preview: DefaultAvatar,
    raw: DefaultAvatar,
  });

  const config = (handleType) => {
    const fields = [];
    fields.push({ name: "nome", required: true, callback: handleType });
    fields.push({ name: "email", required: true, callback: handleType });
    fields.push({ name: "cargo", required: true, callback: handleType });
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

    return config(handleType);
  });

  const [errorMsg, setErrorMsg] = useState({
    show: false,
    msg: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    var nome = pubFields[0].value;
    var email = pubFields[1].value;
    var password = "123456";
    var maxRole = pubFields[2].value;
    var roleList = [];
    if (maxRole) {
      if (
        maxRole.toLowerCase() == "colaborador" ||
        maxRole.toLowerCase() == "colab"
      ) {
        roleList.push("COLABORADOR");
      } else if (maxRole.toLowerCase() == "gestor") {
        roleList.push("COLABORADOR");
        roleList.push("GESTOR");
      } else if (
        maxRole.toLowerCase() == "admin" ||
        maxRole.toLowerCase() == "administrador"
      ) {
        roleList.push("COLABORADOR");
        roleList.push("GESTOR");
        roleList.push("ADMINISTRADOR");
      } else {
        roleList.push(maxRole);
      }
    } else {
      roleList.push(maxRole);
    }

    AuthService.register(nome, email, password, roleList).then(
      () => {
        navigate(`/home/controlo/colaboradores`);
        alert("Success!");
      },
      (error) => {
        setErrorMsg({
          show: true,
          msg: error.response.data.message
            ? error.response.data.message
            : error.response.data.error,
        });
      }
    );
  };

  return (
    <div className="w-full h-full overflow-y-hidden ml-8 mr-8">
      <div className="sticky mt-16 ml-8 flex flex-row items-center gap-5">
        <GoBackButton url={"/home/controlo/colaboradores"} />
        <h1 className="text-white font-bold text-3xl">Adicionar Colaborador</h1>
      </div>

      <div className="w-full h-full overflow-scroll scrollbar-hide">
        <div className="mt-10 flex justify-evenly">
          <form onSubmit={handleFormSubmit} className="" noValidate>
            <div className="flex flex-wrap justify-between sm:justify-start">
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
                <ul>
                  {pubFields.map((field, index) => (
                    <li key={index}>
                      <div className="mb-4 w-[295px]">
                        <TextInput
                          index={index}
                          name={field.name}
                          callback={field.callback}
                          value={field.value}
                          required={field.required}
                          type={field.type}
                          list={field.list}
                          multi={field.multi}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {errorMsg.show && (
              <div className="flex items-center text-error gap-2">
                <XOctagon />
                <p className="text-[14px]">{errorMsg.msg}</p>
              </div>
            )}
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
