let jsonrpc = require('multitransport-jsonrpc');

module.exports = function (tracer, appName) {
    let jsonrpcRequestFunction = jsonrpc.transports.client.http.prototype.request;
    jsonrpc.transports.client.http.prototype.request = function () {
        let body = arguments[0];
        let callback = arguments[1];
        let idTrack = tracer.start(appName, 'multitransport_jsonrpc', {
            hostname: this.server,
            port: this.port,
            path: this.path,
            headers: this.headers,
            body: body
        });

        arguments[1] = function () {
            let err = arguments[0];
            let data = arguments[1];
            tracer.end(idTrack, err, data);
            return callback.apply(this, arguments);
        }.bind(this);

        jsonrpcRequestFunction.apply(this, arguments)
    }
}