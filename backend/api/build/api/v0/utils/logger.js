"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.warning = exports.info = void 0;
function info(logObject) {
    if (process.env.logging === 'false') {
        return true;
    }
    console.info("[INFO]  " + logObject.component + " ==> " + logObject.message);
}
exports.info = info;
function warning(logObject) {
    if (process.env.logging === 'false') {
        return true;
    }
    console.warn("[WARNING]  " + logObject.component + " ==> " + logObject.message);
}
exports.warning = warning;
function error(logObject) {
    if (process.env.logging === 'false') {
        return true;
    }
    console.trace("[ERROR]  " + logObject.component + " ==> " + logObject.message + ": " + logObject.error);
}
exports.error = error;
