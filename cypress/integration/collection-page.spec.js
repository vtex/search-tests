// / <reference types='cypress' />

import * as CONSTANTS from '../constants'

context('Collection page', () => {
  before(() => {
    cy.visitPath('/anime?map=productClusterNames')
  })

  it('should render the search-result', () => {
    cy.get(CONSTANTS.searchResultContainer).should('exist')
    cy.get(CONSTANTS.searchResultLoading).should('not.exist')
    cy.get(CONSTANTS.searchResultGallery).should('exist')
  })

  it('should display the collection name on the page title', () => {
    cy.get(CONSTANTS.searchTitle).should('have.text', 'Anime')
  })

  it('should display the collection name on the breadcrumb', () => {
    cy.get(CONSTANTS.breadcrumb).should('exist')
    cy.get(CONSTANTS.breadcrumbLink).eq(1).should('have.text', 'Anime')
  })

  it('should show 4 products', () => {
    cy.get(CONSTANTS.searchResultItem).should('exist')
    cy.get(CONSTANTS.searchResultItem).should('have.length', 4)
  })

  it('should show filters', () => {
    cy.get(CONSTANTS.filtersWrapper).should('exist')
  })

  it('should filter by department', () => {
    cy.get(CONSTANTS.brandFilter).should('exist')
    cy.get(CONSTANTS.brandFilterItems).should('have.length', 4)
    cy.get(CONSTANTS.brandFilterItems).contains('Sony').click()
    cy.url().should('include', 'map=brand,productClusterNames')
    cy.get(CONSTANTS.searchResultLoading).should('not.exist')
    cy.get(CONSTANTS.searchResultItem).should('have.length', 1)
    cy.get(CONSTANTS.filtersLoading).should('not.exist')
  })
})
