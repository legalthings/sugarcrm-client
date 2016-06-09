"use strict";

var should = require('should');

var SugarClient = require('../lib/index.js');


describe('SugerCRMClient', function() {
  describe('configInfo()', function() {
    it('without any argument', function(done) {
      var sugar = new SugarClient({
        apiURL:  "test1",
        login:   "test2",
        passwd:  "test3"
      });
      sugar.configInfo()
      var result = sugar.configInfo();
      result.should.eql({apiURL:"test1",login:"test2",passwd:"test3"});
      done();
    });
  });
});
