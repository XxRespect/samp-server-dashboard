import { ClansResponse } from './clans.type'
import { api } from '@/lib/axios'



export async function getClans({search, page, limit}:
    {search?: string, page?: string, limit?: string}): Promise<ClansResponse> {
  const response = await api.get<ClansResponse>('ucp/clans', {
    params: {
      search,
      page,
      limit
    }
  })
  return response.data
}