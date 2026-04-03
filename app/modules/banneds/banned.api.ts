import { api } from '@/lib/axios'
import { bannedsResponse } from './banned.type'


export default async function getBanneds(): Promise<bannedsResponse> {
    const { data } = await api.get<bannedsResponse>('ucp/banneds')
    return data
}
