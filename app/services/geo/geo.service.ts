import axios from 'axios'
import { GeoLocation } from '@/app/types/geo/geo.type'
import {
    Alert,
    AlertDescription,
    AlertTitle,
    
} from "@/components/ui/alert"

export async function getGeoLocation(ip: string): Promise<GeoLocation> {
    const response = await axios.get(`http://ip-api.com/json/${ip}`)
    if(!response.data || response.data.status !== "success") {
        throw new Error(`<Alert variant="destructive">
            <AlertTitle>Error fetching geolocation</AlertTitle>
            <AlertDescription>
                Could not retrieve geolocation data for IP: ${ip}
            </AlertDescription>
        </Alert>`)
    }
    return response.data as GeoLocation
}