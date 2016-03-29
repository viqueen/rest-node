'use strict';

let Q       = require('q');
let Request = require('request');
let QS      = require('qs');

class RestClient {

    constructor(config) {
        this.config = config;
    }

    resource (options) {

        const path      = options.path;
        const query     = options.query     || {};
        const method    = options.method    || 'GET';
        const body      = options.body      || undefined;
        const json      = options.json      || true;
        const headers   = Object.assign({}, options.headers || {}, { 'User-Agent' : 'rest-node' });
        const formData  = options.formData  || undefined;
        const defer = Q.defer();

        Request({

            uri : `${this.config.endpoint}/${path}?${QS.stringify(query)}`
            , method    : method
            , json      : json
            , auth      : this.config.auth
            , headers   : headers
            , body      : body
            , formData  : formData
        }, (error, response) => {
            if (error) {
                defer.reject({
                    error : error
                });
            } else {
                defer.resolve({
                    response : response
                })
            }
        });

        return defer.promise;
    }

    GET (options) {
        return this.resource(Object.assign({}, options, { method : 'GET' }));
    }

    POST (options) {
        return this.resource(Object.assign({}, options, { method : 'POST' }));
    }

    PUT (options) {
        return this.resource(Object.assign({}, options, { method : 'PUT' }));
    }

    DELETE (options) {
        return this.resource(Object.assign({}, options, { method : 'DELETE' }));
    }

}

module.exports = RestClient;
