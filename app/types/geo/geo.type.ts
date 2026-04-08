
export interface GeoLocation {
    city: string,
    region: string,
    country: string,
    isp: string,
    org: string,
    zip: string,
    proxy: boolean,
    timezone: string,
    query: string,
    regionName: string,
    as: string,
    countryCode: string,
    dns: {
        ip: string
    }
}



export interface MapIDELocationProvider {
    getLocation(ip:string): Promise<GeoLocation>
}