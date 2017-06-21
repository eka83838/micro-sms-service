'use strict'

require('dotenv').config()
var Hapi = require('hapi')
var constants = require('./config/constants.js')
var routes = require('./routes')

var host = constants.application['host']
var port = constants.application['port']
const server = new Hapi.Server()

server.connection({
  port: port,
  host: host
})

server.register([
  require('vision'),
  require('inert'),
  { register: require('lout') }],
  function (err) {
    if (err) {
      console.log('error')
    }
  })

const options = {
  ops: {
    interval: 1000
  },
  includes: {
    request: ['headers', 'payload']
  },
  responseEvent: 'response',
  reporters: {
    console: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{ log: '*', response: '*', request: '*' }]
    }, {
      module: 'good-console'
    }, 'stdout'],
    file: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{ logs: '*', response: '*', request: '*' }]
    }, {
      module: 'good-squeeze',
      name: 'SafeJson'
    }, {
      module: 'good-file',
      args: ['./logs/site_log']
    }]
  }
}

// Add all the routes within the routes folder
for (var route in routes) {
  server.route(routes[route])
}

module.exports = server

if (process.env.NODE_ENV !== 'test') {
  server.register({
    register: require('good'),
    options: options
  }, (err) => {
    if (err) {
      console.error(err)
    } else {
      server.start(() => {
        console.info('Server started at ' + server.info.uri)
      })
    }
  })
}
