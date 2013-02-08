'use strict';

var Runner = require('trap').core.Runner;
var chai = require('chai');
var getMessage = require('chai/lib/chai/utils/getMessage.js')

var assert = chai.Assertion.prototype.assert;

module.exports.init = function () {
  chai.Assertion.prototype.assert = function (expr, msg, negateMsg, expected, _actual, showDiff) {
    var node = Runner.current && Runner.current.currentTest;

    if (node && !node.chaiPassThru)
      try {
        assert.apply(this, arguments);
        node.assertOk(getMessage(this, arguments));
      } catch (err) {
        if(err instanceof chai.AssertionError)
          var info = { diff: { actual: _actual, expected: expected } };

        node.assertNotOk(err, info);
      }
    else
      assert.apply(this, arguments);
  };
};