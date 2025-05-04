/// <reference types="cypress" />

interface User {
  email: string;
  password: string;
}

interface Users {
  validUser: User;
  invalidUser: User;
}

describe('Authentication', () => {
  let users: Users;

  before(() => {
    cy.fixture('users.json').then((userData: Users) => {
      users = userData;
    });
  });

  beforeEach(() => {
    cy.visit('/auth');
  });

  it('should display the login form', () => {
    cy.get('form').should('be.visible');
    cy.get('input[name=email]').should('be.visible');
    cy.get('input[name=password]').should('be.visible');
    cy.contains('button', 'Log in').should('be.visible');
  });

  it('should toggle between login and signup modes', () => {
    cy.contains('button', 'Log in').should('be.visible');
    cy.contains('button', 'Switch too Log in').should('be.visible');
    cy.contains('button', 'Switch too Log in').should('be.visible').click();
    cy.contains('button', 'Switch too Sign Up').should('be.visible');
    cy.contains('button', 'Switch too Sign Up').click();
    cy.contains('button', 'Sign Up').should('be.visible');
  });

  it('should show validation errors for empty fields', () => {
    // Try to submit without entering data
    cy.contains('button', 'Sign Up').should('be.disabled');

    // Enter invalid email
    cy.get('input[name=email]').type('invalid');
    cy.get('input[name=password]').type('password');
    cy.contains('button', 'Sign Up').should('be.disabled');

    // Enter valid email but short password
    cy.get('input[name=email]').clear().type(users.validUser.email);
    cy.get('input[name=password]').clear().type('12345');
    cy.contains('button', 'Sign Up').should('be.disabled');

    // Enter valid data
    cy.get('input[name=password]').clear().type(users.validUser.password);
    cy.contains('button', 'Sign Up').should('be.enabled');
  });

  it('should attempt login with valid credentials', () => {
    cy.login(users.validUser.email, users.validUser.password);
    cy.contains('button', 'New Recipe').should('be.visible');
  });

  it('should handle failed login attempts', () => {
    cy.intercept('POST', 'http://localhost:3000/api/auth/login', {
      statusCode: 500,
    }).as('loginFailure');
    cy.login(users.invalidUser.email, users.invalidUser.password);
    cy.wait('@loginFailure');
  });
}); 