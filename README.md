# About
- Based on osu!api v2
- Start using osu-apis in your project by running `npm i osu-apis@latest`.
- Documents: https://osu.ppy.sh/docs/index.html#introduction
# Example Usage
- Create application for requesting at: https://osu.ppy.sh/home/account/edit#new-oauth-application.
```js 
const { OsuAPI } = require('osu-apis')
const API = new OsuAPI({
    clientID: 12345,
    clientSecret: 'yourclientsecret',
    redirectURI: 'https://example.com/'
})
```
- Generate OAuth2 URL:
```js
const csrfToken = Math.random().toString(36).substring(2)
const authURL = API.generateAuthURL(['identify', 'public'], csrfToken)|

console.log(authURL)
```
- Token request:
```js
// Grant type: authorization_code
API.tokenRequest({
    grantType: 'authorization_code',
    code: 'verylongstring' // After accept authorization.
}).then(res => console.log(res))
.catch(console.error)

// Grant type: client_credentials
API.tokenRequest({
    grantType: 'client_credentials'
}).then(res => console.log(res))
.catch(console.error)

// Grant type: refresh_token
API.tokenRequest({
    grantType: 'refresh_token',
    accessToken: 'verylongstring',
    refreshToken: 'anotherlongstring'
}).then(res => console.log(res))
.catch(console.error)
```

- getUser 

```js
API.getUser({
    accessToken: "verylongstring",
    user: "I Simp Chino",
    mode: 'osu'
}).then(res => console.log(res)).then(console.error)
```

- getUserScores 

```js
API.getUserScores({
    accessToken: "verylongstring",
    user: "I Simp Chino",
}).then(res => console.log(res)).then(console.error)
```

- getUserRecentActivity

```js
API.getUserRecentActivity({
    accesToken: "verylongstring",
    id: 16435729,
    limit: 2,
}).then(res => console.log(res)).then(console.error)
```

# Output

`getUser`

```js
    country_code: "VN",
    avatar_url: "https://a.ppy.sh/16435729?1658474158.jpeg",
    default_group: "default",
    is_active: true,
    id: 16435729,
    is_bot: false,
    is_online: false,
    is_deleted: false,
    is_supporter: false,
    last_visit: null,
    pm_friends_only: true,
    profile_colour: null,
    username: "I Simp Chino",
    cover_url: "https://assets.ppy.sh/user-profile-covers/16435729/cfd8ea83f696b7dfb7ceb76762b8a54a9fa04bb329045ed91542a5d932e0c010.jpeg",
    discord: "Chino#4330",
    has_supported: true,
    interests: "Kafuu Chino",
    join_date: "2020-03-18T07:04:40+00:00"
...
```

`getUserScore`

```js
  {
    accuracy: 1,
    best_id: 3921378680,
    created_at: '2021-10-24T02:50:16Z',
    id: 3921378680,
    max_combo: 121,
    mode: 'osu',
    mode_int: 0,
    mods: [ 'HD', 'HR', 'NC' ],
    passed: true,
    perfect: true,
    pp: 154.78,
    rank: 'XH',
    replay: true,
    score: 341686,
    statistics: {
      count_100: 0,
      count_300: 87,
      count_50: 0,
      count_geki: 19,
      count_katu: 0,
      count_miss: 0
    },
    type: 'score_best_osu',
    user_id: 16435729,
    current_user_attributes: { pin: null },
    beatmap: {
      beatmapset_id: 705423,
      difficulty_rating: 2.78,
      id: 1492010,
      mode: 'osu',
      status: 'ranked',
      total_length: 33,
      user_id: 1881639,
      version: "Chromstrata's Hard",
      accuracy: 6,
      ar: 6,
      bpm: 125,
      convert: false,
      count_circles: 54,
      count_sliders: 33,
      count_spinners: 0,
      cs: 4,
      deleted_at: null,
      drain: 5,
      hit_length: 32,
      is_scoreable: true,
      last_updated: '2018-04-05T21:40:03Z',
      mode_int: 0,
      passcount: 734958,
      playcount: 2337849,
      ranked: 1,
      url: 'https://osu.ppy.sh/beatmaps/1492010',
      checksum: '40affa2a4c21b0526eb1c0a9367837b6'
    },
    beatmapset: {
      artist: 'Unknown Artist',
      artist_unicode: 'Unknown Artist',
      covers: [Object],
      creator: 'Chromoxx',
      favourite_count: 2190,
      hype: null,
      id: 705423,
      nsfw: false,
      offset: 0,
      play_count: 24286455,
      preview_url: '//b.ppy.sh/preview/705423.mp3',
      source: 'MINISTOP',
      spotlight: false,
      status: 'ranked',
      title: 'Miniministop Hitoyasumi no Uta[Mokuyoubi]Gakusei no Uta',
      title_unicode: 'ミニミニストップひとやすみの歌【木曜日】学生の歌',
      track_id: null,
      user_id: 1881639,
      video: false
    },
    user: {
      avatar_url: 'https://a.ppy.sh/16435729?1658474158.jpeg',
      country_code: 'VN',
      default_group: 'default',
      id: 16435729,
      is_active: true,
      is_bot: false,
      is_deleted: false,
      is_online: false,
      is_supporter: false,
      last_visit: null,
      pm_friends_only: true,
      profile_colour: null,
      username: 'I Simp Chino'
    },
    weight: { percentage: 100, pp: 154.78 }
  }
```

`getUserRecentActivity`

```js
{
    created_at: '2022-11-04T07:35:55+00:00',
    createdAt: '2022-11-04T07:35:55+00:00',
    id: 752201057,
    type: 'rank',
    scoreRank: 'SH',
    rank: 396,
    mode: 'osu',
    beatmap: {
      title: 'Fujita Akane, Miyamoto Yume, Ozawa Ari - Precious You* [Hard]',
      url: '/b/1301328?m=0'
},
```