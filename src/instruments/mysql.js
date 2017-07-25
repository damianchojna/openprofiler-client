const _ = require("lodash");
const mysqlConnection = require('../../../node_modules/mysql/lib/Connection');

module.exports = function (tracer, appName) {

    let queryFunc = mysqlConnection.prototype.query;

    mysqlConnection.prototype.query = function (sql, values, callback) {
        let idTrack = tracer.start(appName, 'mysql', {
            sql: sql,
            values: values
        });

        let actualCallback = callback;
        let newCallback = function () {
            let err = arguments[0];
            let data = arguments[1];
            tracer.end(idTrack, err, data);
            if (_.isFunction(actualCallback)) {
                return actualCallback.apply(this, arguments);
            }
        }.bind(this);

        queryFunc.apply(this, [sql, values, newCallback])
    }
}