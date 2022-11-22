import React from "react";
import { useState } from "react";
import { Search } from "react-feather";
import Select from "react-select";
import { ChevronDown, ChevronUp, Filter, Minus, Plus } from "react-feather";

export const PesquisarForum = ({}) => {

    const [query, setQuery] = useState("");
    const [formationCamps, setFormationCamps] = useState({
        nomeColaborador: [],
        data: new Date(),
      });

    const colaboradorStyles = {
    option: (provided) => ({
        ...provided,
        color: "#F2F2F2",
        background: "#282828",
        primary25: "#E0E0E0",
    }),
    control: (base, state) => ({
        ...base,
        background: "#282828",
        color: "#F2F2F2",
        backgroundColor: state.isFocused ? "#ECC039" : "3e3e3e",

        // Removes weird border around container
        boxShadow: state.isFocused ? "#ECC039" : "#ECC039",
        "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "#ECC039" : "#ECC039",
        },
    }),

    menuList: (base) => ({
        ...base,
        // kill the white space on first and last option
        padding: 0,
    }),
    };
    const [isDataDecrescente, setDataDecrescente] = useState(false); // Is DataDecrescente open?
    const colaboradores = [
        { label: "Bruno", value: "Bruno" },
        { label: "Diogo", value: "Diogo" },
        { label: "Henrique", value: "Henrique" },
        { label: "José", value: "José" },
        { label: "Nuno", value: "Nuno" },
        { label: "Pedro", value: "Pedro" },
      ];

    return(
        <div className="pl-8 pr-8 w-full h-full overflow-scroll scrollbar-hide">
            <h1 className="sticky text-white font-bold mt-[30px] text-2xl">
                Pesquisar no Fórum
            </h1>

            <div className="mt-8  justify-evenly w-full">
                <div className="flex flex-wrap justify-between sm:justify-start">
                    <div className="mr-20 w-8/12">
                        {/* PESQUISA... */}
                        <div className="relative">
                            <div className="absolute left-2 top-5">
                                <Search className="h-4" />
                            </div>

                            <input
                                type="text"
                                placeholder="pesquisa..."
                                className="inputText search pl-[35px]"
                                id="nomeSearchForum"
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>

                        {/* COLABORADOR */}
                        <div className="mb-4">
                            <div className="relative">
                                <div className="absolute left-5 top-4">
                                    <Search className="h-5" />
                                </div>

                                <Select
                                    //className={` ${formationCamps.nomeColaborador || isSubmit === false ? null : 'border-error'}`}
                                    styles={colaboradorStyles}
                                    options={colaboradores}
                                    isMulti
                                    placeholder="colaborador"
                                    value={formationCamps.nomeColaborador}
                                    onChange={(opt) => {
                                    console.log(opt);
                                    setFormationCamps({
                                        ...formationCamps,
                                        nomeColaborador: opt,
                                    });
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex gap-1 mb-4">
                            <button
                                className="btnSearchFunc"
                                onClick={() => {
                                /* Logica ordenar lista */
                                setDataDecrescente(!isDataDecrescente);
                                }}
                                >
                            
                                {isDataDecrescente ? (
                                <><p className="btnIcons leading-[120%]">Data Decrescente</p><ChevronDown className="w-4 h-4 btnIcons" /></>
                                ) : (
                                <><p className="btnIcons leading-[120%]">Data Crescente</p><ChevronUp className="w-4 h-4 btnIcons" /></>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>



                
            </div>
        </div>


    )

}
export default PesquisarForum;