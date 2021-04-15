// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress ***REMOVED***
  interface Chainable<Subject> ***REMOVED***
    setVtexIdCookie: typeof setVtexIdCookie
***REMOVED***
***REMOVED***

function setVtexIdCookie() ***REMOVED***
  const cookieOptions = ***REMOVED***
    domain: `.$***REMOVED***new URL(Cypress.config().baseUrl as string).hostname***REMOVED***`,
***REMOVED***

  return cy.setCookie(
    'VtexIdclientAutCookie',
    Cypress.env('authToken'),
    cookieOptions
  )
***REMOVED***

Cypress.Commands.add('setVtexIdCookie', setVtexIdCookie)
