declare type Scope = 'chat.write' | 'delegate' | 'forum.write' | 'friends.read' | 'identify' | 'public';
declare type GameMode = 'osu' | 'taiko' | 'mania' | 'fruits';
declare type GameMods = 'EZ' | 'NF' | 'HT' | 'HR' | 'SD' | 'PF' | 'HD' | 'FL' | 'RL' | 'AP' | 'SO';
declare class OsuAPI {
    clientID: number;
    clientSecret: string;
    redirectURI: string;
    constructor(options: {
        clientID: number;
        clientSecret: string;
        redirectURI: string;
    });
    tokenRequest(options: {
        grantType: 'authorization_code' | 'client_credentials' | 'refresh_token';
        code?: string;
        accessToken?: string;
        refreshToken?: string;
    }): Promise<{
        access_token: string;
        refresh_token?: string;
        token_type: string;
        expires_in: number;
    }>;
    revokeToken(accessToken: string): Promise<boolean>;
    generateAuthURL(scope: Scope[], state?: string): string;
    getOwnData(options: {
        accessToken: string;
        mode?: GameMode;
    }): Promise<any>;
    getUser(options: {
        accessToken: string;
        user: string | number;
        mode?: GameMode;
        key?: string;
    }): Promise<any>;
    getUserScores(options: {
        id: number;
        type: 'best' | 'firsts' | 'recent';
        accessToken: string;
        include_fails?: boolean;
        mode?: GameMode;
        limit?: number;
        offset?: string;
    }): Promise<any>;
    getUserBeatmaps(options: {
        accessToken: string;
        user: number;
        type: 'favourite' | 'graveyard' | 'loved' | 'most_played' | 'pending' | 'ranked';
        limit?: number;
        offset?: string;
    }): Promise<any>;
    getUserKudosu(options: {
        user: number;
        accessToken: string;
        limit?: number;
        offset?: string;
    }): Promise<any>;
    getUsers(options: {
        accessToken: string;
        ids?: string[];
    }): Promise<{
        users: any[];
    }>;
    lookupBeatmap(options: {
        accessToken: string;
        checksum?: string;
        filename?: string;
        id?: string;
    }): Promise<any>;
    getUserBeatmapScore(options: {
        accessToken: string;
        beatmap: number;
        user: number;
        mode?: GameMode;
        mods?: GameMods[];
    }): Promise<any>;
    getUserBeatmapScores(options: {
        accessToken: string;
        beatmap: number;
        user: number;
        mode?: GameMode;
    }): Promise<{
        scores: any[];
    }>;
    getBeatmap(options: {
        accessToken: string;
        beatmap: number;
    }): Promise<any>;
    getBeatmaps(options: {
        accessToken: string;
        ids?: string[];
    }): Promise<{
        beatmaps: any[];
    }>;
}
export { OsuAPI };
