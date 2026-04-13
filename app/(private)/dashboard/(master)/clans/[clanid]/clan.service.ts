
import { api } from '@/lib/axios'
import { ClanDetail, ClanResponse } from './clan.type'




export async function getClan(clanid: number): Promise<ClanDetail> {
    try {
        const  { data }  = await api.get<ClanResponse>(`ucp/clans/${clanid}`)
        return {
            ...data.clan,
            ownerId: data.clanOwner?.id ?? null
        }
    }catch(error) {
        throw new Error(`${error}: Faild to fetch clan ${clanid}`)
    }
}


