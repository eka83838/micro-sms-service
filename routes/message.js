'use strict'

var messageController = require('../controllers/message')
var messageValidate = require('../validate/message')

module.exports = (function () {
  return [
    {
      method: 'GET',
      path: '/message',
      config: {
        handler: messageController.findAll
      }
    },
    {
      method: 'GET',
      path: '/message/{id}',
      config: {
        handler: messageController.findByID
      }
    },
    {
      method: 'POST',
      path: '/message',
      config: {
        handler: messageController.insert,
        validate: messageValidate.insert
      }
    },
    {
      method: 'GET',
      path: '/message/callback',
      config: {
        handler: messageController.inbound
      }
    }
  ]
}())
