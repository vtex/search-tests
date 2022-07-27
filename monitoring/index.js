/* eslint-disable no-console */

const path = require('path')
const fs = require('fs').promises

const cypress = require('cypress')
const uuidv4 = require('uuid/v4')
const Promise = require('bluebird')

const { getTestFiles } = require('../utils/specs')
// const monitoring = require('./monitoring')
const s3 = require('./s3')

const BASE_PATH = path.resolve(__dirname, '..', 'cypress', 'integration')
const CONCURRENCY = 1

// const APPLICATION_NAME = 'search'a
// const MODULE_NAME = 'Search App'

const CYPRESS_CONFIG = {
  headed: true,
  headless: false,
  config: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    trashAssetsBeforeRuns: false,
    videoUploadOnPasses: false,
    env: {
      VTEX_WORKSPACE: process.env.VTEX_WORKSPACE || 'master',
    },
    video: true,
  },
  projectId: 'qvjzx1',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true,
  },
}

async function sendResults(result, spec) {
  if (!result || result.message === 'Could not find Cypress test run results') {
    console.error('Could not find Cypress test run results')

    return
  }

  const runId = uuidv4()

  result.runs = await Promise.all(
    result.runs.map(async (run) => {
      try {
        if (run.stats.failures === 0) {
          try {
            await fs.unlink(`cypress/videos/${run.spec.name}.mp4`)
          } catch {
            // ignored
          }

          return run
        }

        console.log(`Uploading video for ${run.spec.name}`)

        const { url: videoUrl } = await s3.uploadFile(
          run.video,
          `${runId}/${run.spec.name}.mp4`,
          'video/mp4'
        )

        return { ...run, video: videoUrl }
      } catch (err) {
        console.error(err)

        return run
      }
    })
  )

  console.log(`Sending result to monitoring for "${spec}"`)
  // await monitoring({
  //   config: {
  //     evidence: {
  //       expirationInSeconds: 7 * 24 * 60 * 60, // 7 days
  //     },
  //     env: 'stable',
  //     applicationName: APPLICATION_NAME,
  //     healthcheck: {
  //       moduleName: MODULE_NAME,
  //       status: result.totalFailed > 0 ? 0 : 1,
  //       title: spec,
  //     },
  //   },
  //   tests: result,
  // })
}

function runCypress(spec) {
  return cypress
    .run({
      spec: `./cypress/integration/${spec}`,
      ...CYPRESS_CONFIG,
    })
    .then((result) => sendResults(result, spec))
    .catch((error) => {
      console.log(error)

      return Promise.resolve()
    })
}

const run = async () => {
  const specs = await getTestFiles(BASE_PATH)

  if (!specs.length) {
    console.log('No spec files were found...')
  }

  console.log(`Found ${specs.length} test(s)`)

  try {
    console.log('Starting tests...')
    Promise.map(specs, runCypress, { concurrency: CONCURRENCY })

    return
  } catch (e) {
    console.log(e)
  }
}

run()
