// / <reference types='cypress' />

import * as CONSTANTS from '../constants'

context('Autocomplete', () => ***REMOVED***
  before(() => ***REMOVED***
    cy.setVtexIdCookie()
    cy.visit('/')
***REMOVED***)

  it('should open the autocomplete', () => ***REMOVED***
    cy.get(CONSTANTS.hiddenAutocomplete).should('exist')
    cy.get(CONSTANTS.autocomplete).should('exist')
    cy.get(CONSTANTS.searchBarContainer).click()
    cy.get(CONSTANTS.hiddenAutocomplete).should('not.exist')
    cy.get(CONSTANTS.autocomplete).should('exist')
***REMOVED***)
***REMOVED***)
