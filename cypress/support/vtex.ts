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

const WORKSPACE = Cypress.env('VTEX_WORKSPACE')

function getURL(workspace: string, path: string) ***REMOVED***
  const url = new URL(`http://biggy.myvtexprod.com$***REMOVED***path***REMOVED***`)

  url.searchParams.set('workspace', workspace)

  return url.toString()
***REMOVED***

function visit(path: string) ***REMOVED***
  cy.visit(getURL(WORKSPACE, path))
***REMOVED***

Cypress.Commands.add('setVtexIdCookie', setVtexIdCookie)
Cypress.Commands.add('visitPath', visit)
