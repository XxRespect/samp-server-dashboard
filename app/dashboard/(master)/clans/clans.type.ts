export interface ClansInterface {
    CLAN_ID: number
    CLAN_NAME: string
    CLAN_ONWER: string
    CLAN_WHEN: string | number
    CLAN_ZONES: number
    CLAN_TAG: string | number
    CLAN_MEMBROS: number
    CLAN_COLOR: string
    CLAN_LEVEL: number
    CLAN_MOD: string,
    clanMembers: number
}

export interface ClansResponse {
    clans: ClansInterface[]
    total: number
    page: number
    limit: number
    totalPages: number
}
