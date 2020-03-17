const url = require('url');

let handlers = {};

const request = (options, callback) => {
    process.nextTick(() => {
        const path = url.parse(options.url).pathname.replace('/', '');
        if (!handlers[path]) {
            // default handler
            callback(
                null,
                { statusCode: 200 },
                `{ "message": "No handler for ${path} provided" }`
            );
        } else {
            handlers[path](options, callback);
        }
    });
};

request.setHandler = (path, handler) => {
    handlers[path] = handler;
};

request.clearHandlers = () => {
    handlers = {};
};

module.exports = request;
