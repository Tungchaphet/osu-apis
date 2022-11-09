'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestHandlers = void 0;
const axios_1 = __importDefault(require("axios"));
const qs_1 = require("qs");
const _encode = (object) => Object.keys(object || {}).length !== 0 ? `?${(0, qs_1.stringify)(object)}` : '';
async function requestHandlers(options) {
    const response = await axios_1.default.request({
        url: `https://osu.ppy.sh${options.path}${_encode(options.querys)}`,
        method: options.method,
        headers: options.auth ? {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${options.auth}`
        } : {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        data: options.body
    });
    return response.data;
}
exports.requestHandlers = requestHandlers;
