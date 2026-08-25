Cypress.on('uncaught:exception', (err, _runnable) => {
  // we expect a 3rd party library error with message 'Failed to register a ServiceWorker for scope'
  // and don't want to fail the test so we return false
  if (err.message.includes('Failed to register a ServiceWorker for scope')) {
    return false
  }

  // Biggy storefront HTML injects a recsys snippet whose API key is interpolated
  // away, leaving an unterminated string and this SyntaxError. Cypress 8 fails
  // cy.visit on any uncaught app exception; ignore only this known storefront bug.
  if (
    err.name === 'SyntaxError' &&
    err.message.includes('Unexpected identifier')
  ) {
    return false
  }

  // we still want to ensure there are no other unexpected
  // errors, so we let them fail the test
})
