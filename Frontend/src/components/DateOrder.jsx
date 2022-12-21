import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";

export default function DateOrder({callback}) {
  const [isDataCrescente, setDataCrescente] = useState(false); // Is DataDecrescente open?

  const callbackChangeDate = () => {
    if(callback){
      callback(!isDataCrescente);
    }
    setDataCrescente(!isDataCrescente);
  };

  return (
    <button
      className="btnSearchFunc h-fit"
      onClick={() => {
        /* Logica ordenar lista */
        callbackChangeDate();
      }}
    >
      {isDataCrescente ?  (
        <>
          <p className="btnIcons leading-[120%]">Data Crescente</p>
          <ChevronUp className="w-4 h-4 btnIcons" />
        </>
      ) : (
        <>
          <p className="btnIcons leading-[120%]">Data Decrescente</p>
          <ChevronDown className="w-4 h-4 btnIcons" />
        </>
      )}
    </button>
  );
}
