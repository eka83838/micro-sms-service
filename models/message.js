'use strict'

let Bookshelf = require('../config/bookshelf')

var Message = Bookshelf.Model.extend({
  tableName: 'messages',
  hasTimestamps: ['createdAt', 'updatedAt']
})

module.exports = Bookshelf.model('Message', Message)
