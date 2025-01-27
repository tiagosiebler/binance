"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultLogger = void 0;
exports.DefaultLogger = {
    silly: (...params) => { },
    debug: (...params) => {
        console.log(new Date(), params);
    },
    notice: (...params) => {
        console.log(new Date(), params);
    },
    info: (...params) => {
        console.info(new Date(), params);
    },
    warning: (...params) => {
        console.error(new Date(), params);
    },
    error: (...params) => {
        console.error(new Date(), params);
    },
};
//# sourceMappingURL=logger.js.map