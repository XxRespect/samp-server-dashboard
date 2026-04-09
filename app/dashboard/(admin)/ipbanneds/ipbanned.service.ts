
import {IpBannedResponse, IpBannedInterface} from './ipbanned.types'
import { api } from '@/lib/axios'




export async function getBannedIps({search, page, limit: limit}: {search?: string, page?: number, limit?: number}): Promise<IpBannedResponse> {
    try {
        const { data } = await api.get<IpBannedResponse>('ucp/ip-banneds/', {params: {search, page, limit}})

        if(data.status == false) {
            throw new Error(data.message || 'Faild to fetch banned ips')}
        return data

    } catch(error) {
        throw new Error(`${error}: Faild to fetch banned ips`)
    }
}