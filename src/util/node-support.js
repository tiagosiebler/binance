"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signMessage = void 0;
const crypto_1 = require("crypto");
const browserMethods = require("./browser-support");
async function signMessage(message, secret) {
    if (secret.includes('PRIVATE KEY') && typeof crypto_1.createSign === 'function') {
        return (0, crypto_1.createSign)('RSA-SHA256').update(message).sign(secret, 'base64');
    }
    if (typeof crypto_1.createHmac === 'function') {
        return (0, crypto_1.createHmac)('sha256', secret).update(message).digest('hex');
    }
    return browserMethods.signMessage(message, secret);
}
exports.signMessage = signMessage;
//# sourceMappingURL=node-support.js.map