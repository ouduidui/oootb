/// <reference types="cypress" />

context('Basic', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('home', () => {
    cy.url()
      .should('eq', 'http://localhost:3000/')

    cy.contains('p', 'Todo List')
      .should('exist')
  })
})
