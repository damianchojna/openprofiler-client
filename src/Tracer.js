const {now, hrtime} = require('./lib/time');
const crypto = require('crypto');

class Tracer {

    constructor(recorder) {
        this.startTimestamp = now();
        this.startTick = hrtime();
        this.recorder = recorder;
        this.records = {};
    }

    /**
     *
     * @param string appName
     * @param string remote
     * @param Object request
     * @returns {string}
     */
    start(appName, remote, request = null) {
        if(!appName) {
            throw new Error(`Parameter appName missing`);
        }
        if(!remote) {
            throw new Error(`Parameter remote missing`);
        }
        var timestamp = now(this.startTimestamp, this.startTick);
        var random = Math.random().toString();
        var id = crypto.createHash('sha1').update(appName + remote + timestamp + random).digest('hex');
        this.records[id] = {
            app: appName,
            remote: remote,
            start: timestamp,
            req: request
        }
        return id;
    }

    /**
     *
     * @param string id
     * @param Object|null err
     * @param Object|null data
     */
    end(id, err = null, data = null) {
        let record = this.records[id];
        if (!record) {
            throw new Error(`No record ${id}`)
        }
        record.end = now(this.startTimestamp, this.startTick);
        record.res = {};
        record.res.err = err;
        record.res.data = data;

        this.recorder.record(record, (err, res)=>{
            delete this.records[id];
        });
    }
}

module.exports.Tracer = Tracer;