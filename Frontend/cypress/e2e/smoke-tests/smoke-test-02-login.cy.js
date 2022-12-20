/**
 * Smoke Tests
 * 
 * Cypress WebUI Testing
 * 
 * Meiware | 2022/2023
 */

/// <reference types="cypress-xpath" />

describe('Smoke Test', () => {
  
    it('TC02 - Smoke Test do ecrã login.', () => {
      // Opens Login Screen
      cy.visit('/')
      
      // Asserts URL
      cy.url().should("match", /\//);

      // Título da página corresponde a “plataforma de gestão de formações“
      cy.xpath("(//h1[normalize-space()='plataforma de gestão de formações'])[1]").should('have.text', 'plataforma de gestão de formações');

      // Campo de “email“ está enabled
      cy.get('[id="email"]').should('be.enabled');

      // Campo de “password“ está enabled;
      cy.get('[id="password"]').should('be.enabled');

      // Botão de “Login“ está clickable
      cy.get('[class="flex items-center px-4 py-2 bg-primary text-darkBlack font-semibold text-sm rounded-sm hover:shadow-btn focus:border-white"]').should('be.visible');
    })
  })
  