// / <reference types='cypress' />

import * as CONSTANTS from '../constants'

context('Category page', () => ***REMOVED***
  before(() => ***REMOVED***
    cy.setVtexIdCookie()
    cy.visit('/apparel---accessories/hats')
***REMOVED***)

  it('should render the search-result', () => ***REMOVED***
    cy.get(CONSTANTS.searchResultContainer).should('exist')
    cy.get(CONSTANTS.searchResultLoading).should('not.exist')
    cy.get(CONSTANTS.searchResultGallery).should('exist')
***REMOVED***)

  it('should display the category on the breadcrumb', () => ***REMOVED***
    cy.get(CONSTANTS.breadcrumb).should('exist')
    cy.get(CONSTANTS.breadcrumbLink).eq(2).should('have.text', 'Hats')
***REMOVED***)

  it('should show 2 products', () => ***REMOVED***
    cy.get(CONSTANTS.searchResultItem).should('exist')
    cy.get(CONSTANTS.searchResultItem).should('have.length', 2)
***REMOVED***)

  it('should have one visible subcategory filter', () => ***REMOVED***
    cy.get(CONSTANTS.subcategoryFilter).should('exist')
    cy.get(CONSTANTS.subcategoryFilterItems).should('have.length', 1)
    cy.get(CONSTANTS.subcategoryFilterItems).should('be.visible')
***REMOVED***)

  it('should filter by subcategory', () => ***REMOVED***
    cy.get(CONSTANTS.subcategoryFilterItems).contains('Panama').click()
    cy.url().should('include', 'map=category-1,category-2,category-3')
    cy.get(CONSTANTS.searchResultLoading).should('not.exist')
    cy.get(CONSTANTS.filtersLoading).should('not.exist')
    cy.get(CONSTANTS.searchResultItem).should('have.length', 1)
    cy.get(CONSTANTS.breadcrumbLink).should('have.length', 4)
    cy.get(CONSTANTS.breadcrumbLink).eq(3).should('have.text', 'Panama')
    cy.get(CONSTANTS.searchTitle).should('have.text', 'Panama')
***REMOVED***)
***REMOVED***)
