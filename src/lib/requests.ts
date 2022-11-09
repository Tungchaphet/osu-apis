'use strict';

import axios from 'axios'
import { stringify } from 'qs'

const _encode = (object?: object) => Object.keys(object || {}).length !== 0 ? `?${stringify(object)}` : ''

async function requestHandlers(options: {
    path: string
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
    body?: object
    querys?: object
    auth?: string
}) {
    const response = await axios.request({
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
    })

    return response.data
}

export { requestHandlers }