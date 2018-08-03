module.exports.StreamRecorder = class StreamRecorder {
    constructor(stream) {
        this.stream = stream;
    }
    record(obj, callback) {
        this.stream.write(JSON.stringify(obj), callback);
    }
}
