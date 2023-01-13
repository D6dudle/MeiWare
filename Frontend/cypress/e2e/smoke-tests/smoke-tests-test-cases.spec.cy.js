/**
 * Smoke Tests
 * 
 * Cypress WebUI Testing
 * 
 * Meiware | 2022/2023
 */

/// <reference types="cypress-xpath" />

describe('Smoke Tests', () => {

    beforeEach(() => {
      cy.login({
        email: "jose@email.com",
        password: "123456",
      });
    });
  
    it('TC02 - Smoke Test do ecrã Home.', () => {
      // Opens Login Screen
      //cy.visit('/home/')
      
      // Asserts URL
      cy.url().should("match", /\/home/);

      // Título da página corresponde a “Home“
      cy.xpath("(//span[normalize-space()='Home'])[1]").should('have.text', 'Home')//.contains('Home');

      // Botão da sidebar está clickable
      cy.xpath("(//img[@class='absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-darkBlack false'])[1]").should('be.visible');

      // Botão de “Formações“ está clickable
      cy.xpath("(//span[normalize-space()='Formações'])[1]").should('be.visible');

      // Botão de “Controlo de Budget“ está clickable
      cy.xpath("(//span[normalize-space()='Controlo de budget'])[1]").should('be.visible');

      // Botão de “Knowledge Base“ está clickable
      cy.xpath("(//span[normalize-space()='Knowledge base'])[1]").should('be.visible');

      // Botão de “Logout“ está clickable
      cy.xpath("(//*[name()='svg'][@class='menuIcon'])[1]").should('be.visible');

      // Utilizador autenticado (canto inferior esquerdo) corresponde a um “Admin“, cujo nome é “José“ e email é “jose@email.com“
      cy.xpath("(//span[@class='font-IBM font-normal text-xs text-white '])[1]").should('have.text', 'ADMIN');
      cy.xpath("(//span[contains(@class,'font-IBM font-normal text-sm text-white')])[1]").should('have.text', 'José');
      cy.xpath("(//span[@class='font-IBM font-normal text-xs text-gray4'])[1]").should('have.text', "jose@email.com");
    })

    it('TC03 - Smoke Test do ecrã Formações.', () => {
      // Opens Formacao Screen
      cy.wait(2000);
      cy.visit('/home/formacao');

      // Asserts URL
      cy.url().should('include', '/home/formacao');

      // Título corresponde a “Dashboard Overview“
      cy.xpath("(//h1[normalize-space()='Dashboard Overview'])[1]").should('have.text', 'Dashboard Overview');

      // Cartão com título “Orçamento restante“
      cy.xpath("(//p[normalize-space()='Orçamento restante'])[1]").should('have.text', 'Orçamento restante');

      // Cartão com título “Gastos Totais“
      cy.xpath("(//p[normalize-space()='Gastos Totais'])[1]").should('have.text', 'Gastos Totais');

      // Cartão com título “Formações realizadas“
      cy.xpath("(//p[normalize-space()='Formações realizadas'])[1]").should('have.text', 'Formações realizadas');

      // Cartão com título “Novas Formações“
      cy.xpath("(//p[normalize-space()='Novas Formações'])[1]").should('have.text', 'Novas Formações');

    })

    it('TC04 - Smoke Test do ecrã Adicionar formação.', () => {
      // Opens Add Formation Screen
      cy.wait(2000);
      cy.visit('/home/formacao/adicionar-formacao');

      // Asserts URL
      cy.url().should('include', '/home/formacao/adicionar-formacao');

      // Título corresponde a “Adicionar formação“
      cy.xpath("(//h1[normalize-space()='Adicionar formação'])[1]").should('have.text', 'Adicionar formação');

      // Campo de “nome” está enabled
      cy.xpath("(//input[@id='nomeFormacao'])[1]").should('be.enabled');

      // Campo de “fornecedor” está enabled
      cy.xpath("(//input[@id='fornecedor'])[1]").should('be.enabled');

      // Campo de “justificação da formação” está enabled
      cy.xpath("(//textarea[@id='justificacaoFormacao'])[1]").should('be.enabled');

      // Campo de “nome colaborador” está enabled
      cy.xpath("(//input[@id='react-select-3-input'])[1]").should('be.enabled');

      // Campo de “data” está enabled
      cy.xpath("(//input[@id='data'])[1]").should('be.enabled');

      // Campo de “preço” está enabled
      cy.xpath("(//input[@id='preco'])[1]").should('be.enabled');

      // Campo de “descrição da formação“ está enabled
      cy.xpath("(//textarea[@id='descricaoFormacao'])[1]").should('be.enabled');

      // Botão de “Submeter“ é clickable
      cy.xpath("(//button[normalize-space()='Submeter'])[1]").should('be.visible');

    })

    /* it('TC05 - Smoke Test do ecrã Pesquisar formação.', () => {  // CANCELADO
      // Opens Search Formation Screen
      cy.wait(2000);
      cy.visit('/home/formacao/pesquisar-formacao');

      // Asserts URL
      cy.url().should('include', '/home/formacao/pesquisar-formacao');

      // Título corresponde a “Pesquisar formação“
      cy.xpath("(//h1[normalize-space()='Pesquisar formação'])[1]").should('have.text', 'Pesquisar formação');

      // Campo de “pesquisa…” está enabled
      // cy.xpath("(//input[@id='nomeSearchFormacao'])[1]").should('be.enabled');     // ---> Este ecra tem de ser reformulado

      // Campo de “colaborador…” está enabled
      // cy.xpath("(//input[@id='react-select-5-input'])[1]").should('be.enabled');   // ---> Este ecra tem de ser reformulado

    })*/

    it('TC06 - Smoke Test do ecrã Gerir formações.', () => {
      // Opens Search Formation Screen
      cy.wait(2000);
      cy.visit('/home/controlo/gerir-formacoes');

      // Asserts URL
      cy.url().should('include', '/home/controlo/gerir-formacoes');

      // Título corresponde a “Gerir formações“
      cy.xpath("(//h1[normalize-space()='Gerir formações'])[1]").should('have.text', 'Gerir formações');

      // Campo de “pesquisa…” está enabled
      cy.xpath("(//input[@id='pesquisa...'])[1]").should('be.enabled');

      // Campo de “colaborador…” está enabled
      cy.xpath("(//input[@id='react-select-3-input'])[1]").should('be.enabled');

      // Botão de “formações pendentes“ é clickable
      cy.xpath("(//div[contains(text(),'Formações pendentes')])[1]").should('be.visible');

      // Botão de “formações a decorrer“ é clickable
      cy.xpath("(//div[contains(text(),'Formações a decorrer')])[1]").should('be.visible');

      // Botão de “formações terminadas“ é clickable
      cy.xpath("(//div[contains(text(),'Formações terminadas')])[1]").should('be.visible');

    })

    it('TC07 - Smoke Test do ecrã Controlo de Budget.', () => {
      // Opens Search Formation Screen
      cy.wait(2000);
      cy.visit('/home/controlo');

      // Asserts URL
      cy.url().should('include', '/home/controlo');

      // Título corresponde a “Dashboard“
      cy.xpath("(//h1[normalize-space()='Dashboard'])[1]").should('have.text', 'Dashboard');

      // Cartão com título “Orçamento atual da empresa“
      cy.xpath("(//p[normalize-space()='Orçamento atual da empresa'])[1]").should('have.text', 'Orçamento atual da empresa');

      // Cartão com título “Gastos Totais“
      cy.xpath("(//p[normalize-space()='Gastos Totais'])[1]").should('have.text', 'Gastos Totais');

      // Cartão com título “Formações realizadas“
      cy.xpath("(//p[normalize-space()='Formações realizadas'])[1]").should('have.text', 'Formações realizadas');

      // Cartão com título “Novas Formações“
      cy.xpath("(//p[normalize-space()='Novas Formações'])[1]").should('have.text', 'Novas Formações');

    })

    it('TC08 - Smoke Test do ecrã Knowledge base.', () => {
      // Opens Search Formation Screen
      cy.wait(2000);
      cy.visit('/home/knowledge');

      // Asserts URL
      cy.url().should('include', '/home/knowledge');

      // Título corresponde a “Pesquisar no Fórum“
      cy.xpath("(//h1[normalize-space()='Pesquisar no Fórum'])[1]").should('have.text', 'Pesquisar no Fórum');

      // Campo de “pesquisa…” está enabled
      // cy.xpath("(//input[@id='nomeSearchForum'])[1]").should('be.enabled');     // ---> Este ecra tem de ser reformulado

      // Campo de “colaborador…” está enabled
      // cy.xpath("(//input[@id='react-select-3-input'])[1]").should('be.enabled');   // ---> Este ecra tem de ser reformulado


    })

    it('TC09 - Smoke Test do ecrã Adicionar publicação.', () => {
      // Opens Search Formation Screen
      cy.wait(2000);
      cy.visit('/home/knowledge/adicionar-publicacao');

      // Asserts URL
      cy.url().should('include', '/home/knowledge/adicionar-publicacao');

      // Título corresponde a “Adicionar publicação“
      cy.xpath("(//h1[normalize-space()='Adicionar publicação'])[1]").should('have.text', 'Adicionar publicação');

      // Campo de “título” está enabled
      cy.xpath("(//input[@id='título'])[1]").should('be.enabled');

      // Campo de “tag” está enabled
      cy.xpath("(//input[@id='react-select-3-input'])[1]").should('be.enabled');

      // Campo de “associar formação” está enabled
      cy.xpath("(//input[@id='react-select-5-input'])[1]").should('be.enabled');

      // Campo de “descrição” está enabled
      cy.xpath("(//textarea[@id='descrição'])[1]").should('be.enabled');

      // Botão de “Submeter“ é clickable
      cy.xpath("(//button[normalize-space()='Submeter'])[1]").should('be.visible');

      // Botão de “Cancelar“ é clickable
      cy.xpath("(//button[normalize-space()='Cancelar'])[1]").should('be.visible');

    })

    it('TC10 - Smoke Test do ecrã Aprovar publicação.', () => {
      // Opens Search Formation Screen
      cy.wait(2000);
      cy.visit('/home/knowledge/aprovar-publicacao');

      // Asserts URL
      cy.url().should('include', '/home/knowledge/aprovar-publicacao');

      // Título corresponde a “Aprovar publicação“
      cy.xpath("(//h1[normalize-space()='Aprovar publicação'])[1]").should('have.text', 'Aprovar publicação');

      // Campo de “pesquisa…” está enabled
      cy.xpath("(//input[@placeholder='pesquisa...'])[1]").should('be.enabled');

      // Campo de “tags…” está enabled
      cy.xpath("(//input[@id='react-select-3-input'])[1]").should('be.enabled');

      // Campo de “colaborador…” está enabled
      cy.xpath("(//input[@id='react-select-5-input'])[1]").should('be.enabled');

    })
  })
  