/**
 * Wykorzystywane do auth api
 */

const request = require('request');
const _ = require('lodash');

module.exports = (tracer, appName) => {

    let forwardedFunction = request.Request.prototype.init;
    request.Request.prototype.init = function (options) {
        let idTrack = tracer.start(appName, 'request', options);

        let forwardedCallback = options.callback;
        options.callback = function (err, response, body) {
            tracer.end(idTrack, err, response);
            if (_.isFunction(options.callback)) {
                return forwardedCallback.apply(this, arguments);
            }
        };

        this.callback = options.callback; //this -> object "Response" from node_modules/request/request.js

        forwardedFunction.call(this, options);
    };
};