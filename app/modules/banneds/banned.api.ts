import { api } from '@/lib/axios'
import { bannedsResponse } from './banned.type'


export default async function getBanneds({ search, page, sortBy, limit }:
    {
        search?: string,
        page?: number,
        sortBy?: string,
        limit?: number
    }):
    Promise<bannedsResponse> {
    const { data } = await api.get<bannedsResponse>('ucp/banneds', { params: { search, page, sortBy, limit } })
    return data
}
