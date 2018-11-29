const assert = require('assert');
const Container = require('../container');

let container;
let service;

describe('Container', function() {
    beforeEach(function(done) {
        container = new Container('/services.yaml', '/test/data');
        done();
    });
    it('paramA should equal to "paramA"', function() {
        assert.equal(container.getParameter('paramA'), 'paramA');
    });
    it('paramB should equal to "paramB"', function() {
        assert.equal(container.getParameter('paramB'), 'paramB');
    });
    it('serviceA log should equal to "paramB - C - paramA - B - A"', function() {
        assert.equal(container.get('serviceA').log(), 'paramB - C - paramA - B - A');
    });
    it('serviceB log should equal to "paramB - C - paramA - B"', function() {
        assert.equal(container.get('serviceB').log(), 'paramB - C - paramA - B');
    });
    it('serviceC log should equal to "paramB - C"', function() {
        assert.equal(container.get('serviceC').log(), 'paramB - C');
    });
    it('serviceD log should equal to "paramB - C - paramA - B - paramB - C - D"', function() {
        assert.equal(container.get('serviceD').log(), 'paramB - C - paramA - B - paramB - C - D');
    });
});
