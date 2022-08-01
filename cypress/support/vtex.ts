// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable<Subject> {
    setVtexIdCookie: typeof setVtexIdCookie
    visitPath: typeof visitPath
  }
}

function setVtexIdCookie() {
  const cookieOptions = {
    domain: `.${new URL(Cypress.config().baseUrl as string).hostname}`,
  }

  return cy.setCookie(
    'VtexIdclientAutCookie',
    Cypress.env('authToken'),
    cookieOptions
  )
}

const WORKSPACE = Cypress.env('VTEX_WORKSPACE')

function getURL(workspace: string, path: string) {
  const url = new URL(`http://biggy.myvtexprod.com${path}`)

  url.searchParams.set('workspace', workspace)

  return url.toString()
}

function visitPath(path: string) {
  cy.visit(getURL(WORKSPACE, path))
}

Cypress.Commands.add('setVtexIdCookie', setVtexIdCookie)
Cypress.Commands.add('visitPath', visitPath)
