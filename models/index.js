var path = require('path')
var fs = require('fs')
var _ = require('lodash')

fs.readdirSync(__dirname).forEach(function (file) {
  /* If its the current file ignore it */
  if (file === 'index.js') return

  /* Prepare empty object to store module */
  var mod = {}

  /* Store module with its name (from filename) */
  mod[path.basename(file)] = require(path.join(__dirname, file))

  /* Extend module.exports (in this case - lodash.js, can be any other) */
  _.assign(module.exports, mod)
})
