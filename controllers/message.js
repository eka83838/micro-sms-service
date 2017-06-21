'use strict'

var Message = require('../models/message')
var Boom = require('boom')
var Nexmo = require('../helpers/taralite-sms')

var key = process.env.SMS_KEY
var secret = process.env.SMS_SECRET

function MessageController () {}
MessageController.prototype = (function () {
  return {
    findAll: function findAll (requset, reply) {
      Message.forge()
        .fetchAll({debug: true}).then(function (message) {
          if (!message) {
            return reply(Boom.notFound('No data found'))
          }
          message = message.toJSON()
          reply({statusCode: 200, data: message})
        }).catch(function (err) {
          return reply(Boom.badData('Internal postgres error', err))
        })
    },
    findByID: function findByID (request, reply) {
      var id = request.params.id
      Message.forge({id: id}).fetch().then(function (message) {
          if (!message) {
            return reply(Boom.notFound('No data found'))
          }
          reply(message)
        }).catch(function (err) {
          return reply(Boom.badData('Internal postgres error', err))
        })
    },
    insert: function insert (request, reply) {
      var input = request.payload
      var sender = input.sender
      var recipient = input.recipient
      var content = input.content
      if (!content || !sender || !recipient) {
        return reply(Boom.notAcceptable('Maybe you missing some parameters'))
      }
      Nexmo.sendSMS(key, secret, sender, recipient, content, function (sms) {
        if (!sms) {
          return reply(Boom.badData('Nexmo service error', sms))
        }
        var smsJSON = JSON.parse(sms)
        var status = smsJSON['messages'][0].status
        var messageId = smsJSON['messages'][0]['message-id']
        var errorText
        if (!status || status !== 0 || status !== '0') {
          errorText = smsJSON['messages'][0]['error-text']
        }
        var messageData = {
          sender: sender,
          recipient: recipient,
          content: content,
          status: status,
          'err-text': errorText,
          'message-id': messageId
        }
        Message.forge(messageData).save().then(function (message) {
          return reply({statusCode: 200, message: 'Success', data: message, rawDataNexmo: smsJSON})
        }).catch(function (err) {
          return reply(Boom.badData('Internal postgres error', err))
        })
      })
    },
    inbound: function inbound (request, reply) {
      var messageId = request.query.messageId
      if (!request.query.to || !request.query.msisdn) {
        return reply({message: 'not valid inbound'})
      } else {
        Message.forge({'message-id': messageId}).fetch().then(function (foundMessageId) {
          if (!foundMessageId) {
            return reply({message: 'message not found'})
          }
          return foundMessageId.save({status: request.query.status}).then(function (message) {
            return reply({message: 'delivery receipt successfully inserted'})
          })
        })
      }
    }
  }
})()

var messageController = new MessageController()
module.exports = messageController
