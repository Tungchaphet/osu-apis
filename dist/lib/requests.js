'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestHandlers = void 0;
const axios_1 = __importDefault(require("axios"));
const qs_1 = require("qs");
const _encode = (object) => Object.keys(object || {}).length !== 0 ? `?${(0, qs_1.stringify)(object)}` : '';
function requestHandlers(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.request({
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
    });
}
exports.requestHandlers = requestHandlers;
//# sourceMappingURL=requests.js.map