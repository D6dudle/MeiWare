import React from "react";
import { useDropzone } from "react-dropzone";
import { useState, useCallback } from "react";
import { UploadCloud } from "react-feather";
import { useEffect } from "react";
import { iconImageUpload } from "../constants/menuConstants";
import { X } from "react-feather";

function DropzoneFiles({callback, anexos}) {
  const [files, setFiles] = useState([]);
  const [listAnexos, setListAnexos] = useState();

  useEffect(() => {
    if(anexos != null) {
      setFiles(anexos.map(mapResponseToValuesAndLabels));
      console.log(files);
    }
  }, [anexos]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.some((file) => {
      setFiles((prevState) => {
        if (prevState.findIndex((f) => (f.nome || f.name) === (file.nome || file.name)) === -1) {
          if (callback) callback([...prevState, file]);
          return [...prevState, file];
        } else {
          if (callback) callback([...prevState]);
          return [...prevState];
        }
      });
    });
  }, []);

  const mapResponseToValuesAndLabels = (data) => ({
    type: data.type,
    path: data.path,
    size: data.size,
    nome: data.nome,
    id: data.id
  });

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
      "application/pdf": [
        ".doc",
        ".docx",
        ".xls",
        ".xlsx",
        ".csv",
        ".tsv",
        ".ppt",
        ".pptx",
        ".pages",
        ".odt",
        ".rtf",
      ],
      "application/zip": [".rar", ".zip"],
    },
  });

  function bytesToSize(bytes) {
    if (typeof bytes === 'string' || bytes instanceof String) {
      return bytes;
    }
    else {
      const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      if (bytes === 0) return "n/a";
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
      if (i === 0) return `${bytes} ${sizes[i]}`;
      return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
    }
  }

  const ListarFicheiros = ({ fileType, fileName, fileSize }) => {
    function handleRemoveFile(fileName) {
      const newList = files.filter((file) => (file.name || file.nome) !== fileName);
      if (callback) callback(newList);
      setFiles(newList);
    }

    const icon = iconImageUpload.find(({ type }) => type === fileType);
    const sizeFile = bytesToSize(fileSize);
    return (
      <div>
        <div className="flex flex-col justify-center items-start w-[483px] h-[62px] border-2 border-primary rounded-sm mt-2">
          <div className="flex flex-row justify-start items-center ml-2 gap-4 w-full">
            <div className="flex flex-row w-3/5">
              {icon != null && <icon.icon className="mr-2 flex" />}
              <div className="">{fileName}• </div>
            </div>
            <div className="relative w-2/5">
              <div className="flex columns-2 gap-8">{sizeFile}</div>
            </div>
            <div className="pb-12">
              <button
                className="flex h-[24px] w-[24px] px-1 bg-primary text-darkBlack font-semibold text-sm rounded-sm hover:shadow-btn focus:border-white"
                onClick={() => handleRemoveFile(fileName)}
              >
                <X className="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div
        className="flex flex-col items-center justify-center w-full"
        {...getRootProps()}
      >
        <label
          htmlFor="dropzone-file"
          className={`flex flex-col items-center justify-center w-[483px] h-[308px] border-2 border-dashed  ${
            isDragReject
              ? "border-error"
              : isDragAccept
              ? "border-success"
              : "border-gray3"
          }  rounded-md cursor-pointer bg-transparent hover:bg-gray3 `}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud className="w-10 h-10 mb-6 text-white" />
            <p className="mb-2 text-sm text-white">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray3">
              JPEG, PNG, JPG. File no more than 10 MB
            </p>
          </div>
        </label>
        <input {...getInputProps()} />
      </div>
      {files.length > 0 && (
        <div className="">
          {files?.map((file, index) => (
            <ListarFicheiros
              key={index}
              fileType={file.type}
              fileName={file.nome || file.name}
              fileSize={file.size}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DropzoneFiles;
