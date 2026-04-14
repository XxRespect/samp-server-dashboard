export interface ChatLogInterface {
    id: number,
    player_name: string,
    message: string,
    timestamp: string
}

export interface ChatLogResponse {
    chatlogs: ChatLogInterface[],
    total: number,
    page: number,
    limit: number
}
