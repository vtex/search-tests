// / <reference types='cypress' />

import * as CONSTANTS from '../constants'

context('Autocomplete', () => ***REMOVED***
  before(() => ***REMOVED***
    cy.visitPath('/')
***REMOVED***)

  it('should render the search bar and the autocomplete should be hidden', () => ***REMOVED***
    cy.get(CONSTANTS.hiddenAutocomplete).should('exist')
    cy.get(CONSTANTS.autocomplete).should('exist')
    cy.get(CONSTANTS.searchBarContainer).should('exist')
    cy.get(CONSTANTS.searchBarContainer).should('be.visible')
***REMOVED***)

  it('should open the autocomplete', () => ***REMOVED***
    cy.get(CONSTANTS.searchBarContainer).click()
    cy.get(CONSTANTS.hiddenAutocomplete).should('not.exist')
    cy.get(CONSTANTS.autocomplete).should('exist')
***REMOVED***)
***REMOVED***)
