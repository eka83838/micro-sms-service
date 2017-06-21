'use strict'
var dbContants = require('./database')

module.exports = (function () {
  var env = process.env.NODE_ENV || 'development'
  var appConstants = applicationConfig()

  var obj = {
    application: {
      url: appConstants[env]['url'],
      host: appConstants[env]['host'],
      port: appConstants[env]['port']
    },
    database: {
      client: dbContants[env]['client'],
      connection: {
        host: dbContants[env].connection['host'],
        user: dbContants[env].connection['user'],
        password: dbContants[env].connection['password'],
        database: dbContants[env].connection['database']
      }
    },
    server: {
      defaultHost: 'http://localhost:8001'
    }
  }

  if (!obj.application['host']) {
    throw new Error('Missing constant application.host. ' + 'Check your enviroment variables NODE_HOST.')
  } else if (!obj.application['port']) {
    throw new Error('Missing constant application.port. ' + 'Check your enviroment variable NODE_PORT.')
  } else if (!obj.database.connection['host']) {
    throw new Error('Missing constant database.host. ' + 'Check your enviroment variables.')
  } else if (!obj.database.connection['user']) {
    throw new Error('Missing constant database.user. ' + 'Check your enviroment variables.')
  } else if (!obj.database.connection['password']) {
    throw new Error('Missing constant database.password. ' + 'Check your enviroment variables.')
  } else if (!obj.database.connection['database']) {
    throw new Error('Missing constant database.database. ' + 'Check your enviroment variables.')
  }

  return obj

  function applicationConfig () {
    return {
      'production': {
        'url': 'https://' + process.env.NODE_HOST + ':' +
        process.env.NODE_PORT,
        'host': process.env.NODE_HOST,
        'port': process.env.NODE_PORT
      },
      'development': {
        'url': 'http://' + process.env.NODE_HOST + ':' +
        process.env.NODE_PORT,
        'host': process.env.NODE_HOST,
        'port': process.env.NODE_PORT
      },
      'test': {
        'url': 'http://' + process.env.NODE_HOST + ':' +
        process.env.NODE_PORT,
        'host': process.env.NODE_HOST,
        'port': process.env.NODE_PORT
      }
    }
  }
}())
