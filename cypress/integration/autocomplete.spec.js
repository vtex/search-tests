// / <reference types='cypress' />

import * as CONSTANTS from '../constants'

context('Autocomplete', () => {
  before(() => {
    cy.visitPath('/')
  })

  it('should render the search bar and the autocomplete should be hidden', () => {
    cy.get(CONSTANTS.hiddenAutocomplete).should('exist')
    cy.get(CONSTANTS.autocomplete).should('exist')
    cy.get(CONSTANTS.searchBarContainer).should('exist')
    cy.get(CONSTANTS.searchBarContainer).should('be.visible')
  })

  it('should open the autocomplete', () => {
    cy.get(CONSTANTS.searchBarContainer).click()
    cy.get(CONSTANTS.hiddenAutocomplete).should('not.exist')
    cy.get(CONSTANTS.autocomplete).should('exist')
  })

  it('should show the top searches', () => {
    cy.get(CONSTANTS.topSearches).should('exist')
  })

  it('should display search and product suggestions when typing a term', () => {
    cy.get(CONSTANTS.topSearches).should('exist')
    cy.get(CONSTANTS.searchBarContainer).type('camisa')
    cy.get(CONSTANTS.searchSuggestions)
    cy.get(CONSTANTS.productSuggestions).should('have.length', 3)
  })

  it('should redirect to search page when clicking to see all products', () => {
    cy.get(CONSTANTS.seeAllProducts).should('exist')
    cy.get(CONSTANTS.seeAllProducts).click()
    cy.url().should('include', 'map=ft')
    cy.get(CONSTANTS.searchResultContainer).should('exist')
  })
})
