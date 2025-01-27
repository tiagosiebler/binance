"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeTerminateWs = void 0;
function safeTerminateWs(ws) {
    if (typeof ws?.terminate === 'function' && ws) {
        ws.terminate();
    }
}
exports.safeTerminateWs = safeTerminateWs;
//# sourceMappingURL=ws-utils.js.map