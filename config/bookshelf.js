// In a file named something like bookshelf.js

var constants = require('./constants')
var knex = require('knex')(constants.database)
var bookshelf = require('bookshelf')(knex)
bookshelf.plugin('registry')
module.exports = bookshelf
