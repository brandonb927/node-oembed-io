var oembed = require("../oembed-io");
var should = require('chai').should();
var expect = require('chai').expect;

describe('oEmbed.io functions test', function() {

  describe('#oembed.get() with no args', function() {
    it('should return a json object', function(done) {
      oembed.get('https://www.youtube.com/watch?v=cR_GVBdZF_M', function(err, code, body) {
        expect(code).to.be.equal(200);
        expect(body).to.be.an('object');
        done();
      });
    });
  });

  describe('#oembed.get() with a url for a non-existent page', function() {
    it('should return a 404 status code', function(done) {
      var url = 'https://www.anonexistentwebpagethatgoesnowhere.com';
      oembed.get(url, function(err, code, body) {
        expect(err).to.be.equal(null);
        expect(code).to.be.equal(404);
        expect(body).to.be.equal(undefined);
        done();
      });
    });
  });

  describe('#oembed.providers()', function() {
    it('should return an array', function(done) {
      oembed.providers(function(err, code, body) {
        expect(code).to.be.equal(200);
        expect(body).to.be.an('array');
        done();
      });
    });
  });

});
