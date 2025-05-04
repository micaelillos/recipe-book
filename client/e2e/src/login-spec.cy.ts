describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('localhost:4200/auth');
  });

  it('should display login form', () => {
    cy.contains('Email');
    cy.contains('Password');
    cy.contains('Log in');
  });

  it('should not submit form with invalid inputs', () => {
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should allow switching between login and signup', () => {
    cy.contains('Switch too Sign Up').click();
    cy.contains('Switch too Log in');
  });

  it('should allow form submission with valid login credentials', () => {
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('test123');

    cy.get('form').submit();

    cy.url().should('not.include', '/auth');
  });
});
