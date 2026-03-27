export type UserType = {
    Nome: string,
    id: string,
    Score: number,
    ADMIN_TEMP: number,
    Admin: number,
    Gpci: string,
    Dinheiro: number | string,
    BANNED: number,
    Skin: number,
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
    Online: number,
    MODO_MATA: number
}

export type UserResponse = {
    message: string
    user: UserType
}