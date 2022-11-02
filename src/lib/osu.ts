'use strict';
import { requestHandlers } from "./requests";
import { stringify } from 'qs'

type Scope = 'chat.write' | 'delegate' | 'forum.write' | 'friends.read' | 'identify' | 'public'
type GameMode = 'osu' | 'taiko' | 'mania' | 'fruits'
type GameMods = 'EZ' | 'NF' | 'HT' | 'HR' | 'SD' | 'PF' | 'HD' | 'FL' | 'RL' | 'AP' | 'SO'

class OsuAPI {
    clientID: number;
    clientSecret: string;
    redirectURI: string;
    constructor(options: {
        clientID: number;
        clientSecret: string;
        redirectURI: string;
    }) {
        this.clientID = options.clientID
        this.clientSecret = options.clientSecret
        this.redirectURI = options.redirectURI
    }

    async tokenRequest(options: {
        grantType: 'authorization_code' | 'client_credentials' | 'refresh_token'
        code?: string
        accessToken?: string
        refreshToken?: string
    }): Promise<{
        access_token: string
        refresh_token?: string
        token_type: string
        expires_in: number
    }> {
        const requestObject: {
            client_id: number
            client_secret: string
            grant_type: string
            code?: string
            scope?: 'public'
            access_token?: string
            redirect_uri?: string
            refresh_token?: string
        } = {
            client_id: this.clientID,
            client_secret: this.clientSecret,
            grant_type: options.grantType,
        }
        switch(options.grantType) {
            case'authorization_code':
                requestObject.code = options.code
                requestObject.redirect_uri = this.redirectURI
                break
            case'client_credentials':
                requestObject.scope = 'public'
                break
            case'refresh_token':
                requestObject.access_token = options.accessToken
                requestObject.refresh_token = options.refreshToken
                break
            default:
                throw new Error(`Grant type must be 'authorization_code', 'client_credentials' or 'refresh_token'`)
        }

        const response = await requestHandlers({
            path: '/oauth/token',
            method: 'POST',
            body: requestObject
        })

        return response
    }

    async revokeToken(accessToken: string): Promise<boolean> {
        if (!accessToken) throw new Error('Missing `access_token` to request.')
        const isSuccess = await requestHandlers({
            path: '/api/v2/oauth/tokens/current',
            method: 'DELETE',
            auth: accessToken
        }).then(() => true).catch(() => false)

        return isSuccess
    }

    generateAuthURL(scope: Scope[], state?: string) {
        const querys: {
            client_id: number
            redirect_uri: string
            response_type: string
            scope: string
            state?: string
        } = {
            client_id: this.clientID,
            redirect_uri: this.redirectURI,
            response_type: 'code',
            scope: scope.join(' '),
            state: state || Math.random().toString(36).substring(2)
        }
        const encoded_string = stringify(querys)
        return `https://osu.ppy.sh/oauth/authorize?${encoded_string}`
    }

    async getOwnData(options: {
        accessToken: string
        mode?: GameMode
    }) {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')
        const response = await requestHandlers({
            path: `/api/v2/me/${options.mode || ''}`,
            method: 'GET',
            auth: options.accessToken
        })

        return response
    }

    async getUser(options: {
        accessToken: string
        user: string | number
        mode?: GameMode
        key?: string
    }) {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')
        const response = await requestHandlers({
            method: 'GET',
            path: `/api/v2/users/${options.user}/${options.mode || ''}`,
            querys: options.key ? { key: options.key } : undefined,
            auth: options.accessToken
        })

        return response
    }

    async getUserScores(options: {
        id: number
        type: 'best' | 'firsts' | 'recent'
        accessToken: string
        include_fails?: boolean
        mode?: GameMode
        limit?: number
        offset?: string
    }) {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')
        const querys: {
            mode?: string
            limit?: number
            offset?: string
            include_fails: number
        } = {
            include_fails: options.include_fails ? 1 : 0
        }

        if (options.mode) querys.mode = options.mode
        if (options.limit) querys.limit = options.limit
        if (options.offset) querys.offset = options.offset

        const response = await requestHandlers({
            method: 'GET',
            path: `/api/v2/users/${options.id}/scores/${options.type}`,
            auth: options.accessToken,
            querys: querys
        })

        return response
    }

    async getUserBeatmaps(options: {
        accessToken: string
        user: number,
        type: 'favourite' | 'graveyard' | 'loved' | 'most_played' | 'pending' | 'ranked'
        limit?: number
        offset?: string
    }) {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')
        const querys: { limit?: number, offset?: string } = {}
        if (options.limit) querys.limit = options.limit
        if (options.offset) querys.offset = options.offset

        const response = await requestHandlers({
            method: 'GET',
            path: `/api/v2/users/${options.user}/beatmapsets/${options.type}`,
            querys: querys,
            auth: options.accessToken
        })

        return response
    }

    async getUserKudosu(options: {
        user: number
        accessToken: string
        limit?: number
        offset?: string
    }) {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')
        const querys: { limit?: number, offset?: string } = {}
        if (options.limit) querys.limit = options.limit
        if (options.offset) querys.offset = options.offset

        const response = await requestHandlers({
            method: 'GET',
            path: `/api/v2/users/${options.user}/kudosu`,
            auth: options.accessToken,
            querys: querys
        })

        return response
    }

    async getUsers(options: {
        accessToken: string
        ids?: string[]
    }): Promise<{ users: any[] }> {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')
        
        const response = await requestHandlers({
            method: 'GET',
            path: '/api/v2/users',
            querys: { ids: options.ids }
        })

        return response
    }

    async lookupBeatmap(options: {
        accessToken: string
        checksum?: string
        filename?: string
        id?: string
    }) {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')
        
        const querys: {
            checksum?: string
            filename?: string
            id?: string
        } = {}

        if (options.checksum) querys.checksum = options.checksum
        if (options.filename) querys.filename = options.filename
        if (options.id) querys.id = options.id

        const response = await requestHandlers({
            method: 'GET',
            path: `/api/v2/beatmaps/lookup`,
            querys: querys,
            auth: options.accessToken
        })

        return response
    }

    async getUserBeatmapScore(options: {
        accessToken: string
        beatmap: number
        user: number
        mode?: GameMode
        mods?: GameMods[]
    }) {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')
        
        const querys: {
            mode?: GameMode
            mods?: GameMods[]
        } = {}

        if (options.mode) querys.mode = options.mode
        if (options.mods) querys.mods = options.mods

        const response = await requestHandlers({
            method: 'GET',
            path: `/api/v2/beatmaps/${options.beatmap}/scores/users/${options.user}`,
            querys: querys,
            auth: options.accessToken
        })

        return response
    }

    async getUserBeatmapScores(options: {
        accessToken: string
        beatmap: number
        user: number
        mode?: GameMode
    }): Promise<{ scores: any[] }> {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')
        
        const response = await requestHandlers({
            method: 'GET',
            path: `/api/v2/beatmaps/${options.beatmap}/scores/users/${options.user}/all`,
            querys: options.mode ? { mode: options.mode } : {}
        })

        return response
    }

    async getBeatmap(options: {
        accessToken: string
        beatmap: number
    }) {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')

        const response = await requestHandlers({
            method: 'GET',
            path: `/api/v2/beatmaps/${options.beatmap}`,
            auth: options.accessToken
        })

        return response
    }

    async getBeatmaps(options: {
        accessToken: string
        ids?: string[]
    }): Promise<{ beatmaps: any[] }> {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')
        
        const response = await requestHandlers({
            method: 'GET',
            path: '/api/v2/beatmaps',
            querys: options.ids ? { ids: options.ids } : {}
        })

        return response
    }
}

export { OsuAPI }