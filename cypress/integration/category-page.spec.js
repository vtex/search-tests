// / <reference types='cypress' />

import * as CONSTANTS from '../constants'

context('Category page', () => {
  before(() => {
    cy.visitPath('/apparel---accessories/hats')
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

  it('should display the category title', () => {
    cy.get(CONSTANTS.searchTitle).should('have.text', 'Hats')
  })

  it('should show products', () => {
    cy.get(CONSTANTS.searchResultItem).should('exist')
    cy.get(CONSTANTS.totalProducts).should(($total) => {
      expect(parseInt($total.text(), 10)).to.be.greaterThan(0)
    })
  })

  it('should show filters', () => {
    cy.get(CONSTANTS.filtersWrapper).should('exist')
  })
})
