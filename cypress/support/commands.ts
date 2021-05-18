Cypress.on('uncaught:exception', (err, _runnable) => {
  // we expect a 3rd party library error with message 'Failed to register a ServiceWorker for scope'
  // and don't want to fail the test so we return false
  if (err.message.includes('Failed to register a ServiceWorker for scope')) {
    return false
  }
  // we still want to ensure there are no other unexpected
  // errors, so we let them fail the test
})
