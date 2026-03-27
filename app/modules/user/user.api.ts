import { UserResponse } from '@/app/modules/user/user.type'

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

