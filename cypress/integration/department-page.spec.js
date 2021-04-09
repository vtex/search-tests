// / <reference types='cypress' />

import * as CONSTANTS from '../constants'

context('Department page', () => ***REMOVED***
  before(() => ***REMOVED***
    cy.setVtexIdCookie()
    cy.visit('/apparel---accessories')
***REMOVED***)

  it('should show 10 products', () => ***REMOVED***
    cy.get(CONSTANTS.searchResultItem).should('exist')
    cy.get(CONSTANTS.searchResultItem).should('have.length', 10)
***REMOVED***)

  it('should display the department on the breadcrumb', () => ***REMOVED***
    cy.get(CONSTANTS.breadcrumb).should('exist')
    cy.get(CONSTANTS.breadcrumbLink)
      .eq(1)
      .should('have.text', 'Apparel & Accessories')
***REMOVED***)

  it('should have four category filters', () => ***REMOVED***
    cy.get(CONSTANTS.categoryFilter).should('exist')
    cy.get(CONSTANTS.categoryFilterItems).should('have.length', 4)
***REMOVED***)

  it('should filter by category', () => ***REMOVED***
    cy.get(CONSTANTS.categoryFilterItems).contains('Roupa').click()
    cy.url().should('include', 'map=category-1,category-2')
    cy.get(CONSTANTS.searchResultItem).should('have.length', 3)
    cy.get(CONSTANTS.breadcrumbLink).should('have.length', 3)
    cy.get(CONSTANTS.breadcrumbLink).eq(2).should('have.text', 'Roupa')
***REMOVED***)
***REMOVED***)
