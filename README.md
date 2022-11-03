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
    const authURL = API.generateAuthURL(['identify', 'public'], csrfToken)

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
