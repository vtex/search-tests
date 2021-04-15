# Search Tests

App responsible for all end-to-end tests on Search.

We use [Cypress](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell) to run end-to-end tests.

If you want to run Cypress locally, use the following scripts:

- `yarn e2e:open` - opens Cypress in the interactive GUI
- `yarn e2e:run` - runs Cypress tests from the CLI without the GUI

If you want to run remotely on a stable store, use VTEX toolbelt command:

```console
$ vtex test e2e
```

To provide your local user *token*, pass the `--token` command-line argument to the *test* command:
```console
$ vtex test e2e --token
```
