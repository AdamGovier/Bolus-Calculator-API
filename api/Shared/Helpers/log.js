import Log from "../Models/Log.schema.js";

/**
 * @description Creates a log entry and saves into the database.
 * @param {Object} log, the log entry object which should match the Log.schema.js format.
 * @param {function} callback, Do something when the log entry is saved into the database.
 */
export default (log, callback) => {
    new Log(log).save().then(() => callback && callback());
}