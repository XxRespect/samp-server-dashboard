export interface ClansInterface {
    CLAN_ID: number | null,
    CLAN_NAME: string | null,
    CLAN_ONWE: string,
    CLAN_WHEN: string | number,
    CLAN_ZONES: number,
    CLAN_TAG: string,
    CLAN_MEMBROS: string
}


export interface ClansResponse {
    clans: ClansInterface[]
    total: number
    page: number
    limit: number
}