'use strict';

var hrTimeSupport = typeof process !== 'undefined' && process.hrtime;

function nowLegacy() {
    return Date.now() * 1000;
}

function nowHrTime(startTimestamp, startTick) {
    if (startTimestamp && startTick) {
        var hrtime = process.hrtime(startTick);
        var elapsedMicros = Math.floor(hrtime[0] * 1000000 + hrtime[1] / 1000);
        return startTimestamp + elapsedMicros;
    } else {
        return Date.now() * 1000;
    }
}

module.exports.now = hrTimeSupport ? nowHrTime : nowLegacy;
module.exports.hrtime = hrTimeSupport ? function () {
    return process.hrtime();
} : function () {
    return undefined;
};