import { api } from '@/lib/axios';
import { ChatLogResponse } from './chatlog.type';

export async function getChatLog({ search, page, limit, message }: {
    search?: string,
    page?: number,
    limit?: number,
    message?: string
}): Promise<ChatLogResponse | undefined> {
    try {
        const { data } = await api.get("/ucp/chatlogs", {
            params: {
                search,
                page,
                limit,
                message
            }
        })
        return data
    } catch (error) {
        console.error("Error fetching chat logs:", error);
    }
}


