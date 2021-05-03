const globby = require('globby')

function getTestFiles(dir) ***REMOVED***
  const globPattern = `**/*.spec.***REMOVED***js,ts***REMOVED***`

  return globby(globPattern, ***REMOVED*** onlyFiles: true, cwd: dir ***REMOVED***)
***REMOVED***

module.exports = ***REMOVED*** getTestFiles ***REMOVED***
