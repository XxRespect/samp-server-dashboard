import { api } from '@/lib/axios'
import { AdminsResponse } from './admins.types'



export async function getAdmins(): Promise<AdminsResponse> {
    try {
        const  { data }  = await api.get<AdminsResponse>('ucp/admins')
        return data
    }catch(error) {
        throw new Error(`${error}: Faild to fetch admins`)
    }
}
