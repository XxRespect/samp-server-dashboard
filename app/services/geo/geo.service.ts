import axios from 'axios'
import { GeoLocation } from '@/app/types/geo/geo.type'


export async function getGeoLocation(ip: string): Promise<GeoLocation> {
    const response = await axios.get(`http://ip-api.com/json/${ip}`)
    if(!response.data || response.data.status !== "success") {
        throw new Error(`Could not retrieve geolocation data for IP: ${ip}`)
    }
    return response.data as GeoLocation
}