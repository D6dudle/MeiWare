import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";

export default function DateOrder() {
  const [isDataDecrescente, setDataDecrescente] = useState(false); // Is DataDecrescente open?
  return (
    <button
      className="btnSearchFunc"
      onClick={() => {
        /* Logica ordenar lista */
        setDataDecrescente(!isDataDecrescente);
      }}
    >
      {isDataDecrescente ? (
        <>
          <p className="btnIcons leading-[120%]">Data Decrescente</p>
          <ChevronDown className="w-4 h-4 btnIcons" />
        </>
      ) : (
        <>
          <p className="btnIcons leading-[120%]">Data Crescente</p>
          <ChevronUp className="w-4 h-4 btnIcons" />
        </>
      )}
    </button>
  );
}
