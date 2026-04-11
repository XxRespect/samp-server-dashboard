'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'


export async function UnbanPlayer(id: string) {
    const session = await auth()
    if (!session) {
        throw new Error('Not authenticated')
    }

    if(session?.user.role === "USER" || session?.user.role === "MODERATOR") {
     
        return { success: false, message: 'Not authorized' }
    }   

    // TODO: Implement ban logic
    console.log('Banning player with ID:', id)
    
    // Example: Call your API or database here
    // await fetch('/api/ban', { method: 'POST', body: JSON.stringify({ id }) })
    
    return { success: true, message: 'Player banned successfully' }
}