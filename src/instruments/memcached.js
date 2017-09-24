try {
    const Memcached = require('memcached');
} catch(e) {}

module.exports = (tracer, appName) => {

    let memcachedCommandFunc = Memcached.prototype.command;
    Memcached.prototype.command = function (queryCompiler, server) {
        let query = queryCompiler();
        let queryCallbackFunc = query.callback;
        let idTrack = tracer.start(appName, 'memcached', query.command);
        query.callback = function () {
            let err = arguments[0];
            let data = arguments[1];
            tracer.end(idTrack, err, data);
            return queryCallbackFunc.apply(this, arguments);
        };

        memcachedCommandFunc.call(this, () => query, server);
    };

};