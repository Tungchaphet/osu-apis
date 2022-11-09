declare enum RankStatusEnum {
    GRAVEYARD = -2,
    WIP = -1,
    PENDING = 0,
    RANKED = 1,
    APPROVED = 2,
    QUALIFIED = 3,
    LOVED = 4
}
declare type RankStatus = 'graveyard' | 'wip' | 'pending' | 'ranked' | 'approved' | 'qualified' | 'loved';
declare type Scope = 'chat.write' | 'delegate' | 'forum.write' | 'friends.read' | 'identify' | 'public';
declare type GameMode = 'osu' | 'taiko' | 'mania' | 'fruits';
declare type GameMods = 'EZ' | 'NF' | 'HT' | 'HR' | 'SD' | 'PF' | 'HD' | 'FL' | 'RL' | 'AP' | 'SO';
declare type MultiplayerScoresSort = 'score_asc' | 'score_desc';
declare type CommentSort = 'new' | 'old' | 'top';
declare type RankingType = 'charts' | 'country' | 'performance' | 'score';
declare type SearchResult<T extends UserCompact | WikiPage> = T extends UserCompact ? {
    user: {
        data: UserCompact[];
        total: number;
    };
} : {
    user: {
        data: WikiPage[];
        total: number;
    };
};
declare type MultiplayerScoresCursor = {
    score_id: number;
    total_score: number;
};
declare type BeatmapsetCompact = {
    artist: string;
    artist_unicode: string;
    covers: {
        cover: string;
        "cover@2x": string;
        card: string;
        "card@2x": string;
        list: string;
        "list@2x": string;
        slimcover: string;
        "slimcover@2x": string;
    };
    creator: string;
    favourite_count: number;
    id: number;
    nsfw: boolean;
    play_count: number;
    preview_url: string;
    source: string;
    status: string;
    title: string;
    title_unicode: string;
    user_id: number;
    video: boolean;
    beatmaps?: Beatmap[];
    converts?: boolean;
    current_user_attributes?: CurrentUserAttributes.BeatmapsetDiscussionPermissions;
    description?: string;
    discussions?: BeatmapsetDiscussion[];
    events?: any;
    genre?: string;
    has_favourited: boolean;
    language: string;
    nominations: any;
    ratings: string;
    recent_favourites: any;
    related_users: any;
    user: UserCompact;
};
interface Beatmapset extends BeatmapsetCompact {
    availability?: {
        download_disabled?: boolean;
        more_information?: string;
    };
    bpm: number;
    can_be_hyped: boolean;
    creator: string;
    discussion_locked: boolean;
    hype: {
        current: number;
        required: number;
    };
    is_scoreable: boolean;
    last_updated: string;
    legacy_thread_url?: string;
    nominations: {
        current: number;
        required: number;
    };
    ranked?: RankStatusEnum;
    ranked_date?: string;
    source: string;
    storyboard: boolean;
    submitted_date?: string;
    tags: string;
    has_favourited: boolean;
}
declare type BeatmapCompact = {
    beatmapset_id: number;
    difficulty_rating: number;
    id: number;
    mode: GameMode;
    status: RankStatus;
    total_length: number;
    user_id: number;
    version: string;
    beatmapset?: Beatmapset | BeatmapsetCompact | null;
    checksum?: string;
    failtimes?: {
        exit?: number[];
        fail?: number[];
    };
    max_combo?: number;
};
interface Beatmap extends BeatmapCompact {
    accuracy: number;
    ar: number;
    cs: number;
    beatmapset_id: number;
    bpm?: number;
    convert: boolean;
    count_circles: number;
    count_sliders: number;
    count_spinners: number;
    deleted_at?: string;
    drain: number;
    hit_length: number;
    is_scoreable: boolean;
    last_updated: string;
    mode_int: number;
    passcount: number;
    playcount: number;
    ranked: RankStatusEnum;
    url: string;
}
declare type BeatmapDifficultyAttributes = {
    max_combo: number;
    star_rating: number;
    aim_difficulty?: number;
    approach_rate?: number;
    flashlight_difficulty?: number;
    overall_difficulty?: number;
    slider_factor?: number;
    speed_difficulty?: number;
    stamina_difficulty?: number;
    rhythm_difficulty?: number;
    colour_difficulty?: number;
    great_hit_window?: number;
    score_multiplier?: number;
};
declare type BeatmapPlaycount = {
    beatmap_id: number;
    beatmap: BeatmapCompact;
    beatmapset: BeatmapsetCompact;
    count: number;
};
declare type Score = {
    id: number;
    best_id: number;
    user_id: number;
    accuracy: number;
    mods: GameMods[];
    score: number;
    max_combo: number;
    perfect: boolean;
    statistics: {
        count_50: number;
        count_100: number;
        count_300: number;
        count_geki: number;
        count_katu: number;
        count_miss: number;
    };
    passed: boolean;
    rank: string;
    pp: number;
    created_at: string;
    mode: GameMode;
    mode_int: number;
    reply: boolean;
    beatmap?: BeatmapCompact;
    beatmapset?: BeatmapsetCompact;
    rank_country?: number;
    rank_global?: number;
    weight?: {
        percentage: number;
        pp: number;
    };
    user: UserCompact;
    match: any;
};
declare type BeatmapUserScore = {
    position: number;
    score: Score;
};
declare type BeatmapScores = {
    scores: Score[];
    userScore?: BeatmapUserScore;
};
declare namespace CurrentUserAttributes {
    interface BeatmapsetDiscussionPermissions {
        can_destroy: boolean;
        can_reopen: boolean;
        can_moderate_kudosu: boolean;
        can_resolve: boolean;
        vote_score: number;
    }
    interface ChatChannelUserAttributes {
        can_message: boolean;
        can_message_error?: string;
        last_read_id: number;
    }
}
declare type BeatmapsetDiscussionPost = {
    beatmapset_discussion_id: number;
    created_at: string;
    deleted_at?: string;
    deleted_by_id?: number;
    id: number;
    last_editor_id?: number;
    message: string;
    system: boolean;
    updated_at: string;
    user_id: number;
};
declare type BeatmapsetDiscussion = {
    beatmap?: BeatmapCompact;
    beatmap_id?: number;
    beatmapset?: BeatmapsetCompact;
    beatmapset_id?: number;
    can_be_resolved: boolean;
    can_grant_kudosu: boolean;
    created_at: string;
    current_user_attributes: CurrentUserAttributes.BeatmapsetDiscussionPermissions;
    deleted_at?: string;
    deleted_by_id?: number;
    id: number;
    kudosu_denied: boolean;
    last_post_at: string;
    message_type: 'hype' | 'mapper_note' | 'praise' | 'problem' | 'review' | 'suggestion';
    parent_id?: number;
    posts?: BeatmapsetDiscussionPost[];
    resolved: boolean;
    starting_post: BeatmapsetDiscussionPost;
    timestamp?: number;
    updated_at?: string;
    user_id?: number;
};
declare type BeatmapsetDiscussionVote = {
    beatmapset_discussion_id: number;
    created_at: string;
    id: number;
    score: number;
    updated_at: string;
    user_id: number;
};
declare type Build = {
    created_at: string;
    display_version: string;
    id: number;
    update_stream: UpdateStream;
    users: number;
    version?: string;
    changelog_entries?: ChangelogEntry[];
};
declare type UpdateStream = {
    display_name: string;
    id: number;
    is_featured: boolean;
    name: string;
    latest_build?: Build;
    user_count?: number;
};
declare type ChangelogEntry = {
    category: string;
    created_at?: string;
    github_pull_request_id?: number;
    github_url?: string;
    id?: number;
    major: boolean;
    repository?: string;
    title?: string;
    type: string;
    url?: string;
    github_user?: GithubUser;
    message?: string;
    message_html?: string;
};
declare type GithubUser = {
    display_name: string;
    github_url?: string;
    id?: string;
    osu_username?: string;
    user_id?: number;
    user_url?: string;
};
declare type ChatChannel = {
    channel_id: number;
    current_user_attributes?: CurrentUserAttributes.ChatChannelUserAttributes;
    name: string;
    description?: string;
    icon: string;
    type: 'PUBLIC' | 'PRIVATE' | 'MULTIPLAYER' | 'SPECTATOR' | 'PM' | 'GROUP';
    last_read_id?: number;
    last_message_id?: number;
    recent_messages?: ChatMessage[];
    moderated?: boolean;
    users?: number[];
};
declare type ChatMessage = {
    message_id: number;
    sender_id: number;
    channel_id: number;
    timestamp: string;
    content: string;
    is_action: number;
    sender: UserCompact;
    uuid?: string;
};
declare type Comment = {
    commentable_id: number;
    commentable_type: string;
    created_at: string;
    deleted_at?: string;
    edited_at?: string;
    edited_by_id?: number;
    id: number;
    legacy_name?: string;
    message?: string;
    message_html?: string;
    parent_id?: number;
    pinned: boolean;
    replies_count: number;
    updated_at: string;
    user_id: number;
    votes_count: number;
};
declare type CommentBundle = {
    commentable_meta: CommentableMeta[];
    comments: Comment[];
    cursor?: object;
    has_more?: number;
    has_more_id?: number;
    included_comments: Comment[];
    pinned_comments?: Comment[];
    sort: CommentSort;
    top_level_count?: number;
    total?: number;
    user_follow: boolean;
    user_votes: number[];
    users: UserCompact;
};
declare type CommentableMeta = {
    id: number;
    title: string;
    type: string;
    url: string;
};
declare type UserGroup = {
    colour?: string;
    has_listing: boolean;
    has_playmodes: boolean;
    id: number;
    identifier: string;
    is_probationary: boolean;
    name: string;
    short_name: string;
    playmodes?: string[];
    description?: {
        html: string;
        markdown: string;
    };
};
declare type UserCompact = {
    avatar_url: string;
    country_code: string;
    default_group: string;
    id: number;
    is_active: boolean;
    is_bot: boolean;
    is_deleted: boolean;
    is_online: boolean;
    is_supporter: boolean;
    last_visit?: string;
    pm_friends_only: boolean;
    profile_colour?: string;
    username: string;
    account_history?: ({
        description?: string;
        id: number;
        length: number;
        permanent: boolean;
        timestamp: string;
        type: 'note' | 'restriction' | 'silence';
    })[];
    active_tournament_banner?: {
        awarded_at: string;
        description: string;
        image_url: string;
        url: string;
    };
    badges?: ({
        awarded_at: string;
        description: string;
        image_url: string;
        url: string;
    })[];
    beatmap_playcounts_count?: number;
    blocks?: any;
    country?: {
        code: string;
        name: string;
    };
    cover?: {
        custom_url: string;
        url: string;
        id?: number;
    };
    favourite_beatmapset_count?: number;
    follower_count?: number;
    friends?: any;
    graveyard_beatmapset_count?: number;
    groups?: UserGroup[];
    is_restricted?: boolean;
    loved_beatmapset_count?: number;
    monthly_playcounts?: ({
        start_date: string;
        count: number;
    })[];
    page?: {
        html: string;
        markdown: string;
    };
    pending_beatmapset_count?: number;
    previous_usernames?: string[];
    rank_highest?: {
        rank: number;
        updated_at: string;
    };
    rank_history?: {
        mode: GameMode;
        data: number[];
    };
    ranked_beatmapset_count?: number;
    replays_watched_counts?: ({
        start_date: string;
        count: number;
    })[];
    scores_best_count?: number;
    scores_first_count?: number;
    scores_recent_count?: number;
    statistics?: UserStatistics;
    support_level?: number;
    unread_pm_count?: number;
    user_achievements?: ({
        achieved_at: string;
        achievement_id: number;
    })[];
    user_preferences?: any;
    statistics_rulesets?: any;
};
interface User extends UserCompact {
    cover_url: string;
    discord?: string;
    has_supported: boolean;
    interests?: string;
    join_date: string;
    kudosu: {
        available: number;
        total: number;
    };
    location: string;
    max_blocks: number;
    max_friends: number;
    occupation?: string;
    playmode: GameMode;
    playstyle: ('mouse' | 'tablet' | 'keyboard' | 'touch')[];
    post_count: number;
    profile_order: ('me' | 'recent_activity' | 'beatmaps' | 'historical' | 'kudosu' | 'top_ranks' | 'medals')[];
    title?: string;
    title_url?: string;
    twitter?: string;
    website?: string;
}
declare type UserStatistics = {
    grade_counts: {
        a: number;
        s: number;
        sh: number;
        ss: number;
        ssh: number;
    };
    hit_accuracy: number;
    is_ranked: boolean;
    level: {
        current: number;
        progress: number;
    };
    maximum_combo: number;
    play_count: number;
    play_time: number;
    pp: number;
    global_rank?: number;
    ranked_score: number;
    replays_watched_by_others: number;
    total_hits: number;
    total_score: number;
    user: UserCompact;
};
declare type WikiPage = {
    available_locales: string[];
    layout: string;
    locale: string;
    markdown: string;
    path: string;
    subtitle: string;
    tags: string[];
    title: string;
};
declare type KudosuHistory = {
    id: number;
    action: string;
    amount: number;
    model: string;
    created_at: string;
    giver?: {
        url: string;
        username: string;
    };
    post: {
        url?: string;
        title: string;
    };
};
declare type ForumPost = {
    created_at: string;
    deleted_at?: string;
    edited_at?: string;
    edited_by_id?: string;
    forum_id: number;
    id: number;
    topic_id: number;
    user_id: number;
    body?: {
        html: string;
        raw: string;
    };
};
declare type ForumTopic = {
    created_at: string;
    deleted_at?: string;
    first_post_id: number;
    forum_id: number;
    id: number;
    is_locked: boolean;
    last_post_id: number;
    poll: {
        allow_vote_change: boolean;
        ended_at?: string;
        hide_incomplete_results: boolean;
        last_vote_at?: string;
        max_votes: number;
        options: ({
            id: number;
            text: {
                bbcode: string;
                html: string;
            };
            vote_count?: number;
        })[];
    };
    post_count: number;
    title: string;
    type: 'normal' | 'sticky' | 'announcement';
    updated_at: string;
    user_id: number;
};
declare type Spotlight = {
    end_date: string;
    id: number;
    mode_specific: boolean;
    participant_count?: number;
    name: string;
    start_date: string;
    type: string;
};
declare type Rankings = {
    beatmapsets?: Beatmapset[];
    cursor: object;
    ranking: UserStatistics[];
    spotlight?: Spotlight;
    total: number;
};
/** Make requests to osu! OAuth2 API v2 */
declare class OsuAPI {
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
    }): Promise<User>;
    getUser(options: {
        accessToken: string;
        user: string | number;
        mode?: GameMode;
        key?: string;
    }): Promise<User>;
    getUserScores(options: {
        id: number;
        type: 'best' | 'firsts' | 'recent';
        accessToken: string;
        include_fails?: boolean;
        mode?: GameMode;
        limit?: number;
        offset?: string;
    }): Promise<Score[]>;
    getUserBeatmaps<T extends 'most_played' | 'pending' | 'ranked' | 'favourite' | 'graveyard' | 'loved'>(options: {
        accessToken: string;
        user: number;
        type: T | 'pending' | 'ranked' | 'favourite' | 'graveyard' | 'loved';
        limit?: number;
        offset?: string;
    }): T extends 'most_played' ? Promise<BeatmapPlaycount[]> : Promise<Beatmapset[]>;
    getUserRecentActivity(options: {
        accessToken: string;
        id: number;
        limit?: number;
        offset?: string;
    }): Promise<any>;
    getUserKudosu(options: {
        user: number;
        accessToken: string;
        limit?: number;
        offset?: string;
    }): Promise<KudosuHistory[]>;
    getUsers(options: {
        accessToken: string;
        ids?: string[];
    }): Promise<{
        users: UserCompact[];
    }>;
    lookupBeatmap(options: {
        accessToken: string;
        checksum?: string;
        filename?: string;
        id?: string;
    }): Promise<Beatmap>;
    getUserBeatmapScore(options: {
        accessToken: string;
        beatmap: number;
        user: number;
        mode?: GameMode;
        mods?: GameMods[];
    }): Promise<BeatmapUserScore>;
    getUserBeatmapScores(options: {
        accessToken: string;
        beatmap: number;
        user: number;
        mode?: GameMode;
    }): Promise<{
        scores: Score[];
    }>;
    getBeatmap(options: {
        accessToken: string;
        beatmap: number;
    }): Promise<Beatmap>;
    getBeatmaps(options: {
        accessToken: string;
        ids?: string[];
    }): Promise<{
        beatmaps: BeatmapCompact[];
    }>;
    getBeatmapScores(options: {
        accessToken: string;
        beatmap: number;
        mode?: GameMode;
        mods?: GameMods;
        type?: RankingType;
    }): Promise<BeatmapScores>;
    getBeatmapAttributes(options: {
        accessToken: string;
        beatmap: number;
        mods?: number | string[] | GameMods[];
        ruleset?: GameMode;
        ruleset_id?: number;
    }): Promise<{
        attributes: BeatmapDifficultyAttributes;
    }>;
    getBeatmapsetDiscussionPosts(options: {
        accessToken: string;
        beatmapset_discussion_id?: string;
        limit?: number;
        page?: number;
        sort?: 'id_desc' | 'id_asc';
        types?: ('first' | 'reply' | 'system')[];
        user?: string;
    }): Promise<{
        beatmapsets: BeatmapsetCompact;
        cursor_string?: string;
        posts: BeatmapsetDiscussionPost;
        users: UserCompact;
    }>;
    getBeatmapDiscussionVotes(options: {
        accessToken: string;
        beatmapset_discussion_id?: string;
        limit?: number;
        page?: number;
        receiver?: number;
        score?: '1' | '-1';
        sort?: 'id_desc' | 'id_asc';
        user?: string;
    }): Promise<{
        cursor_string?: string;
        discussions: BeatmapsetDiscussion;
        users: UserCompact;
        votes: BeatmapsetDiscussionVote[];
    }>;
    getBeatmapsetDiscussions(options: {
        accessToken: string;
        beatmap_id?: string;
        beatmapset_id?: string;
        beatmapset_status?: 'all' | 'ranked' | 'qualified' | 'disqualified' | 'never_qualified';
        limit?: number;
        message_types?: ('suggestion' | 'problem' | 'mapper_note' | 'praise' | 'hype' | 'review')[];
        only_unresolved?: boolean;
        page?: number;
        sort?: 'id_desc' | 'id_asc';
        id?: string;
    }): Promise<{
        beatmaps: Beatmap[];
        cursor_string?: string;
        discussions: BeatmapsetDiscussion[];
        included_discussions: BeatmapsetDiscussion[];
        reviews_config: {
            max_blocks: number;
        };
        users: UserCompact[];
    }>;
    getChangelogBuild(options: {
        stream: string;
        build: string;
    }): Promise<Build>;
    getChangelogListing(options: {
        form?: string;
        max_id?: number;
        stream?: string;
        to?: string;
        message_formats?: 'html' | 'markdown';
    }): Promise<{
        builds: Build[];
        search: {
            form?: string;
            limit: number;
            max_id?: number;
            stream?: string;
            to?: string;
        };
        streams: UpdateStream[];
    }>;
    lookupChangelogBuild(options: {
        changelog: string;
        key?: string;
        message_formats?: 'html' | 'markdown';
    }): Promise<Build>;
    getOwnFriends(accessToken: string): Promise<User[]>;
    getSeasonalBackgrounds(): Promise<{
        ends_at: string;
        backgrounds: ({
            url: string;
            user: UserCompact;
        })[];
    }>;
    getWikiPage(options: {
        locale: string;
        path: string;
    }): Promise<WikiPage>;
    search<T extends 'all' | 'user' | 'wiki_page'>(options: {
        accessToken: string;
        mode?: T;
        query?: string;
        page?: number;
    }): T extends 'user' ? Promise<SearchResult<UserCompact>> : (T extends 'wiki_page' ? Promise<SearchResult<WikiPage>> : Promise<SearchResult<UserCompact & WikiPage>>);
    getScores(options: {
        accessToken: string;
        room: number;
        playlist: number;
        limit?: number;
        sort?: MultiplayerScoresSort;
        cursor?: MultiplayerScoresCursor;
    }): Promise<any>;
    getComments(options: {
        commentable_type?: string;
        commentable_id?: string;
        cursor?: object;
        parent_id?: string;
        sort?: string;
    }): Promise<CommentBundle>;
    getComment(comment: string): Promise<CommentBundle>;
    replyTopic(options: {
        accessToken: string;
        topic: number;
        body: string;
    }): Promise<ForumPost>;
    createTopic(accessToken: string, options: {
        body: string;
        forum_id: number;
        title: string;
        with_poll?: boolean;
        forum_topic_poll: {
            hide_results?: boolean;
            length_days?: number;
            max_options?: number;
            options: string;
            title: string;
            vote_change: boolean;
        };
    }): Promise<{
        topic: ForumTopic;
        post: ForumPost;
    }>;
    getTopicAndPosts(options: {
        accessToken: string;
        topic: number;
        cursor?: object;
        sort?: 'id_asc' | 'id_desc';
        limit?: number;
        start?: string;
        end?: string;
    }): Promise<{
        cursor_string: string;
        posts: ForumPost[];
        search: any;
        topic: ForumTopic;
    }>;
    editTopic(options: {
        accessToken: string;
        topic: number;
        forum_topic?: {
            topic_title: string;
        };
    }): Promise<ForumTopic>;
    editPost(options: {
        accessToken: string;
        post: number;
        body: string;
    }): Promise<ForumPost>;
    getRanking(options: {
        accessToken: string;
        mode: GameMode;
        type: RankingType;
        country?: number;
        cursor?: object;
        filter?: 'all' | 'friends';
        spotlight?: string;
        variant?: '4K' | '7K';
    }): Promise<Rankings>;
    getSpotlights(accessToken: string): Promise<{
        spotlights: Spotlight[];
    }>;
    createNewPM(options: {
        accessToken: string;
        target_id: number;
        message: string;
        is_action: boolean;
        uuid?: string;
    }): Promise<{
        new_channel_id: number;
        presence: ChatChannel[];
        message: ChatMessage;
    }>;
    createChannel(options: {
        accessToken: string;
        type: 'PM' | 'ANNOUNCE';
        channel?: {
            name?: string;
            description?: string;
        };
        message?: string;
        target_id?: number;
        target_ids?: number[];
    }): Promise<ChatChannel>;
}
export { OsuAPI, RankStatusEnum };
