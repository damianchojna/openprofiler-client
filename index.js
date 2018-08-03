const {Tracer}          = require('./src/Tracer');
const {ConsoleRecorder} = require('./src/recorders/ConsoleRecorder');
const {WSRecorder}      = require('./src/recorders/WSRecorder');
const {StreamRecorder}      = require('./src/recorders/StreamRecorder');

module.exports = {
    Tracer: Tracer,
    recorders: {
        ConsoleRecorder: ConsoleRecorder,
        WSRecorder: WSRecorder,
        StreamRecorder: StreamRecorder,
    },
    instruments: {
        "mysql"                 : require('./src/instruments/mysql'),
        "request"               : require('./src/instruments/request'),
        "memcached"             : require('./src/instruments/memcached'),
        "multitransport-jsonrpc": require('./src/instruments/multitransport-jsonrpc'),
    }
}