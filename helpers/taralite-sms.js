'use strict'

var https = require('https')

var host = 'rest.nexmo.com'
var path = '/sms/json'
var port = 443
var webhookUrl = process.env.WEBHOOK_URL + '/message/callback'

var ERROR_MESSAGES = {
  sender: 'invalid sender',
  recipient: 'invalid recipient',
  msg: 'invalid message text'
}

exports.sendSMS = function (key, secret, sender, recipient, message, cb) {
  if (!message) {
    sendError(cb, new Error(ERROR_MESSAGES.msg))
  } else {
    var data = JSON.stringify({
      api_key: key,
      api_secret: secret,
      to: recipient,
      from: sender,
      text: message,
      'status-report-req': 1,
      callback: webhookUrl
    })
    var options = {
      host: host,
      path: path,
      port: port,
      method: 'POST',
      headers: {
        'Content-Type': 'application/jsonrequest',
        'Content-Length': data.length
      }
    }
    var req = https.request(options)
    req.write(data)
    req.end()

    var responseData = ''
    req.on('response', function (res) {
      res.on('data', function (chunk) {
        responseData += chunk
      })
      res.on('end', function () {
        cb(responseData)
      })
    })
  }
}

function sendError (callback, err, data) {
  if (callback) {
    callback(err, data)
  } else {
    throw err
  }
}
