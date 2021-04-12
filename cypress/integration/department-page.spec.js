// / <reference types='cypress' />

import * as CONSTANTS from '../constants'

context('Department page', () => ***REMOVED***
  before(() => ***REMOVED***
    cy.setVtexIdCookie()
    cy.visit('/apparel---accessories')
***REMOVED***)

  it('should render the search-result', () => ***REMOVED***
    cy.get(CONSTANTS.searchResultContainer).should('exist')
    cy.get(CONSTANTS.searchResultLoading).should('not.exist')
    cy.get(CONSTANTS.searchResultGallery).should('exist')
***REMOVED***)

  it('should display the department on the breadcrumb', () => ***REMOVED***
    cy.get(CONSTANTS.breadcrumb).should('exist')
    cy.get(CONSTANTS.breadcrumbLink)
      .eq(1)
      .should('have.text', 'Apparel & Accessories')
***REMOVED***)

  it('should show 10 products', () => ***REMOVED***
    cy.get(CONSTANTS.searchResultItem).should('exist')
    cy.get(CONSTANTS.searchResultItem).should('have.length', 10)
***REMOVED***)

  it('should have four visible category filters', () => ***REMOVED***
    cy.get(CONSTANTS.categoryFilter).should('exist')
    cy.get(CONSTANTS.categoryFilterItems).should('have.length', 4)
    cy.get(CONSTANTS.categoryFilterItems).should('be.visible')
***REMOVED***)

  it('should filter by category', () => ***REMOVED***
    cy.get(CONSTANTS.categoryFilterItems).contains('Roupa').click()
    cy.url().should('include', 'map=category-1,category-2')
    cy.get(CONSTANTS.searchResultItem).should('have.length', 3)
    cy.get(CONSTANTS.breadcrumbLink).should('have.length', 3)
    cy.get(CONSTANTS.breadcrumbLink).eq(2).should('have.text', 'Roupa')
    cy.get(CONSTANTS.searchTitle).should('have.text', 'Roupa')
***REMOVED***)

  it('should have three visible brand filters', () => ***REMOVED***
    cy.get(CONSTANTS.brandFilter).should('exist')
    cy.get(CONSTANTS.brandFilterItems).should('have.length', 3)
    cy.get(CONSTANTS.brandFilterItems).should('be.visible')
***REMOVED***)

  it('should filter by brand', () => ***REMOVED***
    cy.get(CONSTANTS.brandFilterItems).contains('Mizuno').click()
    cy.url().should('include', 'map=category-1,category-2,brand')
    cy.get(CONSTANTS.searchResultItem).should('have.length', 1)
    cy.get(CONSTANTS.breadcrumbLink).should('have.length', 4)
    cy.get(CONSTANTS.breadcrumbLink).eq(3).should('have.text', 'Mizuno')
    cy.get(CONSTANTS.searchTitle).should('have.text', 'Mizuno')
***REMOVED***)
***REMOVED***)
