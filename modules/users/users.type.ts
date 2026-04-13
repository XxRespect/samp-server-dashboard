export interface Players {
    Nome: string,
    profile: string,
    id:number,
    Admin: number,
    ADMIN_TEMP: number,
    BANNED: number,
    Online: number,
    Score: number,
    user_register: string,
    timestamp: string | number,
    LasTimer: string | number
}


export interface playersResponse {
    message: string,
    users: Players[]
    total: number
}