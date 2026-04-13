import axios from 'axios'
import { GeoLocation } from '@/types/geo/geo.type'


function getFallbackGeoLocation(ip: string, reason = "Unknown"): GeoLocation {
    return {
        city: reason,
        region: reason,
        country: reason,
        isp: reason,
        org: reason,
        zip: reason,
        proxy: false,
        timezone: "UTC",
        query: ip || "",
        regionName: reason,
        as: "",
        countryCode: "",
        dns: {
            ip: "",
        },
    }
}

function isPrivateIp(ip: string): boolean {
    return /^(10\.|127\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|192\.168\.)/.test(ip)
}

async function getGeoLocationIpApi(ip: string): Promise<GeoLocation | null> {
    try {
        const response = await axios.get(`http://ip-api.com/json/${ip}`)
        if (!response.data || response.data.status !== "success") {
            console.warn(`ip-api.com fail for ${ip}; status=${response.data?.status}; message=${response.data?.message}`)
            return null
        }

        return response.data as GeoLocation
    } catch (error) {
        console.warn(`ip-api.com request error for ${ip}`, error)
        return null
    }
}

export async function getGeoLocation(ip: string): Promise<GeoLocation> {
    if (!ip) {
        console.warn("Geo lookup called with empty IP; returning fallback.")
        return getFallbackGeoLocation(ip, "No IP")
    }

    if (isPrivateIp(ip)) {
        console.warn(`Geo lookup for private IP ${ip}; returning fallback.`)
        return getFallbackGeoLocation(ip, "Private network")
    }

    const geoFromIpApi = await getGeoLocationIpApi(ip)
    if (geoFromIpApi) return geoFromIpApi

    return getFallbackGeoLocation(ip, "Geo service unavailable")
}