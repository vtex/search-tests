// / <reference types='cypress' />
import * as CONSTANTS from '../constants'

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

  it('should have a total of 14 products', () => {
    cy.get(CONSTANTS.totalProducts).should('contain.text', '14')
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
    cy.get(CONSTANTS.searchTitle).should('have.text', 'Roupa')
  })

  it('should change the price range', () => {
    cy.get(CONSTANTS.priceFilter).should('exist')
    cy.get(CONSTANTS.minPrice).should('have.text', 'R$ 66,00')
    cy.get(CONSTANTS.maxPrice).should('have.text', '–R$ 121,00')
    cy.visitPath(
      '/apparel---accessories/roupa/?map=category-1,category-2&priceRange=66 TO 110'
    )
    cy.get(CONSTANTS.priceFilter).should('exist')
    cy.get(CONSTANTS.minPrice).should('have.text', 'R$ 66,00')
    cy.get(CONSTANTS.maxPrice).should('have.text', '–R$ 110,00')
    cy.get(CONSTANTS.searchResultItem).should('have.length', 2)
  })

  it('should have two visible brand filters', () => {
    cy.get(CONSTANTS.brandFilter).should('exist')
    cy.get(CONSTANTS.brandFilterItems).should('have.length', 2)
    cy.get(CONSTANTS.brandFilterItems).should('be.visible')
  })

  it('should filter by brand', () => {
    cy.get(CONSTANTS.brandFilterItems).contains('Mizuno').click()
    cy.url().should('include', 'map=category-1,category-2,brand')
    cy.get(CONSTANTS.searchResultLoading).should('not.exist')
    cy.get(CONSTANTS.filtersLoading).should('not.exist')
    cy.get(CONSTANTS.searchResultItem).should('have.length', 1)
    cy.get(CONSTANTS.breadcrumbLink).should('have.length', 4)
    cy.get(CONSTANTS.breadcrumbLink).eq(3).should('have.text', 'Mizuno')
    cy.get(CONSTANTS.searchTitle).should('have.text', 'Roupa')
  })
})
