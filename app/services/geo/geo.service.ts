import axios from 'axios'
import { GeoLocation } from '@/app/types/geo/geo.type'


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

async function getGeoLocationIpWhois(ip: string): Promise<GeoLocation | null> {
    try {
        const response = await axios.get(`https://ipwhois.app/json/${ip}`)
        const data = response.data
        if (!data || data.success === false) {
            console.warn(`ipwhois.app fail for ${ip}; message=${data?.message}`)
            return null
        }

        return {
            city: data.city || "Unknown",
            region: data.region || data.region_code || "Unknown",
            country: data.country || "Unknown",
            isp: data.isp || "Unknown",
            org: data.org || "Unknown",
            zip: data.postal || "Unknown",
            proxy: Boolean(data.proxy),
            timezone: data.timezone?.id || "UTC",
            query: data.ip || ip || "",
            regionName: data.region || "Unknown",
            as: data.as || "",
            countryCode: data.country_code || "",
            dns: {
                ip: data.ip || "",
            },
        } as GeoLocation
    } catch (error) {
        console.warn(`ipwhois.app request error for ${ip}`, error)
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

    const geoFromIpWhois = await getGeoLocationIpWhois(ip)
    if (geoFromIpWhois) return geoFromIpWhois

    return getFallbackGeoLocation(ip, "Geo service unavailable")
}