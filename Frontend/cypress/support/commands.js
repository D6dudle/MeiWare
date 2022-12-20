// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
    "login",
    (user) => {
      cy.visit("/");
      if (user.email.match(/\S+@\S+\.\S+/)) {
        cy.get('[id="email"]').type(user.email);
      } else {
        // Error
      }
      cy.get('[id="password"]').type(user.password);
      cy.get('[class="flex items-center px-4 py-2 bg-primary text-darkBlack font-semibold text-sm rounded-sm hover:shadow-btn focus:border-white"]').click();
    }
  );
