/* eslint-disable no-console */

require('node-window-polyfill').register()

const fs = require('fs')

const pug = require('pug')
const http = require('axios')

const templateUrl = `$***REMOVED***__dirname***REMOVED***/templates/evidence.pug`
const compile = pug.compileFile(templateUrl)

const pad = (v, len = 2) => v.toString().padStart(len, 0)

function msToTime(s) ***REMOVED***
  s = parseInt(s, 10)
  const ms = s % 1000

  s = (s - ms) / 1000
  const secs = s % 60

  s = (s - secs) / 60
  const mins = s % 60
  const hrs = (s - mins) / 60

  return `$***REMOVED***pad(hrs)***REMOVED***:$***REMOVED***pad(mins)***REMOVED***:$***REMOVED***pad(secs)***REMOVED***.$***REMOVED***pad(ms, 3)***REMOVED***`
***REMOVED***

function format(date) ***REMOVED***
  const d = new Date(date)
  const hour = pad(d.getHours(), 2)
  const minute = pad(d.getMinutes(), 2)
  const second = pad(d.getSeconds(), 2)
  const day = pad(d.getDate(), 2)
  const month = pad(d.getMonth() + 1, 2)
  const year = pad(d.getFullYear(), 4)

  return `$***REMOVED***hour***REMOVED***:$***REMOVED***minute***REMOVED***:$***REMOVED***second***REMOVED*** $***REMOVED***day***REMOVED***/$***REMOVED***month***REMOVED***/$***REMOVED***year***REMOVED***`
***REMOVED***

const main = async (data) => ***REMOVED***
  if (!data || !data.tests || !data.config) ***REMOVED***
    return false
***REMOVED***

  const testsData = data.tests
  const ***REMOVED*** config ***REMOVED*** = data

  const ***REMOVED*** applicationName ***REMOVED*** = config
  const healthcheckConfig = config.healthcheck
  const evidenceConfig = config.evidence

  const healthcheckUrl =
    'https://5gkb7l6p2k.execute-api.us-east-1.amazonaws.com/default/HorusProxy'

  // Build message
  const message = compile(***REMOVED***
    startedTestsAt: format(testsData.startedTestsAt),
    endedTestsAt: format(testsData.endedTestsAt),
    totalDuration: testsData.totalDuration,
    totalTests: testsData.totalTests,
    totalFailed: testsData.totalFailed,
    totalPassed: testsData.totalPassed,
    totalPending: testsData.totalPending,
    totalSkipped: testsData.totalSkipped,
    runs: testsData.runs,
***REMOVED***)

  // Dev
  if (process.env.DEV || !process.env.HORUS_PROXY_KEY) ***REMOVED***
    fs.writeFileSync('./output.html', message)
***REMOVED***

  // Send to Healthcheck
  const healthcheckData = ***REMOVED***
    env: config.env,
    evidence: ***REMOVED***
      applicationName,
      expirationInSeconds: evidenceConfig.expirationInSeconds,
      message,
  ***REMOVED***
    healthcheck: ***REMOVED***
      Status: healthcheckConfig.status,
      Title: healthcheckConfig.title,
      Etime: msToTime(testsData.totalDuration),
      Module: healthcheckConfig.moduleName,
  ***REMOVED***
***REMOVED***

  if (!process.env.HORUS_PROXY_KEY) return

  try ***REMOVED***
    const ***REMOVED*** data: hcResponseData, status ***REMOVED*** = await http.post(
      healthcheckUrl,
      healthcheckData,
      ***REMOVED***
        headers: ***REMOVED***
          'Content-Type': 'application/json',
          'x-api-key': process.env.HORUS_PROXY_KEY,
      ***REMOVED***
    ***REMOVED***
    )

    console.log(***REMOVED*** hcResponseData, status ***REMOVED***)
***REMOVED*** catch (error) ***REMOVED***
    console.log(***REMOVED*** error ***REMOVED***)
    console.log(error.response)
***REMOVED***
***REMOVED***

module.exports = main
