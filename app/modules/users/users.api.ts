import { api } from '@/lib/axios'
import {
    playersResponse
} from '@/app/modules/users/users.type'




export const getPlayers = async (params:{
    page: number,
    limit: number,
    search: string,
    sortBy: string,
    order: string
}): Promise<playersResponse> => {
    const queryParams = new URLSearchParams();
    if(params.search)
        queryParams.set("search", params.search);

    if(params.page)
        queryParams.set("page", params.page.toString());

    if(params.limit)
        queryParams.set("limit", params.limit.toString());

    if(params.sortBy)
        queryParams.set("sortBy", params.sortBy);

    if(params.order)
        queryParams.set("order", params.order);

    try {
        const response = await api.get<playersResponse>(`ucp/users?${queryParams}`)
        return response.data
    }catch(error) {
        throw new Error('Failed to fetch players')
    }
}


