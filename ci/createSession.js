const fs = require('fs')
const homedir = require('os').homedir()
const path = require('path')

const fetch = require('node-fetch')
const args = require('minimist')(process.argv.slice(2))

const ACCOUNT = 'biggy'

const getAuthToken = (***REMOVED*** appkey, apptoken ***REMOVED***) => ***REMOVED***
  const payload = ***REMOVED***
    appkey,
    apptoken,
***REMOVED***

  return fetch(
    `http://api.vtexcommercestable.com.br/api/vtexid/apptoken/login?an=$***REMOVED***ACCOUNT***REMOVED***`,
    ***REMOVED***
      method: 'POST',
      body: JSON.stringify(payload),
      headers: ***REMOVED*** 'Content-Type': 'application/json' ***REMOVED***,
  ***REMOVED***
  )
    .then((res) => res.json())
    .then((res) => res.token)
***REMOVED***

;(async () => ***REMOVED***
  const token = await getAuthToken(***REMOVED***
    appkey: args.appkey,
    apptoken: args.apptoken,
***REMOVED***)

  const tokens = ***REMOVED***
    biggy: token,
***REMOVED***

  const session = ***REMOVED***
    account: 'biggy',
    login: 'bot-testa@vtex.com.br',
    token,
***REMOVED***

  const workspace = ***REMOVED***
    currentWorkspace: 'master',
    lastWorkspace: null,
***REMOVED***

  const sessionDirectory = path.join(homedir, '.vtex', 'session')

  if (!fs.existsSync(sessionDirectory)) ***REMOVED***
    fs.mkdirSync(sessionDirectory)
***REMOVED***

  fs.writeFileSync(
    path.join(sessionDirectory, 'tokens.json'),
    JSON.stringify(tokens)
  )
  fs.writeFileSync(
    path.join(sessionDirectory, 'session.json'),
    JSON.stringify(session)
  )
  fs.writeFileSync(
    path.join(sessionDirectory, 'workspace.json'),
    JSON.stringify(workspace)
  )
***REMOVED***)()
