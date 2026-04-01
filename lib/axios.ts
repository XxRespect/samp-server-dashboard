import axios from 'axios'

function resolveBaseURL() {
    const configuredBaseURL = process.env.NEXT_PUBLIC_API_URL?.trim()

    if (!configuredBaseURL) {
        return '/api'
    }

    if (configuredBaseURL.startsWith('/')) {
        return configuredBaseURL.replace(/\/+$/, '')
    }

    try {
        const parsedURL = new URL(configuredBaseURL)
        return `${parsedURL.origin}${parsedURL.pathname}`.replace(/\/+$/, '')
    } catch {
        return '/api'
    }
}

export const api = axios.create({
    baseURL: resolveBaseURL(),
    timeout:10000,
    headers: {
        'Content-Type': 'application/json'
    }
})
