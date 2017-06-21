
require('dotenv').config();

var server = require('../')
var should = require('chai').should();

describe('Base API', function() {
  it('should return status code 200 and body "OK"', function(done){
    var options = {
      method: "GET",
      url: "/"
    }
    server.inject(options, function (res) {
      res.statusCode.should.be.eql(200)
      res.payload.should.be.equal('OK')
      done()
    })
  })
})
