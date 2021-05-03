/* eslint-disable no-console */

const path = require('path')
const fs = require('fs').promises

const cypress = require('cypress')
const uuidv4 = require('uuid/v4')
const Promise = require('bluebird')

const ***REMOVED*** getTestFiles ***REMOVED*** = require('../utils/specs')
const monitoring = require('./monitoring')
const s3 = require('./s3')

const BASE_PATH = path.resolve(__dirname, '..', 'cypress', 'integration')
const CONCURRENCY = 1

const APPLICATION_NAME = 'search'
const MODULE_NAME = 'Search App'

const CYPRESS_CONFIG = ***REMOVED***
  headed: true,
  headless: false,
  config: ***REMOVED***
    viewportWidth: 1920,
    viewportHeight: 1080,
    trashAssetsBeforeRuns: false,
    videoUploadOnPasses: false,
    env: ***REMOVED***
      VTEX_WORKSPACE: process.env.VTEX_WORKSPACE || 'master',
  ***REMOVED***
    video: true,
***REMOVED***
  projectId: 'qvjzx1',
  reporterOptions: ***REMOVED***
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true,
***REMOVED***
***REMOVED***

async function sendResults(result, spec) ***REMOVED***
  if (!result || result.message === 'Could not find Cypress test run results') ***REMOVED***
    console.error('Could not find Cypress test run results')

    return
***REMOVED***

  const runId = uuidv4()

  result.runs = await Promise.all(
    result.runs.map(async (run) => ***REMOVED***
      try ***REMOVED***
        if (run.stats.failures === 0) ***REMOVED***
          try ***REMOVED***
            await fs.unlink(`cypress/videos/$***REMOVED***run.spec.name***REMOVED***.mp4`)
        ***REMOVED*** catch ***REMOVED***
            // ignored
        ***REMOVED***

          return run
      ***REMOVED***

        console.log(`Uploading video for $***REMOVED***run.spec.name***REMOVED***`)

        const ***REMOVED*** url: videoUrl ***REMOVED*** = await s3.uploadFile(
          run.video,
          `$***REMOVED***runId***REMOVED***/$***REMOVED***run.spec.name***REMOVED***.mp4`,
          'video/mp4'
        )

        return ***REMOVED*** ...run, video: videoUrl ***REMOVED***
    ***REMOVED*** catch (err) ***REMOVED***
        console.error(err)

        return run
    ***REMOVED***
  ***REMOVED***)
  )

  console.log(`Sending result to monitoring for "$***REMOVED***spec***REMOVED***"`)
  await monitoring(***REMOVED***
    config: ***REMOVED***
      evidence: ***REMOVED***
        expirationInSeconds: 7 * 24 * 60 * 60, // 7 days
    ***REMOVED***
      env: 'stable',
      applicationName: APPLICATION_NAME,
      healthcheck: ***REMOVED***
        moduleName: MODULE_NAME,
        status: result.totalFailed > 0 ? 0 : 1,
        title: spec,
    ***REMOVED***
  ***REMOVED***
    tests: result,
***REMOVED***)
***REMOVED***

function runCypress(spec) ***REMOVED***
  return cypress
    .run(***REMOVED***
      spec: `./cypress/integration/$***REMOVED***spec***REMOVED***`,
      ...CYPRESS_CONFIG,
  ***REMOVED***)
    .then((result) => sendResults(result, spec))
    .catch((error) => ***REMOVED***
      console.log(error)

      return Promise.resolve()
  ***REMOVED***)
***REMOVED***

const run = async () => ***REMOVED***
  const specs = await getTestFiles(BASE_PATH)

  if (!specs.length) ***REMOVED***
    console.log('No spec files were found...')
***REMOVED***

  console.log(`Found $***REMOVED***specs.length***REMOVED*** test(s)`)

  try ***REMOVED***
    console.log('Starting tests...')
    Promise.map(specs, runCypress, ***REMOVED*** concurrency: CONCURRENCY ***REMOVED***)

    return
***REMOVED*** catch (e) ***REMOVED***
    console.log(e)
***REMOVED***
***REMOVED***

run()
