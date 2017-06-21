require('dotenv').config()
var server = require('../')
var should = require('chai').should()
var Message = require('../models/message')

describe('Message API', function () {
  var message = new Message()
  var messageData = {
    'content': 'Test SMS',
    'sender': 'Nexmo',
    'recipient': '+6282113539787'
  }

  describe('#set #save', function () {
    it('should inserting message history', function (done) {
      message.set(messageData)
      message.save()
      .then(function (model) {
        model.get('content').should.equal(messageData.content)
        model.get('sender').should.equal(messageData.sender)
        model.get('recipient').should.equal(messageData.recipient)
        done()
      }).catch(function (error) {
        done(error)
      })
    })
  })

  describe('Get all messages', function () {
    it('should return all messages', function (done) {
      var options = {
        method: "GET",
        url: "/message"
      }
      server.inject(options, function (res) {
        res.statusCode.should.be.eql(200)
        var message = JSON.parse(res.payload)
        message.should.have.property('data')
        message.data.should.to.be.a('array')
        done()
      })
    })
  })
})
