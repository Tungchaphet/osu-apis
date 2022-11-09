'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankStatusEnum = exports.OsuAPI = void 0;
const requests_1 = require("./requests");
const qs_1 = require("qs");
var RankStatusEnum;
(function (RankStatusEnum) {
    RankStatusEnum[RankStatusEnum["GRAVEYARD"] = -2] = "GRAVEYARD";
    RankStatusEnum[RankStatusEnum["WIP"] = -1] = "WIP";
    RankStatusEnum[RankStatusEnum["PENDING"] = 0] = "PENDING";
    RankStatusEnum[RankStatusEnum["RANKED"] = 1] = "RANKED";
    RankStatusEnum[RankStatusEnum["APPROVED"] = 2] = "APPROVED";
    RankStatusEnum[RankStatusEnum["QUALIFIED"] = 3] = "QUALIFIED";
    RankStatusEnum[RankStatusEnum["LOVED"] = 4] = "LOVED";
})(RankStatusEnum || (RankStatusEnum = {}));
exports.RankStatusEnum = RankStatusEnum;
/** Make requests to osu! OAuth2 API v2 */
class OsuAPI {
    /**
     * @arg {Object} options
     * @arg {Number} options.clientID The Client ID you received when you registered.
     * @arg {String} options.clientSecret The client secret of your application.
     * @arg {String} options.redirectURI The URL in your application where users will be sent after authorization.
     */
    constructor(options) {
        this.clientID = options.clientID;
        this.clientSecret = options.clientSecret;
        this.redirectURI = options.redirectURI;
    }
    async tokenRequest(options) {
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
        const response = await (0, requests_1.requestHandlers)({
            path: '/oauth/token',
            method: 'POST',
            body: requestObject
        });
        return response;
    }
    async revokeToken(accessToken) {
        if (!accessToken)
            throw new Error('Missing `access_token` to request.');
        const isSuccess = await (0, requests_1.requestHandlers)({
            path: '/api/v2/oauth/tokens/current',
            method: 'DELETE',
            auth: accessToken
        }).then(() => true).catch(() => false);
        return isSuccess;
    }
    generateAuthURL(scope, state) {
        if (!Array.isArray(scope))
            throw new TypeError(`Type of scope parameter must be 'array' not '${typeof scope}'`);
        const querys = {
            client_id: this.clientID,
            redirect_uri: this.redirectURI,
            response_type: 'code',
            scope: scope.join(' ')
        };
        if (state)
            querys.state = state;
        const encoded_string = (0, qs_1.stringify)(querys);
        return `https://osu.ppy.sh/oauth/authorize?${encoded_string}`;
    }
    async getOwnData(options) {
        if (!options.accessToken)
            throw new Error('Missing `access_token` to request.');
        const response = await (0, requests_1.requestHandlers)({
            path: `/api/v2/me/${options.mode || ''}`,
            method: 'GET',
            auth: options.accessToken
        });
        return response;
    }
    async getUser(options) {
        if (!options.accessToken)
            throw new Error('Missing `access_token` to request.');
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: `/api/v2/users/${options.user}/${options.mode || ''}`,
            querys: options.key ? { key: options.key } : undefined,
            auth: options.accessToken
        });
        return response;
    }
    async getUserScores(options) {
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
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: `/api/v2/users/${options.id}/scores/${options.type}`,
            auth: options.accessToken,
            querys: querys
        });
        return response;
    }
    async getUserBeatmaps(options) {
        if (!options.accessToken)
            throw new Error('Missing `access_token` to request.');
        const querys = {};
        if (options.limit)
            querys.limit = options.limit;
        if (options.offset)
            querys.offset = options.offset;
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: `/api/v2/users/${options.user}/beatmapsets/${options.type}`,
            querys: querys,
            auth: options.accessToken
        });
        return response;
    }
    async getUserRecentActivity(options) {
        if (!options.accessToken)
            throw new Error('Missing `access_token` to request.');
        const querys = {};
        if (options.limit)
            querys.limit = options.limit;
        if (options.offset)
            querys.offset = options.offset;
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: `/api/v2/users/${options.id}/recent_activity`,
            querys: querys,
            auth: options.accessToken
        });
        return response;
    }
    async getUserKudosu(options) {
        if (!options.accessToken)
            throw new Error('Missing `access_token` to request.');
        const querys = {};
        if (options.limit)
            querys.limit = options.limit;
        if (options.offset)
            querys.offset = options.offset;
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: `/api/v2/users/${options.user}/kudosu`,
            auth: options.accessToken,
            querys: querys
        });
        return response;
    }
    async getUsers(options) {
        if (!options.accessToken)
            throw new Error('Missing `access_token` to request.');
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: '/api/v2/users',
            querys: { ids: options.ids },
            auth: options.accessToken
        });
        return response;
    }
    async lookupBeatmap(options) {
        if (!options.accessToken)
            throw new Error('Missing `access_token` to request.');
        const querys = {};
        if (options.checksum)
            querys.checksum = options.checksum;
        if (options.filename)
            querys.filename = options.filename;
        if (options.id)
            querys.id = options.id;
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: `/api/v2/beatmaps/lookup`,
            querys: querys,
            auth: options.accessToken
        });
        return response;
    }
    async getUserBeatmapScore(options) {
        if (!options.accessToken)
            throw new Error('Missing `access_token` to request.');
        const querys = {};
        if (options.mode)
            querys.mode = options.mode;
        if (options.mods)
            querys.mods = options.mods;
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: `/api/v2/beatmaps/${options.beatmap}/scores/users/${options.user}`,
            querys: querys,
            auth: options.accessToken
        });
        return response;
    }
    async getUserBeatmapScores(options) {
        if (!options.accessToken)
            throw new Error('Missing `access_token` to request.');
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: `/api/v2/beatmaps/${options.beatmap}/scores/users/${options.user}/all`,
            querys: options.mode ? { mode: options.mode } : {},
            auth: options.accessToken
        });
        return response;
    }
    async getBeatmap(options) {
        if (!options.accessToken)
            throw new Error('Missing `access_token` to request.');
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: `/api/v2/beatmaps/${options.beatmap}`,
            auth: options.accessToken
        });
        return response;
    }
    async getBeatmaps(options) {
        if (!options.accessToken)
            throw new Error('Missing `access_token` to request.');
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: '/api/v2/beatmaps',
            querys: options.ids ? { ids: options.ids } : {},
            auth: options.accessToken
        });
        return response;
    }
    async getBeatmapScores(options) {
        if (!options.accessToken)
            throw new Error('Missing `access_token` to request.');
        const querys = {};
        if (options.mode)
            querys.mode = options.mode;
        if (options.mods)
            querys.mods = options.mods;
        if (options.type)
            querys.type = options.type;
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: `/api/v2/beatmaps/${options.beatmap}/scores`,
            auth: options.accessToken,
            querys: querys
        });
        return response;
    }
    async getBeatmapAttributes(options) {
        if (!options.accessToken)
            throw new Error('Missing `access_token` to request.');
        const body = {};
        const response = await (0, requests_1.requestHandlers)({
            method: 'POST',
            path: `/api/v2/beatmaps/${options.beatmap}/attributes`,
            body: body,
            auth: options.accessToken
        });
        return response;
    }
    async getBeatmapsetDiscussionPosts(options) {
        if (!options.accessToken)
            throw new Error('Missing `access_token` to request.');
        const querys = {};
        if (options.beatmapset_discussion_id)
            querys.beatmapset_discussion_id = options.beatmapset_discussion_id;
        if (options.limit)
            querys.limit = options.limit;
        if (options.page)
            querys.page = options.page;
        if (options.sort)
            querys.sort = options.sort;
        if (options.user)
            querys.user = options.user;
        if (options.types)
            querys.types = options.types;
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: '/api/v2/beatmapsets/discussions/posts',
            querys: querys,
            auth: options.accessToken
        });
        return response;
    }
    async getBeatmapDiscussionVotes(options) {
        if (!options.accessToken)
            throw new Error('Missing `access_token` to request.');
        const querys = {};
        if (options.beatmapset_discussion_id)
            querys.beatmapset_discussion_id = options.beatmapset_discussion_id;
        if (options.limit)
            querys.limit = options.limit;
        if (options.page)
            querys.page = options.page;
        if (options.sort)
            querys.sort = options.sort;
        if (options.user)
            querys.user = options.user;
        if (options.receiver)
            querys.receiver = options.receiver;
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: '/api/v2/beatmapsets/discussions/votes',
            querys: querys,
            auth: options.accessToken
        });
        return response;
    }
    async getBeatmapsetDiscussions(options) {
        if (!options.accessToken)
            throw new Error('Missing `access_token` to request.');
        const querys = {};
        if (options.beatmap_id)
            querys.beatmap_id = options.beatmap_id;
        if (options.beatmapset_id)
            querys.beatmapset_id = options.beatmapset_id;
        if (options.beatmapset_status)
            querys.beatmapset_status = options.beatmapset_status;
        if (options.limit)
            querys.limit = options.limit;
        if (options.message_types)
            querys.message_types = options.message_types;
        if (options.only_unresolved)
            querys.only_unresolved = options.only_unresolved;
        if (options.page)
            querys.page = options.page;
        if (options.sort)
            querys.sort = options.sort;
        if (options.id)
            querys.id = options.id;
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: '/api/v2/beatmapsets/discussions',
            querys: querys,
            auth: options.accessToken
        });
        return response;
    }
    async getChangelogBuild(options) {
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: `/api/v2/changelog/${options.stream}/${options.build}`
        });
        return response;
    }
    async getChangelogListing(options) {
        const querys = {};
        if (options.form)
            querys.form = options.form;
        if (options.max_id)
            querys.max_id = options.max_id;
        if (options.stream)
            querys.stream = options.stream;
        if (options.to)
            querys.to = options.to;
        if (options.message_formats)
            querys.message_formats = [options.message_formats];
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: '/api/v2/changelog',
            querys: querys
        });
        return response;
    }
    async lookupChangelogBuild(options) {
        const querys = {};
        if (options.key)
            querys.key = options.key;
        if (options.message_formats)
            querys.message_formats = [options.message_formats];
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: `/api/v2/changelog/${options.changelog}`,
            querys: querys
        });
        return response;
    }
    async getOwnFriends(accessToken) {
        if (!accessToken)
            throw new Error('Missing `access_token` to request.');
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: '/api/v2/friends',
            auth: accessToken
        });
        return response;
    }
    async getSeasonalBackgrounds() {
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: '/api/v2/seasonal-backgrounds'
        });
        return response;
    }
    async getWikiPage(options) {
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: `/api/v2/wiki/${options.locale}/${options.path}`
        });
        return response;
    }
    async search(options) {
        const querys = {};
        if (options.mode)
            querys.mode = options.mode;
        if (options.query)
            querys.query = options.query;
        if (options.page)
            querys.page = options.page;
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: '/api/v2/search',
            querys: querys,
            auth: options.accessToken
        });
        return response;
    }
    async getScores(options) {
        if (!options.accessToken)
            throw new Error('Missing `access_token` to request.');
        const querys = {};
        if (options.limit)
            querys.limit = options.limit;
        if (options.sort)
            querys.sort = options.sort;
        if (options.cursor)
            querys.cursor = options.cursor;
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: `/api/v2/rooms/${options.room}/playlist/${options.playlist}/scores`,
            querys: querys,
            auth: options.accessToken
        });
        return response;
    }
    async getComments(options) {
        const querys = {};
        if (options.commentable_type)
            querys.commentable_type = options.commentable_type;
        if (options.commentable_id)
            querys.commentable_id = options.commentable_id;
        if (options.cursor)
            querys.cursor = options.cursor;
        if (options.parent_id)
            querys.parent_id = options.parent_id;
        if (options.sort)
            querys.sort = options.sort;
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: '/api/v2/comments',
            querys: querys
        });
        return response;
    }
    async getComment(comment) {
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: `/api/v2/comments/${comment}`
        });
        return response;
    }
    async replyTopic(options) {
        if (!options.accessToken)
            throw new Error('Missing `access_token` to request.');
        if (!options.body || !options.topic)
            throw new Error('Missing `topic` or `body` of the parameters.');
        const response = await (0, requests_1.requestHandlers)({
            method: 'POST',
            path: `/api/v2/forums/topics/${options.topic}/reply`,
            auth: options.accessToken,
            body: {
                body: options.body
            }
        });
        return response;
    }
    async createTopic(accessToken, options) {
        if (!accessToken)
            throw new Error('Missing `access_token` to request.');
        const response = await (0, requests_1.requestHandlers)({
            method: 'POST',
            path: `/api/v2/forums/topics`,
            body: options,
            auth: accessToken
        });
        return response;
    }
    async getTopicAndPosts(options) {
        if (!options.accessToken)
            throw new Error('Missing `access_token` to request.');
        const querys = {};
        if (options.cursor)
            querys.cursor_string = Buffer.from(JSON.stringify(options.cursor), 'base64').toString();
        if (options.start)
            querys.start = options.start;
        if (options.end)
            querys.end = options.end;
        if (options.sort)
            querys.sort = options.sort;
        if (options.limit)
            querys.limit = options.limit;
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: `/api/v2/forums/topics/${options.topic}`,
            auth: options.accessToken,
            querys: querys
        });
        return response;
    }
    async editTopic(options) {
        var _a;
        if (!options.accessToken)
            throw new Error('Missing `access_token` to request.');
        const response = await (0, requests_1.requestHandlers)({
            method: 'PUT',
            path: `/api/v2/forums/topics/${options.topic}`,
            auth: options.accessToken,
            body: {
                "forum_topic[topic_title]": (_a = options.forum_topic) === null || _a === void 0 ? void 0 : _a.topic_title
            }
        });
        return response;
    }
    async editPost(options) {
        if (!options.accessToken)
            throw new Error('Missing `access_token` to request.');
        const response = await (0, requests_1.requestHandlers)({
            method: 'PUT',
            path: `/api/v2/forums/posts/${options.post}`,
            auth: options.accessToken,
            body: {
                body: options.body
            }
        });
        return response;
    }
    async getRanking(options) {
        if (!options.accessToken)
            throw new Error('Missing `access_token` to request.');
        const querys = {};
        if (options.country)
            querys.country = options.country;
        if (options.cursor)
            querys.cursor = options.cursor;
        if (options.filter)
            querys.filter = options.filter;
        if (options.spotlight)
            querys.spotlight = options.spotlight;
        if (options.variant)
            querys.variant = options.variant;
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: `/api/v2/rankings/${options.mode}/${options.type}`,
            querys: querys,
            auth: options.accessToken
        });
        return response;
    }
    async getSpotlights(accessToken) {
        if (!accessToken)
            throw new Error('Missing `access_token` to request.');
        const response = await (0, requests_1.requestHandlers)({
            method: 'GET',
            path: '/api/v2/spotlights',
            auth: accessToken
        });
        return response;
    }
    async createNewPM(options) {
        if (!options.accessToken)
            throw new Error('Missing `access_token` to request.');
        const body = {
            target_id: options.target_id,
            message: options.message,
            is_action: options.is_action
        };
        if (options.uuid)
            body.uuid = options.uuid;
        const response = await (0, requests_1.requestHandlers)({
            method: 'POST',
            path: '/api/v2/chat/new',
            body: body,
            auth: options.accessToken
        });
        return response;
    }
    async createChannel(options) {
        if (!options.accessToken)
            throw new Error('Missing `access_token` to request.');
        const body = {
            type: options.type
        };
        if (options.channel)
            body.channel = options.channel;
        if (options.message)
            body.message = options.message;
        if (options.target_id)
            body.target_id = options.target_id;
        if (options.target_ids)
            body.target_ids = options.target_ids;
        const response = await (0, requests_1.requestHandlers)({
            method: 'POST',
            path: '/api/v2/chat/channels',
            auth: options.accessToken,
            body: body
        });
        return response;
    }
}
exports.OsuAPI = OsuAPI;
