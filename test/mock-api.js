const url = require('url');

let handlers = {};

const request = (options, callback) => {
    const path = url.parse(options.url).pathname.replace('/api/v1/', '');
    handlers[path](options, callback);
};

request.setHandler = (path, handler) => {
    handlers[path] = handler;
};

request.clearHandlers = () => {
    handlers = {};
};

module.exports = request;