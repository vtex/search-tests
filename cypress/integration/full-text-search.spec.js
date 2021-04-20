// / <reference types='cypress' />
import * as CONSTANTS from '../constants'

context('Full text search', () => ***REMOVED***
  before(() => ***REMOVED***
    cy.visitPath('/camisa?map=ft')
***REMOVED***)

  it('should render the search-result', () => ***REMOVED***
    cy.get(CONSTANTS.searchResultContainer).should('exist')
    cy.get(CONSTANTS.searchResultLoading).should('not.exist')
    cy.get(CONSTANTS.searchResultGallery).should('exist')
***REMOVED***)

  it('should show filters', () => ***REMOVED***
    cy.get(CONSTANTS.filtersWrapper).should('exist')
***REMOVED***)

  it('should display the search term on the breadcrumb', () => ***REMOVED***
    cy.get(CONSTANTS.breadcrumb).should('exist')
    cy.get(CONSTANTS.breadcrumbLink).eq(1).should('have.text', 'camisa')
***REMOVED***)

  it('should show 3 products', () => ***REMOVED***
    cy.get(CONSTANTS.searchResultItem).should('exist')
    cy.get(CONSTANTS.searchResultItem).should('have.length', 3)
***REMOVED***)
***REMOVED***)
