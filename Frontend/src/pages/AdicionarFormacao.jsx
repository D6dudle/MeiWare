import { useState } from 'react';
import { DollarSign, Search } from 'react-feather';


export default function AdicionarFormacao() {
  const [formationCamps, setFormationCamps] = useState({
    nomeFormacao: "",
    fornecedor: "",
    justificacaoFormacao: "",
    nomeColaborador: "",
    dataFormacao: "",
    precoFormacao: "",
    descricaoFormacao: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log("Button Submeter pressed!");
    //navigate(`/home`); 
  };


  return (
    <div className="ml-8 mr-8">
      <h1 className="text-white font-bold text-3xl mt-8">
        Adicionar formação
      </h1>

      <div className="mt-16 flex justify-evenly items-center">
        <form onSubmit={handleFormSubmit} className="" noValidate>
        <div className='flex flex-wrap justify-between sm:justify-start'>

          <div className="mr-20">
            {/* NOME */}
            <div className="mb-4">
              <label htmlFor='nomeFormacao' className='text-gray5 text-[14px] '>nome</label>

              <input
                type='text'
                className='inputText'
                id='nomeFormacao'
                placeholder='nome'
                onChange={(e) => { setFormationCamps({...formationCamps, nomeFormacao: e.target.value }) }}
                value={formationCamps.nomeFormacao}
              />
            </div>

            {/* FORNECEDOR */}
            <div className='mb-4'>
              <label htmlFor='fornecedor' className='text-gray5 text-[14px]'>fornecedor</label>
              <div className='relative'>
                <input
                  type='text'
                  className='inputText'
                  id='fornecedor'
                  placeholder='fornecedor'
                  onChange={(e) => { setFormationCamps({...formationCamps, fornecedor: e.target.value }) }}
                  value={formationCamps.fornecedor}
                />
              </div>
            </div>

            {/* JUSTIFICACAO DA FORMACAO */}
            <div className="mb-4">
              <label htmlFor='justificacaoFormacao' className='text-gray5 text-[14px] '>justificação da formação</label>
              <textarea
                className='inputText min-h-[130px]'
                id='justificacaoFormacao'
                placeholder='justificação da formação'
                onChange={(e) => { setFormationCamps({...formationCamps, justificacaoFormacao: e.target.value }) }}
                value={formationCamps.justificacaoFormacao}
              />
            </div>
          </div>

          <div className="mr-20">
            {/* NOME COLABORADOR*/}
            <div className="mb-4">
              <label htmlFor='nomeColaborador' className='text-gray5 text-[14px] '>nome colaborador</label>
              <input
                type='text'
                className='inputText'
                id='nomeColaborador'
                placeholder='nome'
                onChange={(e) => { setFormationCamps({...formationCamps, nomeColaborador: e.target.value }) }}
                value={formationCamps.nomeColaborador}
              />
            </div>

            {/* DATA */}
            <div className='mb-4'>
              <label htmlFor='data' className='text-gray5 text-[14px]'>data</label>
              <div className='relative'>
                <input
                  type='text'
                  className='inputText'
                  id='data'
                  placeholder='data'
                  onChange={(e) => { setFormationCamps({...formationCamps, dataFormacao: e.target.value }) }}
                  value={formationCamps.dataFormacao}
                />
              </div>
            </div>

            {/* PREÇO */}
            <div className='mb-4'>
              <label htmlFor='preco' className='text-gray5 text-[14px]'>preço</label>
              <div className='relative'>
                <input
                  type='text'
                  className='inputText'
                  id='preco'
                  placeholder='preço'
                  onChange={(e) => { setFormationCamps({...formationCamps, precoFormacao: e.target.value }) }}
                  value={formationCamps.precoFormacao}
                />
                <div className='absolute right-5 top-4'>
                  <DollarSign className="h-5" />
                </div>
              </div>
            </div>
          </div>

          <div className="mr-20">

            {/* DESCRICAO DA FORMACAO */}
            <div className="mb-4">
              <label htmlFor='descricaoFormacao' className='text-gray5 text-[14px] '>descrição da formação</label>
              <textarea
                className='inputText min-h-[130px]'
                id='descricaoFormacao'
                placeholder='descrição da formação'
                onChange={(e) => { setFormationCamps({...formationCamps, descricaoFormacao: e.target.value }) }}
                value={formationCamps.descricaoFormacao}
              />
            </div>




          </div>

        </div>

        <div className='flex justify-end items-center mt-6 '>
          <button className="flex items-center px-4 py-2 bg-primary text-darkBlack font-semibold text-sm rounded-sm hover:shadow-btn focus:border-white" >

            Login
          </button>
        </div>
        </form>

      </div>


    </div>
  )
}
