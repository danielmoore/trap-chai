'use strict';

require('..').init();

var chai = require('chai');

module.exports.createTextContext = function (node) {
  return {
    err: function (fn, msg) {
      try {
        node.chaiPassThru = true;
        try {
          fn();
        } finally {
          node.chaiPassThru = false;
        }
        node.assertNotOk(new chai.AssertionError({ message: 'Expected an error' }));
      } catch (err) {
        if ('string' === typeof msg) {
          chai.expect(err.message).to.equal(msg);
        } else {
          chai.expect(err.message).to.match(msg);
        }
      }
    }
  };
};