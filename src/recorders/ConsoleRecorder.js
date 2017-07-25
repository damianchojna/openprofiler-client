module.exports.ConsoleRecorder = class ConsoleRecorder {
    constructor() {
    }

    record(obj, callback) {
        console.log(obj);
        callback();
    }
}
