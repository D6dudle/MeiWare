import { useState, useEffect } from "react";
import { Search } from "react-feather";
import Select from "react-select";
import TextInput from "../components/TextInput";
import { ChevronDown, ChevronUp, Filter, Minus, Plus } from "react-feather";
import users from "../constants/usersAux.json";
import ForumTopic from "../components/ForumTopic";
import DateOrder from "../components/DateOrder";
import { knowledgeBaseList } from "../constants/menuConstants";
import { EmptyState } from "../components/EmptyState";
import ListaUtilizadoresService from "../services/getListaUtilizadoresService";

export const PesquisarForum = ({}) => {
  const [listKnowledgeBase, setListKnowledgeBase] = useState(knowledgeBaseList);
  const [filteredList, setFilteredList] = useState(listKnowledgeBase);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState();
  const [dateSortIncreasing, setDateSort] = useState(false);
  const [values, setValues] = useState([]);
  const [colabList, setColabList] = useState([]);
  const [formationCamps, setFormationCamps] = useState({
    nomeColaborador: [],
    data: new Date(),
  });

  useEffect(() => {
    //Obter lista de colaboradores no dropdown

    ListaUtilizadoresService.getListaUtilizadores().then((data) => {
      setColabList(data);
    });
  }, []);

  useEffect(() => {
    var list = knowledgeBaseList;
    if (search && search !== "") {
      list = list.filter((item) =>
        item.nomeFormacao.toLowerCase().includes(search.toLowerCase())
      );
      if (values.length > 0) {
        for (let i = 0; i < values[1].length; i++) {
          list = list.filter((item) => item.username == values[1][i].label);
        }
      }
    } else {
      if (values.length > 0) {
        for (let i = 0; i < values[1].length; i++) {
          list = list.filter((item) => item.username == values[1][i].label);
        }
      }
    }

    var tempData = [...list];
    setFilteredList(tempData);
  }, [search, values, knowledgeBaseList, dateSortIncreasing]);

  const filterColab = (inputValue) => {
    return colabList.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

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
  const colaboradores = [
    { label: "Bruno", value: "Bruno" },
    { label: "Diogo", value: "Diogo" },
    { label: "Henrique", value: "Henrique" },
    { label: "José", value: "José" },
    { label: "Nuno", value: "Nuno" },
    { label: "Pedro", value: "Pedro" },
  ];

  const handleArquivarPublicacao = (list) => {
    setListKnowledgeBase(
      listKnowledgeBase.filter((data) => data.formacaoId !== list.formacaoId)
    );
  };

  const handleType = (index, event) => {
    setSearch(event.target.value);
  };

  const handleDropdown = (index, opt) => {
    let data = [...values];
    data[index] = opt;
    setValues(data);
  };

  const handleDateChanged = (increasing) => {
    setDateSort(increasing);
  };

  return (
    <div className="pl-8 pr-8 h-full overflow-scroll scrollbar-hide">
      <h1 className="sticky text-white font-bold mt-[30px] text-2xl">
        Pesquisar no Fórum
      </h1>

      <div className="mt-8 justify-evenly">
        <div className="flex flex-row gap-4 mb-2">
          <div className="flex flex-row h-fit justify-between items-center gap-8">
            {/* PESQUISA... */}
            <TextInput
              index={1}
              name={"pesquisa..."}
              type={"searchbar"}
              style={"w-[30rem]"}
              showTitle={false}
              callback={handleType}
              value={search}
            />

            {/* COLABORADOR */}
            <div>
              <TextInput
                index={1}
                name={"colaborador"}
                type="dropdown"
                titleStyle={"font-bold mb-1 text-2xl"}
                style={"w-[30rem]"}
                placeholder="colaborador..."
                list={colabList}
                multi={true}
                showTitle={false}
                error={"Por favor selecione ou adicione um nome"}
                value={values[1]}
                callback={handleDropdown}
                searchCall={filterColab}
              />
            </div>

            <div className="flex justify-center items-center">
              <DateOrder callback={handleDateChanged} />
            </div>
          </div>
        </div>
        {/*Forum componente*/}
        <div>
          {Object.keys(filteredList).length > 0 && filteredList !== null ? (
            filteredList.map((list, index) => (
              <ForumTopic
                key={index}
                username={list.username}
                dataPublicacao={list.dataPublicacao}
                titulo={list.titulo}
                nomeFormacao={list.nomeFormacao}
                descricao={list.descricao}
                formacaoId={list.formacaoId}
                arquivar={list.arquivar}
                publicacaoCompleta={list.publicacaoCompleta}
                urlBack={"/home/knowledge"}
                onForumTopicArchive={() => handleArquivarPublicacao(list)}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
};
export default PesquisarForum;
