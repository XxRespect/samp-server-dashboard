import { useQuery } from '@tanstack/react-query'
import { getPlayers } from '../modules/users/users.api'

export function usePlayers(params: {
    page: number,
    limit: number,
    search: string,
    sortBy: string,
    order: string
}) {
    return useQuery({
        queryKey: ['players',params],
        queryFn: () => getPlayers(params),
    })
}