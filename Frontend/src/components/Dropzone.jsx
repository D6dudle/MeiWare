import React from 'react'
import { useDropzone } from "react-dropzone";
import { useState, useCallback } from 'react';
import { UploadCloud } from 'react-feather'
import { useEffect } from 'react';

function DropzoneFiles() {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach(file => {
      setFiles(prevState => [...prevState, file]);
      
    });
    console.log("acceptedFiles", acceptedFiles);
    console.log("rejectedFiles", rejectedFiles);

  }, []);

  useEffect(() => {
    console.log(files);
  }, [files])
  

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png']
    },
  });

  /* accept: {
    'image/*': ['.jpeg', '.png']
  },
  onDrop: (acceptedFiles) => {
    setFiles(...files, acceptedFiles);
    console.log(acceptedFiles);
    console.log('----------------------------------------------------');
    console.log(files)
  } */

  /* const listOfFiles = files.map((file) => (
    <div key={file.name}>
      <div>
        {file.path} - {file.size} bytes
      </div>

    </div>
  )) */

  return (
    <div>
      <div className="flex items-center justify-center w-full" {...getRootProps()}>
        <label htmlFor="dropzone-file" className={`flex flex-col items-center justify-center w-[483px] h-[308px] border-2 border-dashed  ${isDragActive ? 'border-success': 'border-gray3'} rounded-md cursor-pointer bg-transparent hover:bg-gray3 `}>
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud className="w-10 h-10 mb-6 text-white" />
            <p className="mb-2 text-sm text-white"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray3">JPEG, PNG, JPG. File no more than 10 MB</p>
          </div>
        </label>
        <input {...getInputProps()}/>
      </div>
    </div>
  )
}

export default DropzoneFiles;