context('Basic', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('home', () => {
    cy.url()
      .should('eq', 'http://localhost:3000/')

    cy.contains('p', 'Home')
      .should('exist')
    cy.contains('p', 'About')
      .should('exist')

    cy.contains('p', 'Count: 0')
    cy.get('button[btn]')
      .click()
    cy.contains('p', 'Count: 1')
  })

  it('nav', () => {
    cy.contains('p', 'About')
      .click()
      .url()
      .should('eq', 'http://localhost:3000/about')
  })
})
