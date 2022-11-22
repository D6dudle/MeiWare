import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { PlusCircle } from "react-feather";
import TextInput from "../components/TextInput";
import DefaultAvatar from "../assets/DefaultAvatar.png";
import GoBackButton from "../components/GoBackButton";

export default function AdicionarColaborador() {
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

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log("Button Submeter pressed!");
    for (let i = 0; i < pubFields.length; i++) {
      console.log("Field -> ", pubFields[i]["value"]);
    }
  };

  return (
    <div className="w-full h-full overflow-y-hidden ml-8 mr-8">
      <div className="sticky mt-16 ml-8 flex flex-row items-center gap-5">
        <GoBackButton />
        <h1 className="text-white font-bold text-3xl">Adicionar Colaborador</h1>
      </div>

      <div className="w-full h-full overflow-scroll scrollbar-hide">
        <div className="mt-10 flex justify-evenly">
          <form onSubmit={handleFormSubmit} className="" noValidate>
            <div className="flex flex-wrap justify-between sm:justify-start">
              <div className="mr-20">
                {/* Image */}
                <div
                  {...getRootProps()}
                  className="relative w-16 h-16 mb-4 cursor-pointer"
                >
                  <img className="rounded-full" src={image.preview} />
                  <PlusCircle className="bottom-0 left-10 absolute w-5 h-5 text-primary" />
                  <input {...getInputProps()} />
                </div>
                <ul>
                  {pubFields.map((field, index) => (
                    <li key={index}>
                      <div className="mb-4">
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
