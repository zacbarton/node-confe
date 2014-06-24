var mock = require('mock-fs');
var config = require('../');

describe('confe', function() {
	
	before(function(done) {
		mock({
			'/tmp/a.json': '{"dev": {"a": true}}'
			, '/tmp/b.json': '{"one": {"c": true}, "two": {"extends": "one", "a": false}}'
			, '/tmp/c.json': '{"one": {"c": true}, "two": {"extends": "one", "a": true, "b": true}, "three": {"extends": "two", "a": false}}'
			, '/tmp/d.json': '{"two": {"extends": "one", "a": true}}'
		});
		done();
	});
	
	it('returns an object', function(done) {
		config('/tmp/a.json', 'dev').should.be.an.Object;
		done();
	});
	
	it('returns 1 expected key', function(done) {
		config('/tmp/a.json', 'dev').should.have.key('a');
		done();
	});
	
	it('returns not expected key', function(done) {
		config('/tmp/a.json', 'dev').should.not.have.key('b');
		done();
	});
	
	it('returns extends with 1 key', function(done) {
		config('/tmp/b.json', 'two').should.have.key('a', 'c', 'extends');
		done();
	});
	
	it('returns extends with 2 keys', function(done) {
		config('/tmp/c.json', 'three').should.have.property('extends', ['two', 'one']);
		done();
	});
	
	it('returns expected value after 2 levels of extends', function(done) {
		config('/tmp/c.json', 'three').should.have.property('c', true);
		done();
	});
	
	it('returns overridden value after 2 levels of extends', function(done) {
		config('/tmp/c.json', 'three').should.have.property('a', false);
		done();
	});
	
	it('returns error when keys is not defined', function(done) {
		(function() {
  			config('/tmp/b.json', 'does_not_exists');
		}).should.throwError();
		
		done();
	});
	
	it('returns error when extends key is not defined', function(done) {
		(function() {
  			config('/tmp/d.json', 'two');
		}).should.throwError();
		
		done();
	});
	
});