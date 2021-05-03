# Search Tests

App responsible for all end-to-end tests on Search.

We use [Cypress](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell) to run end-to-end tests.

If you want to run Cypress locally, use the following scripts:

- `yarn e2e:open` - opens Cypress in the interactive GUI
- `yarn e2e:run` - runs Cypress tests from the CLI without the GUI

Remember that you must use a workspace in the `biggy` account. It is our test account and some of the tests use specific products and filters of this account.
