'use strict';

let Koa     = require('koa');
let Router  = require('koa-router')();
let Body    = require('koa-body');

let testServer = new Koa();

testServer.use(Body());
Router.get('/test/get', function *() {
    this.body = 'test/get';
});
Router.post('/test/post', function *() {
    this.status = 204;
});

testServer.use(Router.routes());
testServer.listen(8989);

let assert      = require('assert');
let RestClient  = require('../lib/restclient');
let client      = new RestClient({
    endpoint : 'http://localhost:8989'
    , auth   : undefined
});

describe('restclient-get', () => {
    it('should return 200 OK with test/get response body', function *() {
        let data = yield client.GET({
            path : 'test/get'
        });
        assert.equal(200, data.response.statusCode);
        assert.equal('OK', data.response.statusMessage);
        assert.equal('test/get', data.response.body);
    });
});

describe('restclient-post', () => {
    it('should return 204 No Content', function *() {
        let data = yield client.POST({
            path : 'test/post'
        });
        assert.equal(204, data.response.statusCode);
        assert.equal('No Content', data.response.statusMessage);
    });
});