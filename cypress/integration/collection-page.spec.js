// / <reference types='cypress' />

import * as CONSTANTS from '../constants'

const shouldBeHydrated = ($element) => {
  expect(Object.keys($element[0]).some((key) => key.startsWith('__react'))).to
    .be.true
}

context('Collection page', () => {
  before(() => {
    cy.visitPath('/anime?map=productClusterNames')
  })

  it('should render the search result', () => {
    cy.get(CONSTANTS.searchResultContainer).should('exist')
    cy.get(CONSTANTS.searchResultGallery).should('exist')
  })

  it('should preserve the collection search context', () => {
    cy.url().should('include', 'map=productClusterNames')
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

  it('should show category facets', () => {
    cy.get(CONSTANTS.categoryFilter).should('exist')
    cy.get(CONSTANTS.categoryFilterItems).should('have.length.greaterThan', 0)
  })

  it('should filter by brand', () => {
    cy.visitPath('/anime?map=productClusterNames')
    cy.get(CONSTANTS.brandFilter).should('exist')
    cy.get(CONSTANTS.brandFilterItems).contains('Sony').should('be.visible')
    cy.get(CONSTANTS.totalProducts)
      .invoke('text')
      .then((initialTotal) => {
        cy.get(CONSTANTS.brandFilterItems)
          .contains('Sony')
          .should(shouldBeHydrated)
          .click()
        cy.url().should('include', 'map=brand')
        cy.get(CONSTANTS.totalProducts).should(
          'not.have.text',
          initialTotal.trim()
        )
        cy.get(CONSTANTS.searchResultLoading).should('not.exist')
        cy.get(CONSTANTS.searchResultItem).should('exist')
        cy.get(CONSTANTS.filtersLoading).should('not.exist')
      })
  })
})
