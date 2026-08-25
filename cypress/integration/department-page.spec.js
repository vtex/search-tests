// / <reference types='cypress' />
import * as CONSTANTS from '../constants'

const shouldBeHydrated = ($element) => {
  expect(Object.keys($element[0]).some((key) => key.startsWith('__react'))).to
    .be.true
}

context('Department page', () => {
  before(() => {
    cy.visitPath('/apparel---accessories')
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

  it('should report a non-zero product total', () => {
    cy.get(CONSTANTS.totalProducts).should(($total) => {
      expect(parseInt($total.text(), 10)).to.be.greaterThan(0)
    })
  })

  it('should show up to 10 products per page', () => {
    cy.get(CONSTANTS.searchResultItem).should('exist')
    cy.get(CONSTANTS.searchResultItem).should(($items) => {
      expect($items.length).to.be.within(1, 10)
    })
  })

  it('should show category filters', () => {
    cy.get(CONSTANTS.categoryFilter).should('exist')
    cy.get(CONSTANTS.categoryFilterItems).contains('Roupa').should('be.visible')
  })

  it('should filter by category', () => {
    cy.visitPath('/apparel---accessories')
    cy.get(CONSTANTS.totalProducts)
      .invoke('text')
      .then((initialTotal) => {
        cy.get(CONSTANTS.categoryFilterItems)
          .contains('Roupa')
          .should(shouldBeHydrated)
          .click()
        cy.url().should('include', 'map=category-1,category-2')
        cy.get(CONSTANTS.totalProducts).should(
          'not.have.text',
          initialTotal.trim()
        )
        cy.get(CONSTANTS.searchResultItem).should('exist')
        cy.get(CONSTANTS.breadcrumb).should('contain.text', 'Roupa')
        cy.get(CONSTANTS.searchTitle).should('have.text', 'Roupa')
      })
  })

  it('should filter by price range', () => {
    cy.visitPath('/apparel---accessories/roupa/?map=category-1,category-2')
    cy.get(CONSTANTS.totalProducts)
      .invoke('text')
      .then((initialTotal) => {
        cy.visitPath(
          '/apparel---accessories/roupa/?map=category-1,category-2&priceRange=66 TO 110'
        )
        cy.url().should('include', 'priceRange=66+TO+110')
        cy.get(CONSTANTS.totalProducts).should(
          'not.have.text',
          initialTotal.trim()
        )
        cy.get(CONSTANTS.searchResultItem).should('exist')
      })
  })

  it('should show brand filters', () => {
    cy.get(CONSTANTS.brandFilter).should('exist')
    cy.get(CONSTANTS.brandFilterItems).contains('Mizuno').should('be.visible')
  })

  it('should filter by brand', () => {
    cy.visitPath('/apparel---accessories')
    cy.get(CONSTANTS.totalProducts)
      .invoke('text')
      .then((initialTotal) => {
        cy.get(CONSTANTS.brandFilterItems)
          .contains('Mizuno')
          .should(shouldBeHydrated)
          .click()
        cy.url().should('include', 'map=category-1,brand')
        cy.get(CONSTANTS.totalProducts).should(
          'not.have.text',
          initialTotal.trim()
        )
        cy.get(CONSTANTS.searchResultLoading).should('not.exist')
        cy.get(CONSTANTS.filtersLoading).should('not.exist')
        cy.get(CONSTANTS.searchResultItem).should('exist')
      })
  })
})
