
import { api } from '@/lib/axios'
import { ClanResponse } from './clan.type'




export async function getClan(clanid: number) {
    try {
        const  { data }  = await api.get<ClanResponse>(`ucp/clans/${clanid}`)
        return data.clan
    }catch(error) {
        throw new Error(`${error}: Faild to fetch clan ${clanid}`)
    }
}


