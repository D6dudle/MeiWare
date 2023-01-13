import React, { useState, useEffect } from "react";
import { Tabs, TabsHeader, TabsBody, Tab } from "@material-tailwind/react";
import TextInput from "../components/TextInput";
import { Formacao } from "../components/Formacao";
import DateOrder from "./DateOrder";
import users from "../constants/usersAux.json";
import { EmptyState } from "./EmptyState";
import UserService from "../services/user.service";
import { Loading } from "./Loading";
import ListaFormacaoUserService from "../services/getListaFormacaoUser";
import { AlertCircle, Zap, Check } from "react-feather";
import PedidoFormacaoService from "../services/pedido-formacao.service";
import ListaUtilizadoresService from "../services/getListaUtilizadoresService";

export default function TrainingTabs({ sideBarName, nomeEcra }) {
  const [isLoading, setLoading] = useState(true); // Loading state
  const [rawList, setRawList] = useState([]);
  const [originalList, setOriginalList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [colabList, setColabList] = useState([]);

  const user = UserService.getCurrentUser(); //Admin ID

  var urlBack = "";

  var JSONList = [
    {
      label: "Formações pendentes",
      value: "pendentes",
      icon: <AlertCircle />,
      formacoes: [],
    },
    {
      label: "Formações a decorrer",
      value: "decorrer",
      icon: <Zap />,
      formacoes: [],
    },
    {
      label: "Formações terminadas",
      value: "terminadas",
      icon: <Check />,
      formacoes: [],
    },
  ];

  useEffect(() => {
    //Obter lista de colaboradores no dropdown

    ListaUtilizadoresService.getListaUtilizadores().then((data) => {
      setColabList(data);
    });
  }, []);

  if (nomeEcra == "LISTARFORMACOES") {
    useEffect(() => {
      const user = UserService.getCurrentUser();
      ListaFormacaoUserService.getListaFormacaoUser(user.id).then((data) => {
        setRawList(data);
        setLoading(false); //set loading state
      });
    }, []);
    useEffect(() => {
      if (rawList != null) {
        console.log(rawList);
        const arr = Object.values(rawList)[0];
        for (const property in arr) {
          // Resposta com a lista de formações do user
          if (arr[property]?.tipoFormacao === "PENDENTE") {
            JSONList[0].formacoes.push(arr[property]);
            //console.log("PENDENTE");
          } else if (arr[property]?.tipoFormacao === "CURSO") {
            JSONList[1].formacoes.push(arr[property]);
            //console.log("CURSO");
          } else if (arr[property]?.tipoFormacao === "TERMINADA") {
            JSONList[2].formacoes.push(arr[property]);
            //console.log("TERMINADA");
          } else {
            //console.log("REJEITADA");
          }
        }

        setOriginalList(JSONList);
        setFilteredList(JSONList[0].formacoes);
      }
    }, [rawList]);
    urlBack = "/home/formacao/minhas-formacoes";
  } else if (nomeEcra == "GERIRPEDIDOS") {
    useEffect(() => {
      const user = UserService.getCurrentUser();
      if (user.isAdministrador) {
        PedidoFormacaoService.getPedidosFormacaoAll().then((data) => {
          setRawList(data);
          setLoading(false);
        });
      } else if (user.isGestor) {
        PedidoFormacaoService.getPedidosFormacaoEquipa(user.id).then((data) => {
          setRawList(data);
          setLoading(false);
        });
      }
    }, []);

    useEffect(() => {
      if (rawList != null) {
        //console.log(rawList);
        for (const property in rawList) {
          // Resposta com a lista de formações do user
          if (rawList[property]?.tipoFormacao === "PENDENTE") {
            JSONList[0].formacoes.push(rawList[property]);
            //console.log("PENDENTE");
          } else if (rawList[property]?.tipoFormacao === "CURSO") {
            JSONList[1].formacoes.push(rawList[property]);
            //console.log("CURSO");
          } else if (rawList[property]?.tipoFormacao === "TERMINADA") {
            JSONList[2].formacoes.push(rawList[property]);
            //console.log("TERMINADA");
          } else {
            //console.log("REJEITADA");
          }
        }

        setOriginalList(JSONList);
        setFilteredList(JSONList[0].formacoes);
      }
    }, [rawList]);
    urlBack = "/home/controlo/gerir-formacoes";
  }

  const [activeFilter, setActiveFilter] = useState(null);
  const [dateSortIncreasing, setDateSort] = useState(false);

  const [search, setSearch] = useState();
  const [values, setValues] = useState([]);

  const handleCancelarFormacao = (card, justificacaoFormacao) => {
    //Gets the index of object to remove the formation

    if (user.isAdministrador) {
      ListaFormacaoUserService.rejeitarPedidoFormacaoAdmin(
        card.idCurso,
        user.id,
        justificacaoFormacao?.data
      ).then((data) => {
        console.log(data);
      });
    } else {
      ListaFormacaoUserService.rejeitarPedidoFormacaoGestor(
        card.idCurso,
        user.id,
        justificacaoFormacao?.data
      ).then((data) => {
        console.log(data);
      });
    }

    const indexList = originalList.findIndex((element) => {
      return element.label === activeFilter;
    });

    const updatedList = originalList[indexList].formacoes.filter(
      (formacao) => formacao.idCurso !== card.idCurso
    );

    var tempData = [...originalList];
    tempData[indexList].formacoes = updatedList;
    setOriginalList(tempData);

    setFilteredList(updatedList);
  };

  const handleAceitarFormacaoPendente = (card) => {
    //Igual ao handleCancelarFormacao (remove o elemento da lista)
    //Gets the index of object to remove the formation

    if (user.isAdministrador) {
      ListaFormacaoUserService.aprovarFormacaoUserAdmin(
        card.idCurso,
        user.id
      ).then((data) => {
        console.log(data);
      });
    } else {
      ListaFormacaoUserService.aprovarPedidoFormacaoGestor(
        card.idCurso,
        user.id
      ).then((data) => {
        console.log(data);
      });
    }

    const indexList = originalList.findIndex((element) => {
      return element.label === activeFilter;
    });

    const updatedList = originalList[indexList].formacoes.filter(
      (formacao) => formacao.idCurso !== card.idCurso
    );

    const indexFormacaoDecorrer = originalList.findIndex((element) => {
      return element.label === "Formações a decorrer";
    });

    var tempData = [...originalList];
    tempData[indexList].formacoes = updatedList;

    //Passar a formação atual para a formação a decorrer
    card.tipoFormacao = "CURSO";
    tempData[indexFormacaoDecorrer].formacoes.push(card);
    setOriginalList(tempData);
    setFilteredList(updatedList);
  };

  const handleFinalizarFormacao = (card) => {
    //Updates the Database
    ListaFormacaoUserService.finalizaFormacaoUser(
      card.idCurso,
      card.nomeFormacao
    ).then((data) => {
      console.log(data);
    });
    //Igual ao handleCancelarFormacao (remove o elemento da lista)
    //Gets the index of object to remove the formation

    const indexList = originalList.findIndex((element) => {
      return element.label === activeFilter;
    });

    const updatedList = originalList[indexList].formacoes.filter(
      (formacao) => formacao.idCurso !== card.idCurso
    );

    const indexFormacaoDecorrer = originalList.findIndex((element) => {
      return element.label === "Formações terminadas";
    });

    var tempData = [...originalList];
    tempData[indexList].formacoes = updatedList;

    //Passar a formação atual para a formação a decorrer
    card.tipoFormacao = "TERMINADA";
    tempData[indexFormacaoDecorrer].formacoes.push(card);
    console.log(card);
    setOriginalList(tempData);
    setFilteredList(updatedList);
  };

  useEffect(() => {
    var list = originalList?.filter((item) => item?.label == activeFilter)[0]
      ?.formacoes;

    if (search && search !== "") {
      list = list.filter((item) =>
        item.nomeFormacao.toLowerCase().includes(search.toLowerCase())
      );
      if (values.length > 0) {
        if(values[1].length > 0){
          let selected_users = values[1].map(item => item.label)
          list = list.filter((item) => item.username.split(", ").some(o => selected_users.includes(o)) );
        }
      }
    } else {
      //Change validation method to parse the username string with includes
      if (values.length > 0) {
        if(values[1].length > 0){
          let selected_users = values[1].map(item => item.label)
          list = list.filter((item) => item.username.split(", ").some(o => selected_users.includes(o)));
        }
      }
    }

    if (list != null) {
      var tempData = [...list];
      tempData = sortByDate(tempData);
      setFilteredList(tempData);
    }
  }, [search, values, activeFilter, dateSortIncreasing]); //Estava aqui o originalList tb

  const filterColab = (inputValue) => {
    return colabList.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const sortByDate = (data) => {
    if (dateSortIncreasing) {
      return data.sort(
        (objA, objB) =>
          Date.parse(objA.dataFormacao) - Date.parse(objB.dataFormacao)
      );
    } else {
      return data.sort(
        (objA, objB) =>
          Date.parse(objB.dataFormacao) - Date.parse(objA.dataFormacao)
      );
    }
  };

  const handleDateChanged = (increasing) => {
    setDateSort(increasing);
  };

  const handleType = (index, event) => {
    setSearch(event.target.value);
  };

  const handleDropdown = (index, opt) => {
    let data = [...values];
    data[index] = opt;
    setValues(data);
  };

  const handleSelectedTab = (label) => {
    setActiveFilter(label);
    //var list = originalList.filter((item) => item.label == label);
    //setFilteredList(list[0].formacoes);
  };

  if (activeFilter == null) handleSelectedTab("Formações pendentes"); // Default tab

  if (originalList == null || activeFilter?.length == null || isLoading)
    return <Loading />;

  return (
    <Tabs
      value="pendentes"
      className="flex flex-col tabsHeader scrollbar-hide pr-5"
    >
      {/* First value */}
      <TabsHeader className="mt-0">
        <div className="flex items-start gap-8 px-[0.625rem]">
          {originalList.map(({ label, value, icon }) => (
            <Tab
              key={value}
              value={value}
              className={`w-fit pb-2 border-b-[0.063rem] border-gray4 text-gray4 font-IBM lowercase hover:border-primary hover:text-primary ${
                label == activeFilter && "text-primary border-primary"
              }`}
              onClick={() => handleSelectedTab(label)}
            >
              <div className="gap-2 flex flex-row justify-between items-center">
                {icon}
                {label}
              </div>
            </Tab>
          ))}
        </div>
      </TabsHeader>

      <div className="flex flex-row gap-4">
        <div className="flex flex-row h-fit justify-between items-center gap-8">
          <TextInput
            index={1}
            name={"pesquisa..."}
            type={"searchbar"}
            style={"w-[30rem]"}
            showTitle={false}
            callback={handleType}
            value={search}
          />
          {nomeEcra !== "LISTARFORMACOES" && (
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
          )}
          <div className="flex justify-center items-center">
            <DateOrder callback={handleDateChanged} />
          </div>
        </div>
      </div>

      <TabsBody className="w-full h-full overflow-y-scroll scrollbar-hide mt-2">
        <div className="overflow-y-visible">
          {activeFilter !== null ? (
            <h1 className="font-bold text-2xl order-none mb-3">
              {activeFilter}
            </h1>
          ) : null}
          <div className="overflowy-y-visible flex flex-nowrap justify-between flex-col gap-3">
            {activeFilter !== null &&
            filteredList.length > 0 &&
            filteredList !== null ? (
              filteredList.map((card, index) => {
                return (
                  <Formacao
                    key={index}
                    username={card.username}
                    nomeFormacao={card.nomeFormacao}
                    dataFormacao={card.dataFormacao}
                    justificacaoFormacao={card.justificacaoFormacao}
                    idCurso={card.idCurso}
                    tipoFormacao={card.tipoFormacao}
                    consultar={true}
                    urlBack={urlBack}
                    onItemDelete={(justificacaoFormacao) =>
                      handleCancelarFormacao(card, justificacaoFormacao)
                    }
                    sidebarName={sideBarName}
                    onAceitarclick={() => handleAceitarFormacaoPendente(card)}
                    onFinalizarClick={() => handleFinalizarFormacao(card)}
                    nomeEcra={nomeEcra}
                  />
                );
              })
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </TabsBody>
    </Tabs>
  );
}
