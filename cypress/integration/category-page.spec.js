// / <reference types='cypress' />

import * as CONSTANTS from '../constants'

context('Category page', () => {
  before(() => {
    cy.setVtexIdCookie()
    cy.visit('/apparel---accessories/hats')
  })

  it('should render the search-result', () => {
    cy.get(CONSTANTS.searchResultContainer).should('exist')
    cy.get(CONSTANTS.searchResultLoading).should('not.exist')
    cy.get(CONSTANTS.searchResultGallery).should('exist')
  })

  it('should display the category on the breadcrumb', () => {
    cy.get(CONSTANTS.breadcrumb).should('exist')
    cy.get(CONSTANTS.breadcrumbLink).eq(2).should('have.text', 'Hats')
  })

  it('should show 2 products', () => {
    cy.get(CONSTANTS.searchResultItem).should('exist')
    cy.get(CONSTANTS.searchResultItem).should('have.length', 2)
  })

  it('should have one visible subcategory filter', () => {
    cy.get(CONSTANTS.subcategoryFilter).should('exist')
    cy.get(CONSTANTS.subcategoryFilterItems).should('have.length', 1)
    cy.get(CONSTANTS.subcategoryFilterItems).should('be.visible')
  })

  it('should filter by subcategory', () => {
    cy.get(CONSTANTS.subcategoryFilterItems).contains('Panama').click()
    cy.url().should('include', 'map=category-1,category-2,category-3')
    cy.get(CONSTANTS.searchResultLoading).should('not.exist')
    cy.get(CONSTANTS.filtersLoading).should('not.exist')
    cy.get(CONSTANTS.searchResultItem).should('have.length', 1)
    cy.get(CONSTANTS.breadcrumbLink).should('have.length', 4)
    cy.get(CONSTANTS.breadcrumbLink).eq(3).should('have.text', 'Panama')
    cy.get(CONSTANTS.searchTitle).should('have.text', 'Panama')
  })
})
