'use strict';

var test = require('trap').test;
var chai = require('chai');
var expect = chai.expect;

test('test', function(t){
  t.test('true', function(t) {
    // See GH-45: some poorly-constructed custom errors don't have useful names
    // on either their constructor or their constructor prototype, but instead
    // only set the name inside the constructor itself.
    var PoorlyConstructedError = function () {
      this.name = 'PoorlyConstructedError';
    };
    PoorlyConstructedError.prototype = Object.create(Error.prototype);

    var specificError = new RangeError('boo');

    var goodFn = function () { 1==1; }
      , badFn = function () { throw new Error('testing'); }
      , refErrFn = function () { throw new ReferenceError('hello'); }
      , ickyErrFn = function () { throw new PoorlyConstructedError(); }
      , specificErrFn = function () { throw specificError; };

    expect(goodFn).to.not.throw();
    expect(goodFn).to.not.throw(Error);
    expect(goodFn).to.not.throw(specificError);
    expect(badFn).to.throw();
    expect(badFn).to.throw(Error);
    expect(badFn).to.not.throw(ReferenceError);
    expect(badFn).to.not.throw(specificError);
    expect(refErrFn).to.throw();
    expect(refErrFn).to.throw(ReferenceError);
    expect(refErrFn).to.throw(Error);
    expect(refErrFn).to.not.throw(TypeError);
    expect(refErrFn).to.not.throw(specificError);
    expect(ickyErrFn).to.throw();
    expect(ickyErrFn).to.throw(PoorlyConstructedError);
    expect(ickyErrFn).to.throw(Error);
    expect(ickyErrFn).to.not.throw(specificError);
    expect(specificErrFn).to.throw(specificError);

    expect(badFn).to.throw(/testing/);
    expect(badFn).to.not.throw(/hello/);
    expect(badFn).to.throw('testing');
    expect(badFn).to.not.throw('hello');

    expect(badFn).to.throw(Error, /testing/);
    expect(badFn).to.throw(Error, 'testing');

    t.err(function(){
      expect(goodFn).to.throw();
    }, "expected [Function] to throw an error");

    t.err(function(){
      expect(goodFn).to.throw(ReferenceError);
    }, "expected [Function] to throw ReferenceError");

    t.err(function(){
      expect(goodFn).to.throw(specificError);
    }, "expected [Function] to throw [RangeError: boo]");

    t.err(function(){
      expect(badFn).to.not.throw();
    }, "expected [Function] to not throw an error but [Error: testing] was thrown");

    t.err(function(){
      expect(badFn).to.throw(ReferenceError);
    }, "expected [Function] to throw 'ReferenceError' but [Error: testing] was thrown");

    t.err(function(){
      expect(badFn).to.throw(specificError);
    }, "expected [Function] to throw [RangeError: boo] but [Error: testing] was thrown");

    t.err(function(){
      expect(badFn).to.not.throw(Error);
    }, "expected [Function] to not throw 'Error' but [Error: testing] was thrown");

    t.err(function(){
      expect(refErrFn).to.not.throw(ReferenceError);
    }, "expected [Function] to not throw 'ReferenceError' but [ReferenceError: hello] was thrown");

    t.err(function(){
      expect(badFn).to.throw(PoorlyConstructedError);
    }, "expected [Function] to throw 'PoorlyConstructedError' but [Error: testing] was thrown");

    t.err(function(){
      expect(ickyErrFn).to.not.throw(PoorlyConstructedError);
    }, /^(expected \[Function\] to not throw 'PoorlyConstructedError' but)(.*)(PoorlyConstructedError|\{ Object \()(.*)(was thrown)$/);

    t.err(function(){
      expect(ickyErrFn).to.throw(ReferenceError);
    }, /^(expected \[Function\] to throw 'ReferenceError' but)(.*)(PoorlyConstructedError|\{ Object \()(.*)(was thrown)$/);

    t.err(function(){
      expect(specificErrFn).to.throw(new ReferenceError('eek'));
    }, "expected [Function] to throw [ReferenceError: eek] but [RangeError: boo] was thrown");

    t.err(function(){
      expect(specificErrFn).to.not.throw(specificError);
    }, "expected [Function] to not throw [RangeError: boo]");

    t.err(function (){
      expect(badFn).to.not.throw(/testing/);
    }, "expected [Function] to throw error not matching /testing/");

    t.err(function () {
      expect(badFn).to.throw(/hello/);
    }, "expected [Function] to throw error matching /hello/ but got 'testing'");

    t.err(function () {
      expect(badFn).to.throw(Error, /hello/, 'blah');
    }, "blah: expected [Function] to throw error matching /hello/ but got 'testing'");

    t.err(function () {
      expect(badFn).to.throw(Error, 'hello', 'blah');
    }, "blah: expected [Function] to throw error including 'hello' but got 'testing'");
  });
});