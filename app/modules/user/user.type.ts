import { GeoLocation } from "@/app/types/geo/geo.type"

export type UserType = {
    Nome: string,
    id: string,
    Score: number,
    ADMIN_TEMP: number,
    Admin: number | null,
    Gpci: string,
    Dinheiro: number | string,
    BANNED: number,
    Skin: number | null,
    Matou?: number | string,
    Morreu?: number | string,
    pais: string,
    cidade: string,
    regiao: string,
    isp: string,
    organizacao: string,
    cep: string,
    Device: string,
    vpn: string,
    user_register: string,
    fuso_horario: string,
    IS_VIP: number,
    Online: boolean | null,
    MODO_MATA: boolean,
    Ip: string,
    Clan:string,
    Preso: number | null,
    LasTimer: string | number
    profile: string
    HeadShots: number | null,
    Email: string | null,
    HasEmail: boolean,
    PLAYER_CLAN: boolean
    getclanId: number
}

export interface AccountsSameIp {
    Nome: string,
    Ip: string,
    BANNED: number,
    id: number
}

export interface AccountsSameSerial {
    Nome: string,
    Gpci: string,
    Ip: string,
    BANNED: number,
    id: number
}


export interface userLoginLogsInter {
    id: number,
    player_name: string,
    ip: string,
    timestamp: string,
    action: "CONNECT" | "DISCONNECT"
    system: string,
    accid: number,
}




export interface userChatLogInter {
    id: number
    player_name: string
    message: string
    timestamp: string
}


/** Um registro de ban — GET usa `findFirst`, então é objeto único ou null, não array */
export type userBanInfoInter = {
    Nick: string
    adm: string
    desban: number | null
    adminid: number
    motivo: string,
    data?: string | null,
}

export interface userNicksInter {
    id: number,
    player_name: string,
    timestamp: string,
    nick_antigo: string,
    nick: string,
    data: string,
}


export type UserResponse = {
    message: string,
    user: UserType,
    usersWithSameIp: AccountsSameIp[],
    usersWithSameSerial: AccountsSameSerial[],
    user_ac: unknown[],
    userChatLog: userChatLogInter[],
    userBanInfo: userBanInfoInter | null,
    geoLocation: GeoLocation,
    userLoginLogs: userLoginLogsInter[],
    nicksChangeLogs: userNicksInter[],
    getclanId?: {
        M_CLANID: number
    } | null
}

/** Resposta de GET /api/ucp/users — lista de jogadores do banco */
export type UsersListResponse = {
    message: string
    users: UserType[]
}
