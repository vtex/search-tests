const fs = require('fs')
const homedir = require('os').homedir()
const path = require('path')

const fetch = require('node-fetch')
const args = require('minimist')(process.argv.slice(2))

const ACCOUNT = 'biggy'

const getAuthToken = ({ appkey, apptoken }) => {
  const payload = {
    appkey,
    apptoken,
  }

  return fetch(
    `http://api.vtexcommercestable.com.br/api/vtexid/apptoken/login?an=${ACCOUNT}`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    }
  )
    .then((res) => res.json())
    .then((res) => res.token)
}

;(async () => {
  const token = await getAuthToken({
    appkey: args.appkey,
    apptoken: args.apptoken,
  })

  const tokens = {
    biggy: token,
  }

  const session = {
    account: 'biggy',
    login: 'bot-testa@vtex.com.br',
    token,
  }

  const workspace = {
    currentWorkspace: 'master',
    lastWorkspace: null,
  }

  const sessionDirectory = path.join(homedir, '.vtex', 'session')

  if (!fs.existsSync(sessionDirectory)) {
    fs.mkdirSync(sessionDirectory, { recursive: true })
  }

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
})()
