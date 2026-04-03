import { api } from '@/lib/axios'
import { bannedsResponse } from './banned.type'


export default async function getBanneds(): Promise<bannedsResponse> {
    const { data } = api.get<bannedsResponse>('api/banneds')
    return data
}