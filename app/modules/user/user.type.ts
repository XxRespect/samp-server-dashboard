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
    profile: string
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


export interface userChatLogInter {
    player_name: string,
    accid: number,
    message: string,
    timestamp: string,
}


export type UserGeoTypes = {
    country: string
}

export type UserResponse = {
    message: string
    user: UserType
    usersWithSameIp: AccountsSameIp[]
    usersWithSameSerial: AccountsSameSerial[]
    user_ac: unknown[],
    userChatLog: userChatLogInter[]
}

/** Resposta de GET /api/ucp/users — lista de jogadores do banco */
export type UsersListResponse = {
    message: string
    users: UserType[]
}