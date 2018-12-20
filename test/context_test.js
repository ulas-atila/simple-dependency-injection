"use strict";

const assert = require('assert');
const Container = require('../container');

let container;
let service;

describe('Context', function() {
    beforeEach(function(done) {
        container = new Container('/services.yaml', __dirname + '/data');
        container.setContextParameter('param1', 'value1');
        done();
    });
    it('context parameter param1 should equal to "value1"', function() {
        assert.equal(container.get('context')['param1'], 'value1');
    });
    it('context parameter param1 should set to "value2" with setContextParameter', function() {
        container.setContextParameter('param1', 'value2');
        assert.equal(container.get('context')['param1'], 'value2');
    });
    it('context parameter param1 should set to "value2" with setContext', function() {
        container.setContext({'param1': 'value2'});
        assert.equal(container.get('context')['param1'], 'value2');
    });
    it('context parameter param1 retrieved by serviceA should equal to "value1"', async function() {
        const context = await container.get('serviceA').getContext();
        assert.equal(context['param1'], 'value1');
    });
    it('context parameter param1 retrieved by serviceA can\'t be change', async function() {
        const context = await container.get('serviceA').getContext();
        try {
            context['param1'] = 'value2';
            assert.fail('An error should throw');
        } catch (error) {
            if (error instanceof assert.AssertionError) {
                throw error;
            }
        }
    });
    it('context parameter param1 retrieved by serviceA before setted to "value2" with setContextParameter should equal to "value1"', async function() {
        const context = await container.get('serviceA').getContext();
        container.setContextParameter('param1', 'value2');
        const context2 = await container.get('serviceA').getContext();
        assert.equal(context['param1'], 'value1');
        assert.equal(context2['param1'], 'value2');
    });
    it('asynchronous context parameter param1 retrieved by serviceA before setted to "value2" with setContextParameter should equal to "value1"', async function() {
        const promise = container.get('serviceA').getContext();
        container.setContextParameter('param1', 'value2');
        const promise2 = container.get('serviceA').getContext();
        const [context, context2] = await Promise.all([promise, promise2]);
        assert.equal(context['param1'], 'value1');
        assert.equal(context2['param1'], 'value2');
    });
    it('second asynchronous context parameter param1 retrieved by serviceA before setted to "value2" with setContextParameter should equal to "value1"', async function() {
        const serviceA1 = container.get('serviceA');
        container.setContextParameter('param1', 'value2');
        const serviceA2 = container.get('serviceA');
        const [context, context2] = await Promise.all([serviceA1.getContext(), serviceA2.getContext()]);
        assert.equal(context['param1'], 'value1');
        assert.equal(context2['param1'], 'value2');
    });
});
