describe('exemplo do Cy Studio', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('h1').should('have.text', 'Kitchen Sink')
    .and('be.visible');
    /* ==== End Cypress Studio ==== */
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('LoginFeito', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000');
    cy.get('#email').clear('p');
    cy.get('#email').type('papito@webdojo.com');
    cy.get('#password').clear('k');
    cy.get('#password').type('katana123');
    cy.contains('button','Entrar').click();
    cy.get('[data-cy="user-name"]').click();
    cy.get('[data-cy="user-name"]').should('have.text', 'Fernando Papito');
    cy.get('[data-cy="user-name"]').click();
    cy.get('[data-cy="user-name"]').should('be.visible');
    /* ==== End Cypress Studio ==== */
  });
})