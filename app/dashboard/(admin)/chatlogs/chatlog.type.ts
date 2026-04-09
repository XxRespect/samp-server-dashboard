export interface ChatLogInterface {
    id: number,
player_name: string,
    ip: string | number,
    version: string,
    package_lost: number | string,
    serial: string,
    message: string,
source: string | "Chat_Global",
    timestamp: string
}



export interface chatLoginResopnse {
    chatlogs: ChatLogInterface[]
}