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
      // TODO
    })

    it('TC04 - Smoke Test do ecrã Adicionar formação.', () => {
      // TODO
    })

    it('TC05 - Smoke Test do ecrã Pesquisar formação.', () => {
      // TODO
    })

    it('TC06 - Smoke Test do ecrã Listar formações.', () => {
      // TODO
    })

    it('TC07 - Smoke Test do ecrã Controlo de Budget.', () => {
      // TODO
    })

    it('TC08 - Smoke Test do ecrã Knowledge base.', () => {
      // TODO
    })

    it('TC09 - Smoke Test do ecrã Adicionar publicação.', () => {
      // TODO
    })

    it('TC10 - Smoke Test do ecrã Aprovar publicação.', () => {
      // TODO
    })
  })
  