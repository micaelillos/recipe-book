/// <reference types="cypress" />
describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('localhost:4200/auth');
  });

  it('should display email and password inputs', () => {
    cy.get('input#email').should('exist');
    cy.get('input#password').should('exist');
  });

  it('should disable submit button if form is invalid', () => {
    cy.get('button[type=submit]').should('be.disabled');
  });

  it('should enable submit button with valid input and trigger login', () => {
    cy.get('button[type=button]').contains('Switch too').click();
    cy.get('input#email').type('test@example.com');
    cy.get('input#password').type('123456');

    cy.get('form').should('be.visible');
    cy.get('button[type=submit]').should('not.be.disabled').click();
  });

  it('should toggle login/signup mode', () => {
    cy.get('button[type=button]').contains('Switch too').click();
    cy.get('button[type=submit]').contains('Log in');
    cy.get('button[type=button]').contains('Switch too').click();
    cy.get('button[type=submit]').contains('Sign Up');
  });
});
