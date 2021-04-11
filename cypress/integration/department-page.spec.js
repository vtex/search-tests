// / <reference types='cypress' />

import * as CONSTANTS from '../constants'

context('Department page', () => {
  before(() => {
    cy.setVtexIdCookie()
    cy.visit('/apparel---accessories')
  })

  it('should render the search-result', () => {
    cy.get(CONSTANTS.searchResultContainer).should('exist')
    cy.get(CONSTANTS.searchResultLoading).should('not.exist')
    cy.get(CONSTANTS.searchResultGallery).should('exist')
  })

  it('should display the department on the breadcrumb', () => {
    cy.get(CONSTANTS.breadcrumb).should('exist')
    cy.get(CONSTANTS.breadcrumbLink)
      .eq(1)
      .should('have.text', 'Apparel & Accessories')
  })

  it('should show 10 products', () => {
    cy.get(CONSTANTS.searchResultItem).should('exist')
    cy.get(CONSTANTS.searchResultItem).should('have.length', 10)
  })

  it('should have four visible category filters', () => {
    cy.get(CONSTANTS.categoryFilter).should('exist')
    cy.get(CONSTANTS.categoryFilterItems).should('have.length', 4)
    cy.get(CONSTANTS.categoryFilterItems).should('be.visible')
  })

  it('should filter by category', () => {
    cy.get(CONSTANTS.categoryFilterItems).contains('Roupa').click()
    cy.url().should('include', 'map=category-1,category-2')
    cy.get(CONSTANTS.searchResultItem).should('have.length', 3)
    cy.get(CONSTANTS.breadcrumbLink).should('have.length', 3)
    cy.get(CONSTANTS.breadcrumbLink).eq(2).should('have.text', 'Roupa')
  })
})
