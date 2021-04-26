const globby = require('globby')

function getTestFiles(dir) {
  const globPattern = `**/*.spec.{js,ts}`

  return globby(globPattern, { onlyFiles: true, cwd: dir })
}

module.exports = { getTestFiles }
