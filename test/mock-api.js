const url = require('url');

let handlers = {};

const request = (options, callback) => {
    const path = url.parse(options.url).pathname.replace('/', '');
    if (!handlers[path]) {
        callback(null, { statusCode: 200 }, `{ "message": "No handler for ${path} provided" }`); // default handler
    } else {
        process.nextTick(() => {
            handlers[path](options, callback);
        });
    }
};

request.setHandler = (path, handler) => {
    handlers[path] = handler;
};

request.clearHandlers = () => {
    handlers = {};
};

module.exports = request;