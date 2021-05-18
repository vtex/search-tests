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
})
