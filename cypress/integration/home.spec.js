describe('visit home page', () => {

    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit('http://localhost:3000/');
    })

    it('finds header app name', () => {
        cy.get('.MuiToolbar-root div')
          .first()
          .should('have.text', 'Solo Travel');
    })

    it('displays 11 trip cards by default', () => {
        
        cy.get('.trip-list .trip-card')
          .should('have.length', 11);
    })

    it('search for bariloche and shows one result', () => {
        cy.get('#search-trip-input')
          .type('bariloche')
          .should('have.value', 'bariloche');

        cy.get('#search-btn')
          .click();
        
        cy.get('.trip-list .trip-card')
          .should('have.length', 1);
    })
});