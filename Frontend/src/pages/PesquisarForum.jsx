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
import PublicacaoService from "../services/publicacao.service";
import UserService from "../services/user.service";
import { Loading } from "../components/Loading";

export const PesquisarForum = ({}) => {
  const [listKnowledgeBase, setListKnowledgeBase] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState();
  const [dateSortIncreasing, setDateSort] = useState(false);
  const [values, setValues] = useState([]);
  const [colabList, setColabList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    //Obter lista de colaboradores no dropdown
    ListaUtilizadoresService.getListaUtilizadores().then((data) => {
      setColabList(data);
    });
  }, []);

  useEffect(() => {
    PublicacaoService.getPublicacoesAprovadas().then((data) => {
      setListKnowledgeBase(data);
      setFilteredList(data);
      setLoading(false);
    });
  }, []);

  const sortByDate = (data) => {
    if (dateSortIncreasing) {
      return data.sort(
        (objA, objB) =>
          Date.parse(objA.dataCriacao) - Date.parse(objB.dataCriacao)
      );
    } else {
      return data.sort(
        (objA, objB) =>
          Date.parse(objB.dataCriacao) - Date.parse(objA.dataCriacao)
      );
    }
  };

  useEffect(() => {
    var list = listKnowledgeBase;
    if (search && search !== "") {
      list = list.filter((item) =>
        item.titulo.toLowerCase().includes(search.toLowerCase())
      );
      if (values.length > 0) {
        if(values[1].length > 0){
          let selected_colab = values[1].map(item => item.label)
          list = list.filter(f => selected_colab.includes(f.quemPublicou))
        }
      }
    } else {
      if (values.length > 0) {
        if(values[1].length > 0){
          let selected_colab = values[1].map(item => item.label)
          list = list.filter(f => selected_colab.includes(f.quemPublicou))
        }
      }
    }

    if (list != null) {
      var tempData = [...list];
      tempData = sortByDate(tempData);
      setFilteredList(tempData);
    }
  }, [search, values, knowledgeBaseList, dateSortIncreasing]);

  const filterColab = (inputValue) => {
    let lista = [...knowledgeBaseList]
    console.log(lista)
    lista.filter((i) =>
      i.quemPublicou.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredList(lista)
    return lista
  };

  const handleArquivarPublicacao = (list) => {
    if(UserService.getCurrentUser().isGestor) {
      PublicacaoService.arquivarPublicacao(list.id).then(() => {
        var filtered = listKnowledgeBase.filter((data) => data.id !== list.id);
        setListKnowledgeBase(filtered);
        window.location.reload(false);
      });
    }
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

  if (isLoading)
    return <Loading />;

  return (
    <div className="pl-8 pr-8 h-full scrollbar-hide">
      <div className="h-full flex flex-col">
        <div className="sticky top-5">
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
                  />
                </div>

                <div className="flex justify-center items-center">
                  <DateOrder callback={handleDateChanged} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Forum componente*/}
        <div className="pt-3 pb-3 overflow-y-scroll scrollbar-hide">
          <div className="overflowy-y-visible flex flex-nowrap justify-between flex-col gap-3">
            {Object.keys(filteredList).length > 0 && filteredList !== null ? (
              filteredList.map((list, index) => (
                <ForumTopic
                  key={index}
                  username={list.quemPublicou}
                  dataPublicacao={list.dataCriacao}
                  titulo={list.titulo}
                  nomeFormacao={list.tituloFormacao}
                  descricao={list.descricao}
                  formacaoId={list.formacaoId}
                  anexos={list.anexos}
                  tags={list.tags}
                  arquivar={UserService.getCurrentUser().isGestor}
                  urlBack={"/home/knowledge"}
                  onForumTopicArchive={() => handleArquivarPublicacao(list)}
                />
              ))
            ) : (
              <EmptyState />
            )}
        </div>
        </div>
      </div>
    </div>
  );
};
export default PesquisarForum;
