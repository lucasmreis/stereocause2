var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var server = require('../');

lab.experiment('stats', function() {
  lab.test('should be ok', function(done) {
    Code.expect(1).to.equal(1);
    done();
  });
});