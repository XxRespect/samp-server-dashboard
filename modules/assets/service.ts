import { api } from '@/lib/axios'
import { DashBoardDataResponse } from './type'




export async function getData(): Promise<DashBoardDataResponse> {
    const response = await api.get<DashBoardDataResponse>('/ucp/dash')
    return response.data
}