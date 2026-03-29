import { api } from '@/lib/axios'
import { UserResponse, UsersListResponse } from '@/app/modules/user/user.type'

export async function getUsers(): Promise<UsersListResponse> {
    const { data } = await api.get<UsersListResponse>('/ucp/users')
    return data
}

export async function getUser(userId: number) {
    const response = await fetch(`/api/ucp/users/${userId}`, {
        method: 'GET',
        cache: 'no-store',
    })

    if (!response.ok) {
        throw new Error(`Failed to fetch user ${userId}`)
    }

    return (await response.json()) as UserResponse
}

