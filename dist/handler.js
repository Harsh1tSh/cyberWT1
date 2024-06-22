"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = void 0;
require("source-map-support/register");
const hello = async (event, _context) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello from Lambda!',
            input: event,
        }, null, 2),
    };
};
exports.hello = hello;
