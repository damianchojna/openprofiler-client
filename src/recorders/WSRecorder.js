const WebSocket = require('ws');
const deasync = require('deasync');

module.exports.WSRecorder = class WSRecorder {
    constructor(url) {
        this.ws = new WebSocket(url, null, { perMessageDeflate: false });
        let wsOpen = false;
        this.ws.on('open', ()=> {wsOpen = true});
        deasync.loopWhile(function(){return !wsOpen;});
    }

    record(obj, callback) {
        this.ws.send(JSON.stringify(obj), callback);
    }
}
