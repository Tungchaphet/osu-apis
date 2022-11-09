'use strict';
import { requestHandlers } from "./requests";
import { stringify } from 'qs'

enum RankStatusEnum {
    GRAVEYARD = -2,
    WIP = -1,
    PENDING = 0,
    RANKED = 1,
    APPROVED = 2,
    QUALIFIED = 3,
    LOVED = 4
}

type RankStatus = 'graveyard' | 'wip' | 'pending' | 'ranked' | 'approved' | 'qualified' | 'loved'
type Scope = 'chat.write' | 'delegate' | 'forum.write' | 'friends.read' | 'identify' | 'public'
type GameMode = 'osu' | 'taiko' | 'mania' | 'fruits'
type GameMods = 'EZ' | 'NF' | 'HT' | 'HR' | 'SD' | 'PF' | 'HD' | 'FL' | 'RL' | 'AP' | 'SO'
type MultiplayerScoresSort = 'score_asc' | 'score_desc'
type CommentSort = 'new' | 'old' | 'top'
type RankingType = 'charts' | 'country' | 'performance' | 'score'

type EventAll = {
    created_at: string
    id: number
    type: 'achievement' | 'beatmapPlaycount' | 'beatmapsetApprove' | 'beatmapsetDelete' | 'beatmapsetRevive' | 'beatmapsetUpdate' | 'beatmapsetUpload' | 'rank' | 'rankLost' | 'userSupportAgain' | 'userSupportFirst' | 'userSupportGift' | 'usernameChange'
}

type SearchResult<T extends UserCompact | WikiPage> = T extends UserCompact ? { user: { data: UserCompact[], total: number } } : { user: { data: WikiPage[], total: number } }
type MultiplayerScoresCursor = {
    score_id: number
    total_score: number
}

type BeatmapsetCompact = {
    artist: string
    artist_unicode: string
    covers: {
        cover: string
        "cover@2x": string
        card: string
        "card@2x": string
        list: string
        "list@2x": string
        slimcover: string
        "slimcover@2x": string
    }
    creator: string
    favourite_count: number
    id: number
    nsfw: boolean
    play_count: number
    preview_url: string
    source: string
    status: string
    title: string
    title_unicode: string
    user_id: number
    video: boolean
    beatmaps?: Beatmap[]
    converts?: boolean
    current_user_attributes?: CurrentUserAttributes.BeatmapsetDiscussionPermissions
    description?: string
    discussions?: BeatmapsetDiscussion[]
    events?: any
    genre?: string
    has_favourited: boolean
    language: string
    nominations: any
    ratings: string
    recent_favourites: any
    related_users: any
    user: UserCompact
}

interface Beatmapset extends BeatmapsetCompact {
    availability?: {
        download_disabled?: boolean
        more_information?: string
    }
    bpm: number
    can_be_hyped: boolean
    creator: string
    discussion_locked: boolean
    hype: {
        current: number
        required: number
    }
    is_scoreable: boolean
    last_updated: string
    legacy_thread_url?: string
    nominations: {
        current: number
        required: number
    }
    ranked?: RankStatusEnum
    ranked_date?: string
    source: string
    storyboard: boolean
    submitted_date?: string
    tags: string
    has_favourited: boolean
}

type BeatmapCompact = {
    beatmapset_id: number
    difficulty_rating: number
    id: number
    mode: GameMode
    status: RankStatus
    total_length: number
    user_id: number
    version: string
    beatmapset?: Beatmapset | BeatmapsetCompact | null
    checksum?: string
    failtimes?: {
        exit?: number[]
        fail?: number[]
    }
    max_combo?: number
}

interface Beatmap extends BeatmapCompact {
    accuracy: number
    ar: number
    cs: number
    beatmapset_id: number
    bpm?: number
    convert: boolean
    count_circles: number
    count_sliders: number
    count_spinners: number
    deleted_at?: string
    drain: number
    hit_length: number
    is_scoreable: boolean
    last_updated: string
    mode_int: number
    passcount: number
    playcount: number
    ranked: RankStatusEnum
    url: string
}

type BeatmapDifficultyAttributes = {
    max_combo: number
    star_rating: number
    aim_difficulty?: number
    approach_rate?: number
    flashlight_difficulty?: number
    overall_difficulty?: number
    slider_factor?: number
    speed_difficulty?: number
    stamina_difficulty?: number
    rhythm_difficulty?: number
    colour_difficulty?: number
    great_hit_window?: number
    score_multiplier?: number
}

type BeatmapPlaycount = {
    beatmap_id: number
    beatmap: BeatmapCompact
    beatmapset: BeatmapsetCompact
    count: number
}

type Score = {
    id: number
    best_id: number
    user_id: number
    accuracy: number
    mods: GameMods[]
    score: number
    max_combo: number
    perfect: boolean
    statistics: {
        count_50: number
        count_100: number
        count_300: number
        count_geki: number
        count_katu: number
        count_miss: number
    }
    passed: boolean
    rank: string
    pp: number
    created_at: string
    mode: GameMode
    mode_int: number
    reply: boolean
    beatmap?: BeatmapCompact
    beatmapset?: BeatmapsetCompact
    rank_country?: number
    rank_global?: number
    weight?: {
        percentage: number
        pp: number
    }
    user: UserCompact
    match: any
}

type BeatmapUserScore = {
    position: number
    score: Score
}

type BeatmapScores = {
    scores: Score[]
    userScore?: BeatmapUserScore
}

namespace CurrentUserAttributes {
    export interface BeatmapsetDiscussionPermissions {
        can_destroy: boolean
        can_reopen: boolean
        can_moderate_kudosu: boolean
        can_resolve: boolean
        vote_score: number
    }

    export interface ChatChannelUserAttributes {
        can_message: boolean
        can_message_error?: string
        last_read_id: number
    }
}

type BeatmapsetDiscussionPost = {
    beatmapset_discussion_id: number
    created_at: string
    deleted_at?: string
    deleted_by_id?: number
    id: number
    last_editor_id?: number
    message: string
    system: boolean
    updated_at: string
    user_id: number
}

type BeatmapsetDiscussion = {
    beatmap?: BeatmapCompact
    beatmap_id?: number
    beatmapset?: BeatmapsetCompact
    beatmapset_id?: number
    can_be_resolved: boolean
    can_grant_kudosu: boolean
    created_at: string
    current_user_attributes: CurrentUserAttributes.BeatmapsetDiscussionPermissions
    deleted_at?: string
    deleted_by_id?: number
    id: number
    kudosu_denied: boolean
    last_post_at: string
    message_type: 'hype' | 'mapper_note' | 'praise' | 'problem' | 'review' | 'suggestion'
    parent_id?: number
    posts?: BeatmapsetDiscussionPost[]
    resolved: boolean
    starting_post: BeatmapsetDiscussionPost
    timestamp?: number
    updated_at?: string
    user_id?: number
}

type BeatmapsetDiscussionVote = {
    beatmapset_discussion_id: number
    created_at: string
    id: number
    score: number
    updated_at: string
    user_id: number
}

type Build = {
    created_at: string
    display_version: string
    id: number
    update_stream: UpdateStream
    users: number
    version?: string
    changelog_entries?: ChangelogEntry[]
}

type UpdateStream = {
    display_name: string
    id: number
    is_featured: boolean
    name: string
    latest_build?: Build
    user_count?: number
}

type ChangelogEntry = {
    category: string
    created_at?: string
    github_pull_request_id?: number
    github_url?: string
    id?: number
    major: boolean
    repository?: string
    title?: string
    type: string
    url?: string
    github_user?: GithubUser
    message?: string
    message_html?: string
}

type GithubUser = {
    display_name: string
    github_url?: string
    id?: string
    osu_username?: string
    user_id?: number
    user_url?: string
}

type ChatChannel = {
    channel_id: number
    current_user_attributes?: CurrentUserAttributes.ChatChannelUserAttributes
    name: string
    description?: string
    icon: string
    type: 'PUBLIC' | 'PRIVATE' | 'MULTIPLAYER' | 'SPECTATOR' | 'PM' | 'GROUP'
    last_read_id?: number
    last_message_id?: number
    recent_messages?: ChatMessage[]
    moderated?: boolean
    users?: number[]
}

type ChatMessage = {
    message_id: number
    sender_id: number
    channel_id: number
    timestamp: string
    content: string
    is_action: number
    sender: UserCompact
    uuid?: string
}

type Comment = {
    commentable_id: number
    commentable_type: string
    created_at: string
    deleted_at?: string
    edited_at?: string
    edited_by_id?: number
    id: number
    legacy_name?: string
    message?: string
    message_html?: string
    parent_id?: number
    pinned: boolean
    replies_count: number
    updated_at: string
    user_id: number
    votes_count: number
}

type CommentBundle = {
    commentable_meta: CommentableMeta[]
    comments: Comment[]
    cursor?: object
    has_more?: number
    has_more_id?: number
    included_comments: Comment[]
    pinned_comments?: Comment[]
    sort: CommentSort
    top_level_count?: number
    total?: number
    user_follow: boolean
    user_votes: number[]
    users: UserCompact
}

type CommentableMeta = {
    id: number
    title: string
    type: string
    url: string
}

type UserGroup = {
    colour?: string
    has_listing: boolean
    has_playmodes: boolean
    id: number
    identifier: string
    is_probationary: boolean
    name: string
    short_name: string
    playmodes?: string[]
    description?: {
        html: string
        markdown: string
    }
}

type UserCompact = {
    avatar_url: string
    country_code: string
    default_group: string
    id: number
    is_active: boolean
    is_bot: boolean
    is_deleted: boolean
    is_online: boolean
    is_supporter: boolean
    last_visit?: string
    pm_friends_only: boolean
    profile_colour?: string
    username: string
    account_history?: ({
        description?: string
        id: number
        length: number
        permanent: boolean
        timestamp: string
        type: 'note' | 'restriction' | 'silence'
    })[]
    active_tournament_banner?: {
        awarded_at: string
        description: string
        image_url: string
        url: string
    }
    badges?: ({
        awarded_at: string
        description: string
        image_url: string
        url: string
    })[]
    beatmap_playcounts_count?: number
    blocks?: any
    country?: {
        code: string
        name: string
    }
    cover?: {
        custom_url: string
        url: string
        id?: number
    }
    favourite_beatmapset_count?: number
    follower_count?: number
    friends?: any
    graveyard_beatmapset_count?: number
    groups?: UserGroup[]
    is_restricted?: boolean
    loved_beatmapset_count?: number
    monthly_playcounts?: ({
        start_date: string
        count: number
    })[]
    page?: {
        html: string
        markdown: string
    }
    pending_beatmapset_count?: number
    previous_usernames?: string[]
    rank_highest?: {
        rank: number
        updated_at: string
    }
    rank_history?: {
        mode: GameMode
        data: number[]
    }
    ranked_beatmapset_count?: number
    replays_watched_counts?: ({
        start_date: string
        count: number
    })[]
    scores_best_count?: number
    scores_first_count?: number
    scores_recent_count?: number
    statistics?: UserStatistics
    support_level?: number
    unread_pm_count?: number
    user_achievements?: ({
        achieved_at: string
        achievement_id: number
    })[]
    user_preferences?: any
    statistics_rulesets?: any
}

interface User extends UserCompact {
    cover_url: string
    discord?: string
    has_supported: boolean
    interests?: string
    join_date: string
    kudosu: {
        available: number
        total: number
    }
    location: string
    max_blocks: number
    max_friends: number
    occupation?: string
    playmode: GameMode
    playstyle: ('mouse' | 'tablet' | 'keyboard' | 'touch')[]
    post_count: number
    profile_order: ('me'| 'recent_activity' | 'beatmaps' | 'historical' | 'kudosu' | 'top_ranks' | 'medals')[]
    title?: string
    title_url?: string
    twitter?: string
    website?: string
}

type UserStatistics = {
    grade_counts: {
        a: number
        s: number
        sh: number
        ss: number
        ssh: number
    }
    hit_accuracy: number
    is_ranked: boolean
    level: {
        current: number
        progress: number
    }
    maximum_combo: number
    play_count: number
    play_time: number
    pp: number
    global_rank?: number
    ranked_score: number
    replays_watched_by_others: number
    total_hits: number
    total_score: number
    user: UserCompact
}

type WikiPage = {
    available_locales: string[]
    layout: string
    locale: string
    markdown: string
    path: string
    subtitle: string
    tags: string[]
    title: string
}

type KudosuHistory = {
    id: number
    action: string
    amount: number
    model: string
    created_at: string
    giver?: {
        url: string
        username: string
    }
    post: {
        url?: string
        title: string
    }
}

type ForumPost = {
    created_at: string
    deleted_at?: string
    edited_at?: string
    edited_by_id?: string
    forum_id: number
    id: number
    topic_id: number
    user_id: number
    body?: {
        html: string
        raw: string
    }
}

type ForumTopic = {
    created_at: string
    deleted_at?: string
    first_post_id: number
    forum_id: number
    id: number
    is_locked: boolean
    last_post_id: number
    poll: {
        allow_vote_change: boolean
        ended_at?: string
        hide_incomplete_results: boolean
        last_vote_at?: string
        max_votes: number
        options: ({
            id: number
            text: {
                bbcode: string
                html: string
            }
            vote_count?: number
        })[]
    }
    post_count: number
    title: string
    type: 'normal' | 'sticky' | 'announcement'
    updated_at: string
    user_id: number
}

type Spotlight = {
    end_date: string
    id: number
    mode_specific: boolean
    participant_count?: number
    name: string
    start_date: string
    type: string
}

type Rankings = {
    beatmapsets?: Beatmapset[]
    cursor: object
    ranking: UserStatistics[]
    spotlight?: Spotlight
    total: number
}
/** Make requests to osu! OAuth2 API v2 */
class OsuAPI {
    clientID: number;
    clientSecret: string;
    redirectURI: string;
    /**
     * @arg {Object} options
     * @arg {Number} options.clientID The Client ID you received when you registered.
     * @arg {String} options.clientSecret The client secret of your application.
     * @arg {String} options.redirectURI The URL in your application where users will be sent after authorization.
     */
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
        if (!Array.isArray(scope)) throw new TypeError(`Type of scope parameter must be 'array' not '${typeof scope}'`)
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
            scope: scope.join(' ')
        }

        if (state) querys.state = state

        const encoded_string = stringify(querys)
        return `https://osu.ppy.sh/oauth/authorize?${encoded_string}`
    }

    async getOwnData(options: {
        accessToken: string
        mode?: GameMode
    }): Promise<User> {
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
    }): Promise<User> {
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
    }): Promise<Score[]> {
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

    getUserBeatmaps<T extends 'most_played' | 'pending' | 'ranked' | 'favourite' | 'graveyard' | 'loved'>(options: {
        accessToken: string
        user: number,
        type: T | 'pending' | 'ranked' | 'favourite' | 'graveyard' | 'loved'
        limit?: number
        offset?: string
    }): T extends 'most_played' ? Promise<BeatmapPlaycount[]> : Promise<Beatmapset[]>

    async getUserBeatmaps(options: {
        accessToken: string
        user: number,
        type: 'favourite' | 'graveyard' | 'loved' | 'most_played' | 'pending' | 'ranked'
        limit?: number
        offset?: string
    }): Promise<Beatmapset[] | BeatmapPlaycount[]> {
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

    async getUserRecentActivity(options: {
        accessToken: string
        id: number
        limit?: number
        offset?: string
    }) {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')

        const querys: {
            limit?: number
            offset?: string
        } = {}

        if (options.limit) querys.limit = options.limit
        if (options.offset) querys.offset = options.offset

        const response = await requestHandlers({
            method: 'GET',
            path: `/api/v2/users/${options.id}/recent_activity`,
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
    }): Promise<KudosuHistory[]> {
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
    }): Promise<{ users: UserCompact[] }> {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')
        
        const response = await requestHandlers({
            method: 'GET',
            path: '/api/v2/users',
            querys: { ids: options.ids },
            auth: options.accessToken
        })

        return response
    }

    async lookupBeatmap(options: {
        accessToken: string
        checksum?: string
        filename?: string
        id?: string
    }): Promise<Beatmap> {
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
    }): Promise<BeatmapUserScore> {
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
    }): Promise<{ scores: Score[] }> {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')
        
        const response = await requestHandlers({
            method: 'GET',
            path: `/api/v2/beatmaps/${options.beatmap}/scores/users/${options.user}/all`,
            querys: options.mode ? { mode: options.mode } : {},
            auth: options.accessToken
        })

        return response
    }

    async getBeatmap(options: {
        accessToken: string
        beatmap: number
    }): Promise<Beatmap> {
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
    }): Promise<{ beatmaps: BeatmapCompact[] }> {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')
        
        const response = await requestHandlers({
            method: 'GET',
            path: '/api/v2/beatmaps',
            querys: options.ids ? { ids: options.ids } : {},
            auth: options.accessToken
        })

        return response
    }

    async getBeatmapScores(options: {
        accessToken: string
        beatmap: number
        mode?: GameMode
        mods?: GameMods
        type?: RankingType
    }): Promise<BeatmapScores> {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')

        const querys: {
            mode?: GameMode
            mods?: GameMods
            type?: RankingType
        } = {}

        if (options.mode) querys.mode = options.mode
        if (options.mods) querys.mods = options.mods
        if (options.type) querys.type = options.type

        const response = await requestHandlers({
            method: 'GET',
            path: `/api/v2/beatmaps/${options.beatmap}/scores`,
            auth: options.accessToken,
            querys: querys
        })

        return response
    }

    async getBeatmapAttributes(options: {
        accessToken: string
        beatmap: number
        mods?: number | string[] | GameMods[]
        ruleset?: GameMode
        ruleset_id?: number
    }): Promise<{ attributes: BeatmapDifficultyAttributes }> {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')
        
        const body: {
            mods?: number | string[] | GameMods[]
            ruleset?: GameMode
            ruleset_id?: number
        } = {}

        const response = await requestHandlers({
            method: 'POST',
            path: `/api/v2/beatmaps/${options.beatmap}/attributes`,
            body: body,
            auth: options.accessToken
        })

        return response
    }

    async getBeatmapsetDiscussionPosts(options: {
        accessToken: string
        beatmapset_discussion_id?: string
        limit?: number
        page?: number
        sort?: 'id_desc' | 'id_asc'
        types?: ('first' | 'reply' | 'system')[]
        user?: string
    }): Promise<{
        beatmapsets: BeatmapsetCompact
        cursor_string?: string
        posts: BeatmapsetDiscussionPost
        users: UserCompact
    }> {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')

        const querys: {
            beatmapset_discussion_id?: string
            limit?: number
            page?: number
            sort?: string
            types?: string[]
            user?: string
        } = {}

        if (options.beatmapset_discussion_id) querys.beatmapset_discussion_id = options.beatmapset_discussion_id
        if (options.limit) querys.limit = options.limit
        if (options.page) querys.page = options.page
        if (options.sort) querys.sort = options.sort
        if (options.user) querys.user = options.user
        if (options.types) querys.types = options.types

        const response = await requestHandlers({
            method: 'GET',
            path: '/api/v2/beatmapsets/discussions/posts',
            querys: querys,
            auth: options.accessToken
        })

        return response
    }

    async getBeatmapDiscussionVotes(options: {
        accessToken: string
        beatmapset_discussion_id?: string
        limit?: number
        page?: number
        receiver?: number
        score?: '1' | '-1'
        sort?: 'id_desc' | 'id_asc'
        user?: string
    }): Promise<{
        cursor_string?: string
        discussions: BeatmapsetDiscussion
        users: UserCompact
        votes: BeatmapsetDiscussionVote[]
    }> {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')
        const querys: {
            beatmapset_discussion_id?: string
            limit?: number
            page?: number
            receiver?: number
            score?: string
            sort?: string
            user?: string
        } = {}

        if (options.beatmapset_discussion_id) querys.beatmapset_discussion_id = options.beatmapset_discussion_id
        if (options.limit) querys.limit = options.limit
        if (options.page) querys.page = options.page
        if (options.sort) querys.sort = options.sort
        if (options.user) querys.user = options.user
        if (options.receiver) querys.receiver = options.receiver

        const response = await requestHandlers({
            method: 'GET',
            path: '/api/v2/beatmapsets/discussions/votes',
            querys: querys,
            auth: options.accessToken
        })

        return response
    }

    async getBeatmapsetDiscussions(options: {
        accessToken: string
        beatmap_id?: string
        beatmapset_id?: string
        beatmapset_status?: 'all' | 'ranked' | 'qualified' | 'disqualified' | 'never_qualified'
        limit?: number
        message_types?: ('suggestion' | 'problem' | 'mapper_note' | 'praise' | 'hype' | 'review')[]
        only_unresolved?: boolean
        page?: number
        sort?: 'id_desc' | 'id_asc'
        id?: string
    }): Promise<{
        beatmaps: Beatmap[]
        cursor_string?: string
        discussions: BeatmapsetDiscussion[]
        included_discussions: BeatmapsetDiscussion[]
        reviews_config: {
            max_blocks: number
        }
        users: UserCompact[]
    }> {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')

        const querys: {
            beatmap_id?: string
            beatmapset_id?: string
            beatmapset_status?: string
            limit?: number
            message_types?: string[]
            only_unresolved?: boolean
            page?: number
            sort?: string
            id?: string
        } = {}

        if (options.beatmap_id) querys.beatmap_id = options.beatmap_id
        if (options.beatmapset_id) querys.beatmapset_id = options.beatmapset_id
        if (options.beatmapset_status) querys.beatmapset_status = options.beatmapset_status
        if (options.limit) querys.limit = options.limit
        if (options.message_types) querys.message_types = options.message_types
        if (options.only_unresolved) querys.only_unresolved = options.only_unresolved
        if (options.page) querys.page = options.page
        if (options.sort) querys.sort = options.sort
        if (options.id) querys.id = options.id

        const response = await requestHandlers({
            method: 'GET',
            path: '/api/v2/beatmapsets/discussions',
            querys: querys,
            auth: options.accessToken
        })

        return response
    }

    async getChangelogBuild(options: {
        stream: string
        build: string
    }): Promise<Build> {
        const response = await requestHandlers({
            method: 'GET',
            path: `/api/v2/changelog/${options.stream}/${options.build}`
        })

        return response
    }

    async getChangelogListing(options: {
        form?: string
        max_id?: number
        stream?: string
        to?: string
        message_formats?: 'html' | 'markdown'
    }): Promise<{
        builds: Build[]
        search: {
            form?: string
            limit: number
            max_id?: number
            stream?: string
            to?: string
        }
        streams: UpdateStream[]
    }> {
        const querys: {
            form?: string
            max_id?: number
            stream?: string
            to?: string
            message_formats?: string[]
        } = {}

        if (options.form) querys.form = options.form
        if (options.max_id) querys.max_id = options.max_id
        if (options.stream) querys.stream = options.stream
        if (options.to) querys.to = options.to
        if (options.message_formats) querys.message_formats = [options.message_formats]

        const response = await requestHandlers({
            method: 'GET',
            path: '/api/v2/changelog',
            querys: querys
        })

        return response
    }

    async lookupChangelogBuild(options: {
        changelog: string
        key?: string
        message_formats?: 'html' | 'markdown'
    }): Promise<Build> {
        const querys: {
            key?: string
            message_formats?: string[]
        } = {}

        if (options.key) querys.key = options.key
        if (options.message_formats) querys.message_formats = [options.message_formats]

        const response = await requestHandlers({
            method: 'GET',
            path: `/api/v2/changelog/${options.changelog}`,
            querys: querys
        })

        return response
    }

    async getOwnFriends(accessToken: string): Promise<User[]> {
        if (!accessToken) throw new Error('Missing `access_token` to request.')

        const response = await requestHandlers({
            method: 'GET',
            path: '/api/v2/friends',
            auth: accessToken
        })

        return response
    }

    async getSeasonalBackgrounds(): Promise<{
        ends_at: string
        backgrounds: ({
            url: string
            user: UserCompact
        })[]
    }> {
        const response = await requestHandlers({
            method: 'GET',
            path: '/api/v2/seasonal-backgrounds'
        })

        return response
    }

    async getWikiPage(options: {
        locale: string
        path: string
    }): Promise<WikiPage> {
        const response = await requestHandlers({
            method: 'GET',
            path: `/api/v2/wiki/${options.locale}/${options.path}`
        })

        return response
    }

    search<T extends 'all' | 'user' | 'wiki_page'>(options: {
        accessToken: string
        mode?: T
        query?: string
        page?: number
    }): T extends 'user' ? Promise<SearchResult<UserCompact>> : (T extends 'wiki_page' ? Promise<SearchResult<WikiPage>> : Promise<SearchResult<UserCompact & WikiPage>>)

    async search(options: {
        accessToken: string
        mode?: 'all' | 'user' | 'wiki_page'
        query?: string
        page?: number
    }): Promise<SearchResult<UserCompact> | SearchResult<WikiPage>> {
        const querys: {
            mode?: string
            query?: string
            page?: number
        } = {}

        if (options.mode) querys.mode = options.mode
        if (options.query) querys.query = options.query
        if (options.page) querys.page = options.page

        const response = await requestHandlers({
            method: 'GET',
            path: '/api/v2/search',
            querys: querys,
            auth: options.accessToken
        })

        return response
    }

    async getScores(options: {
        accessToken: string
        room: number
        playlist: number
        limit?: number
        sort?: MultiplayerScoresSort
        cursor?: MultiplayerScoresCursor
    }) {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')

        const querys: {
            limit?: number
            sort?: string
            cursor?: object
        } = {}

        if (options.limit) querys.limit = options.limit
        if (options.sort) querys.sort = options.sort
        if (options.cursor) querys.cursor = options.cursor

        const response = await requestHandlers({
            method: 'GET',
            path: `/api/v2/rooms/${options.room}/playlist/${options.playlist}/scores`,
            querys: querys,
            auth: options.accessToken
        })

        return response
    }

    async getComments(options: {
        commentable_type?: string
        commentable_id?: string
        cursor?: object
        parent_id?: string
        sort?: string
    }): Promise<CommentBundle> {
        const querys: {
            commentable_type?: string
            commentable_id?: string
            cursor?: object
            parent_id?: string
            sort?: string
        } = {}

        if (options.commentable_type) querys.commentable_type = options.commentable_type
        if (options.commentable_id) querys.commentable_id = options.commentable_id
        if (options.cursor) querys.cursor = options.cursor
        if (options.parent_id) querys.parent_id = options.parent_id
        if (options.sort) querys.sort = options.sort
        
        const response = await requestHandlers({
            method: 'GET',
            path: '/api/v2/comments',
            querys: querys
        })

        return response
    }

    async getComment(comment: string): Promise<CommentBundle> {
        const response = await requestHandlers({
            method: 'GET',
            path: `/api/v2/comments/${comment}`
        })

        return response
    }

    async replyTopic(options: {
        accessToken: string
        topic: number
        body: string
    }): Promise<ForumPost> {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')
        if (!options.body || !options.topic) throw new Error('Missing `topic` or `body` of the parameters.')

        const response = await requestHandlers({
            method: 'POST',
            path: `/api/v2/forums/topics/${options.topic}/reply`,
            auth: options.accessToken,
            body: {
                body: options.body
            }
        })

        return response
    }

    async createTopic(accessToken: string, options: {
        body: string
        forum_id: number
        title: string
        with_poll?: boolean
        forum_topic_poll: {
            hide_results?: boolean
            length_days?: number
            max_options?: number
            options: string
            title: string
            vote_change: boolean
        }
    }): Promise<{ topic: ForumTopic, post: ForumPost}> {
        if (!accessToken) throw new Error('Missing `access_token` to request.')
        
        const response = await requestHandlers({
            method: 'POST',
            path: `/api/v2/forums/topics`,
            body: options,
            auth: accessToken
        })

        return response
    }

    async getTopicAndPosts(options: {
        accessToken: string
        topic: number
        cursor?: object
        sort?: 'id_asc' | 'id_desc',
        limit?: number
        start?: string
        end?: string
    }): Promise<{
        cursor_string: string
        posts: ForumPost[]
        search: any
        topic: ForumTopic
    }> {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')
        
        const querys: {
            cursor_string?: string
            sort?: string
            limit?: number
            start?: string
            end?: string
        } = {}

        if (options.cursor) querys.cursor_string = Buffer.from(JSON.stringify(options.cursor), 'base64').toString()
        if (options.start) querys.start = options.start
        if (options.end) querys.end = options.end
        if (options.sort) querys.sort = options.sort
        if (options.limit) querys.limit = options.limit

        const response = await requestHandlers({
            method: 'GET',
            path: `/api/v2/forums/topics/${options.topic}`,
            auth: options.accessToken,
            querys: querys
        })

        return response
    }

    async editTopic(options: {
        accessToken: string
        topic: number
        forum_topic?: {
            topic_title: string
        }
    }): Promise<ForumTopic> {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')

        const response = await requestHandlers({
            method: 'PUT',
            path: `/api/v2/forums/topics/${options.topic}`,
            auth: options.accessToken,
            body: {
                "forum_topic[topic_title]": options.forum_topic?.topic_title
            }
        })

        return response
    }

    async editPost(options: {
        accessToken: string
        post: number
        body: string
    }): Promise<ForumPost> {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')

        const response = await requestHandlers({
            method: 'PUT',
            path: `/api/v2/forums/posts/${options.post}`,
            auth: options.accessToken,
            body: {
                body: options.body
            }
        })

        return response
    }

    async getRanking(options: {
        accessToken: string
        mode: GameMode
        type: RankingType
        country?: number
        cursor?: object
        filter?: 'all' | 'friends'
        spotlight?: string
        variant?: '4K' | '7K'
    }): Promise<Rankings> {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')
        
        const querys: {
            country?: number
            cursor?: object
            filter?: string
            spotlight?: string
            variant?: string
        } = {}

        if (options.country) querys.country = options.country
        if (options.cursor) querys.cursor = options.cursor
        if (options.filter) querys.filter = options.filter
        if (options.spotlight) querys.spotlight = options.spotlight
        if (options.variant) querys.variant = options.variant

        const response = await requestHandlers({
            method: 'GET',
            path: `/api/v2/rankings/${options.mode}/${options.type}`,
            querys: querys,
            auth: options.accessToken
        })

        return response
    }

    async getSpotlights(accessToken: string): Promise<{ spotlights: Spotlight[] }> {
        if (!accessToken) throw new Error('Missing `access_token` to request.')

        const response = await requestHandlers({
            method: 'GET',
            path: '/api/v2/spotlights',
            auth: accessToken
        })

        return response
    }

    async createNewPM(options: {
        accessToken: string
        target_id: number
        message: string
        is_action: boolean
        uuid?: string
    }): Promise<{
        new_channel_id: number
        presence: ChatChannel[]
        message: ChatMessage
    }> {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')

        const body: {
            target_id: number
            message: string
            is_action: boolean
            uuid?: string
        } = {
            target_id: options.target_id,
            message: options.message,
            is_action: options.is_action
        }

        if (options.uuid) body.uuid = options.uuid

        const response = await requestHandlers({
            method: 'POST',
            path: '/api/v2/chat/new',
            body: body,
            auth: options.accessToken
        })

        return response
    }

    async createChannel(options: {
        accessToken: string
        type: 'PM' | 'ANNOUNCE'
        channel?: {
            name?: string
            description?: string
        }
        message?: string
        target_id?: number
        target_ids?: number[]
    }): Promise<ChatChannel> {
        if (!options.accessToken) throw new Error('Missing `access_token` to request.')

        const body: {
            type: string
            channel?: object
            message?: string
            target_id?: number
            target_ids?: number[]
        } = {
            type: options.type
        }

        if (options.channel) body.channel = options.channel
        if (options.message) body.message = options.message
        if (options.target_id) body.target_id = options.target_id
        if (options.target_ids) body.target_ids = options.target_ids

        const response = await requestHandlers({
            method: 'POST',
            path: '/api/v2/chat/channels',
            auth: options.accessToken,
            body: body
        })

        return response
    }
}

export { OsuAPI, RankStatusEnum }