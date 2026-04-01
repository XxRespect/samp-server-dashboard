import { api } from '@/lib/axios'
import {
    playersResponse
} from '@/app/modules/users/users.type'



export const getPlayers = async (): Promise<playersResponse> => {
    try {
        const response = await api.get<playersResponse>('ucp/users')
        return response.data
    }catch(error) {
        throw new Error('Failed to fetch players')
    }
}
