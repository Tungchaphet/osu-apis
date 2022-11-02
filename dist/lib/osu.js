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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OsuAPI = void 0;
const requests_1 = require("./requests");
const qs_1 = require("qs");
class OsuAPI {
    constructor(options) {
        this.clientID = options.clientID;
        this.clientSecret = options.clientSecret;
        this.redirectURI = options.redirectURI;
    }
    tokenRequest(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestObject = {
                client_id: this.clientID,
                client_secret: this.clientSecret,
                grant_type: options.grantType,
            };
            switch (options.grantType) {
                case 'authorization_code':
                    requestObject.code = options.code;
                    requestObject.redirect_uri = this.redirectURI;
                    break;
                case 'client_credentials':
                    requestObject.scope = 'public';
                    break;
                case 'refresh_token':
                    requestObject.access_token = options.accessToken;
                    requestObject.refresh_token = options.refreshToken;
                    break;
                default:
                    throw new Error(`Grant type must be 'authorization_code', 'client_credentials' or 'refresh_token'`);
            }
            const response = yield (0, requests_1.requestHandlers)({
                path: '/oauth/token',
                method: 'POST',
                body: requestObject
            });
            return response;
        });
    }
    revokeToken(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!accessToken)
                throw new Error('Missing `access_token` to request.');
            const isSuccess = yield (0, requests_1.requestHandlers)({
                path: '/api/v2/oauth/tokens/current',
                method: 'DELETE',
                auth: accessToken
            }).then(() => true).catch(() => false);
            return isSuccess;
        });
    }
    generateAuthURL(scope, state) {
        const querys = {
            client_id: this.clientID,
            redirect_uri: this.redirectURI,
            response_type: 'code',
            scope: scope.join(' '),
            state: state || Math.random().toString(36).substring(2)
        };
        const encoded_string = (0, qs_1.stringify)(querys);
        return `https://osu.ppy.sh/oauth/authorize?${encoded_string}`;
    }
    getOwnData(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options.accessToken)
                throw new Error('Missing `access_token` to request.');
            const response = yield (0, requests_1.requestHandlers)({
                path: `/api/v2/me/${options.mode || ''}`,
                method: 'GET',
                auth: options.accessToken
            });
            return response;
        });
    }
    getUser(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options.accessToken)
                throw new Error('Missing `access_token` to request.');
            const response = yield (0, requests_1.requestHandlers)({
                method: 'GET',
                path: `/api/v2/users/${options.user}/${options.mode || ''}`,
                querys: options.key ? { key: options.key } : undefined,
                auth: options.accessToken
            });
            return response;
        });
    }
    getUserScores(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options.accessToken)
                throw new Error('Missing `access_token` to request.');
            const querys = {
                include_fails: options.include_fails ? 1 : 0
            };
            if (options.mode)
                querys.mode = options.mode;
            if (options.limit)
                querys.limit = options.limit;
            if (options.offset)
                querys.offset = options.offset;
            const response = yield (0, requests_1.requestHandlers)({
                method: 'GET',
                path: `/api/v2/users/${options.id}/scores/${options.type}`,
                auth: options.accessToken,
                querys: querys
            });
            return response;
        });
    }
    getUserBeatmaps(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options.accessToken)
                throw new Error('Missing `access_token` to request.');
            const querys = {};
            if (options.limit)
                querys.limit = options.limit;
            if (options.offset)
                querys.offset = options.offset;
            const response = yield (0, requests_1.requestHandlers)({
                method: 'GET',
                path: `/api/v2/users/${options.user}/beatmapsets/${options.type}`,
                querys: querys,
                auth: options.accessToken
            });
            return response;
        });
    }
    getUserKudosu(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options.accessToken)
                throw new Error('Missing `access_token` to request.');
            const querys = {};
            if (options.limit)
                querys.limit = options.limit;
            if (options.offset)
                querys.offset = options.offset;
            const response = yield (0, requests_1.requestHandlers)({
                method: 'GET',
                path: `/api/v2/users/${options.user}/kudosu`,
                auth: options.accessToken,
                querys: querys
            });
            return response;
        });
    }
    getUsers(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options.accessToken)
                throw new Error('Missing `access_token` to request.');
            const response = yield (0, requests_1.requestHandlers)({
                method: 'GET',
                path: '/api/v2/users',
                querys: { ids: options.ids }
            });
            return response;
        });
    }
    lookupBeatmap(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options.accessToken)
                throw new Error('Missing `access_token` to request.');
            const querys = {};
            if (options.checksum)
                querys.checksum = options.checksum;
            if (options.filename)
                querys.filename = options.filename;
            if (options.id)
                querys.id = options.id;
            const response = yield (0, requests_1.requestHandlers)({
                method: 'GET',
                path: `/api/v2/beatmaps/lookup`,
                querys: querys,
                auth: options.accessToken
            });
            return response;
        });
    }
    getUserBeatmapScore(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options.accessToken)
                throw new Error('Missing `access_token` to request.');
            const querys = {};
            if (options.mode)
                querys.mode = options.mode;
            if (options.mods)
                querys.mods = options.mods;
            const response = yield (0, requests_1.requestHandlers)({
                method: 'GET',
                path: `/api/v2/beatmaps/${options.beatmap}/scores/users/${options.user}`,
                querys: querys,
                auth: options.accessToken
            });
            return response;
        });
    }
    getUserBeatmapScores(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options.accessToken)
                throw new Error('Missing `access_token` to request.');
            const response = yield (0, requests_1.requestHandlers)({
                method: 'GET',
                path: `/api/v2/beatmaps/${options.beatmap}/scores/users/${options.user}/all`,
                querys: options.mode ? { mode: options.mode } : {}
            });
            return response;
        });
    }
    getBeatmap(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options.accessToken)
                throw new Error('Missing `access_token` to request.');
            const response = yield (0, requests_1.requestHandlers)({
                method: 'GET',
                path: `/api/v2/beatmaps/${options.beatmap}`,
                auth: options.accessToken
            });
            return response;
        });
    }
    getBeatmaps(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options.accessToken)
                throw new Error('Missing `access_token` to request.');
            const response = yield (0, requests_1.requestHandlers)({
                method: 'GET',
                path: '/api/v2/beatmaps',
                querys: options.ids ? { ids: options.ids } : {}
            });
            return response;
        });
    }
}
exports.OsuAPI = OsuAPI;
//# sourceMappingURL=osu.js.map