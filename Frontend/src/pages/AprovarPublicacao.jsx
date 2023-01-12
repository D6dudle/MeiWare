import { useState, useEffect, useRef } from "react";
import { DollarSign, Search } from "react-feather";
import TextInput from "../components/TextInput";
import DropzoneFiles from "../components/Dropzone";
import users from "../constants/usersAux.json";
import ForumTopic from "../components/ForumTopic";
import { EmptyState } from "../components/EmptyState";
import ListaUtilizadoresService from "../services/getListaUtilizadoresService";
import PublicacaoService from "../services/publicacao.service";
import UserService from "../services/user.service";

export default function AprovarPublicacao() {
  const pubList = [
    {
      username: "Bruno Gandres",
      dataFormacao: "21/11/2000",
      titulo: "Materiais React JS",
      nomeformacao: "Introdução",
      descricao:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget lobortis lectus, non sodales purus. Duis eget ex congue, mattis nulla vel, suscipit velit. Cras sollicitudin lectus ut nibh sollicitudin, eu sodales ligula bibendum. Integer elementum congue ultrices. Curabitur justo nulla, scelerisque id pellentesque nec, placerat vel urna. Duis condimentum lacinia auctor. Morbi sed nisl non magna congue convallis vitae sed enim.",
      cursoId: "G-C-765",
      tags: ["React", "Java"],
    },
    {
      username: "Nelso Gervásio",
      dataFormacao: "25/12/1969",
      titulo: "Materiais MongoDB",
      nomeformacao: "Introdução",
      descricao:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget lobortis lectus, non sodales purus. Duis eget ex congue, mattis nulla vel, suscipit velit. Cras sollicitudin lectus ut nibh sollicitudin, eu sodales ligula bibendum. Integer elementum congue ultrices. Curabitur justo nulla, scelerisque id pellentesque nec, placerat vel urna. Duis condimentum lacinia auctor. Morbi sed nisl non magna congue convallis vitae sed enim.",
      cursoId: "G-C-777",
      tags: ["React", "Java"],
    },
  ];

  const tags = [
    { label: "React", value: "React" },
    { label: "Angular", value: "Angular" },
    { label: "C++", value: "C++" },
    { label: "Java", value: "Java" },
    { label: "Python", value: "Python" },
    { label: "Javascript", value: "Javascript" },
  ];

  const [publicacoes, setPublicacoes] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState();
  const [colabList, setColabList] = useState([]);
  const [tagList, setTags] = useState(tags);
  const [values, setValues] = useState([]);
  const [tagValues, setTagValues] = useState([]);

  useEffect(() => {
    //Obter lista de colaboradores no dropdown

    ListaUtilizadoresService.getListaUtilizadores().then((data) => {
      setColabList(data);
    });
  }, []);

  useEffect(() => {
    if(UserService.getCurrentUser().isGestor) {
      PublicacaoService.getPublicacoesPendentes().then((data) => {
        setPublicacoes(data);
        setFilteredList(data);
      });
    }
  }, []);

  useEffect(() => {
    var list = publicacoes;
    if (search && search !== "") {
      list = list.filter((item) =>
        item.nomeformacao.toLowerCase().includes(search.toLowerCase())
      );
      if (values.length > 0) {
        for (let i = 0; i < values[1].length; i++) {
          list = list.filter((item) => item.username == values[1][i].label);
        }
      }
      if (tagValues.length > 0) {
        for (let i = 0; i < tagValues[1].length; i++) {
          list = list.filter((item) => item.tags == tagValues[1][i].label);
        }
      }
    } else {
      if (values.length > 0) {
        for (let i = 0; i < values[1].length; i++) {
          list = list.filter((item) => item.username == values[1][i].label);
        }
      }
      if (tagValues.length > 0) {
        for (let i = 0; i < tagValues[1].length; i++) {
          list = list.filter((item) => item.tags == tagValues[1][i].label);
        }
      }
    }

    var tempData = [...list];
    setFilteredList(tempData);
  }, [search, values, tagValues, publicacoes]);

  const handleType = (index, event) => {
    setSearch(event.target.value);
  };

  const handleDropdown = (index, opt) => {
    let data = [...values];
    data[index] = opt;
    setValues(data);
  };

  const handleDropdownTags = (index, opt) => {
    let data = [...tagValues];
    data[index] = opt;
    setTagValues(data);
  };

  const filterColab = (inputValue) => {
    return colabList.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const filterTags = (inputValue) => {
    return tagList.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log("Button Submeter pressed!");

    for (let i = 0; i < pubFields.length; i++) {
      console.log("Field -> ", pubFields[i]);
    }
    //navigate(`/home`);
  };

  const handleArquivarPublicacao = (list) => {
    if(UserService.getCurrentUser().isGestor) {
      PublicacaoService.arquivarPublicacao(list.id).then(() => {
        var filtered = publicacoes.filter((data) => data.cursoId !== list.cursoId);
        setPublicacoes(filtered);
        window.location.reload(false);
      });
    }
  };

  const handleAprovarPublicacao = (list) => {
    if(UserService.getCurrentUser().isGestor) {
      PublicacaoService.aprovarPublicacao(list.id).then(() => {
        var filtered = publicacoes.filter((data) => data.cursoId !== list.cursoId);
        setPublicacoes(filtered);
        window.location.reload(false);
      });
    }
  };

  return (
    <div className="pl-8 pr-8 h-full overflow-hidden">
      <div className="h-full flex flex-col">
        <div className="sticky top-5">
          <h1 className=" text-white font-bold text-3xl">Aprovar publicação</h1>
          <div className="mt-4">
            <TextInput
              index={1}
              name={"pesquisa..."}
              type={"searchbar"}
              //style={"w-full"}
              showTitle={false}
              callback={handleType}
              value={search}
            />

              <div className="flex flex-row w-full items-center gap-4 pt-2 pb-2">
                  <div className="flex-grow">
                    <TextInput
                      index={1}
                      name={"tags"}
                      type="dropsearch"
                      titleStyle={"font-bold mb-1 text-2xl"}
                      //style={"w-[50rem]"}
                      placeholder="tags..."
                      list={colabList}
                      multi={true}
                      showTitle={false}
                      error={"Por favor selecione ou adicione uma tag"}
                      value={tagValues[1]}
                      callback={handleDropdownTags}
                      searchCall={filterTags}
                    />
                  </div>

                  <div className="flex-grow">
                    <TextInput
                      index={1}
                      name={"colaborador"}
                      type="dropdown"
                      titleStyle={"font-bold mb-1 text-2xl"}
                      style={"h-[3.4rem]"}
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
              </div>
            </div>
        </div>

        <div className="pt-3 pb-3 overflow-y-scroll scrollbar-hide">
            <div className="overflowy-y-visible flex flex-nowrap justify-between flex-col gap-3">
              {Object.keys(filteredList).length > 0 && filteredList !== null ? (
                filteredList.map((pub, index) => (
                  <ForumTopic
                    key={index}
                    username={pub.quemPublicou}
                    dataPublicacao={pub.dataCriacao}
                    titulo={pub.titulo}
                    nomeFormacao={pub.tituloFormacao}
                    descricao={pub.descricao}
                    formacaoId={pub.formacaoId}
                    anexos={pub.anexos}
                    tags={pub.tags}
                    arquivar={false}
                    aprovar={true}
                    urlBack={"/home/knowledge/aprovar-publicacao"}
                    onForumTopicArchive={() => handleArquivarPublicacao(pub)}
                    onForumTopicAprovar={() => handleAprovarPublicacao(pub)}
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
}

/*

  const handleType = (index, event) => {
    let data = [...values];
    data[index] = event.target.value;
    setValues(data);
  };
  

          <div className="w-full pb-2">
            <TextInput
              index={0}
              type="searchbar"
              noTitle={true}
              callback={handleType}
              value={values[0]}
            />
          </div>
          
            <div className="w-full pr-2">
              <TextInput
                index={1}
                name={"tags"}
                type="dropsearch"
                list={tagList}
                multi={true}
                value={values[1]}
                placeholder="tags..."
                callback={handleDropdown}
                searchCall={filterTags}
              />
            </div>

            <div className="w-full pl-2">
              <TextInput
                index={2}
                name={"colaborador"}
                type="dropsearch"
                list={users}
                multi={true}
                value={values[2]}
                placeholder="colaborador..."
                callback={handleDropdown}
                searchCall={filterColaborador}
              />
            </div>

*/
