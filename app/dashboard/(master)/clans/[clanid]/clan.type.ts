
import { ClansInterface } from "../clans.type";


export interface ClanMembersInterace {
    M_ACCID?: number | string | null
    M_NAME: string
    M_LEVEL: number
    M_CLAN_ONWER: number
    M_TITLE: string

}

export interface ClanResponse {
    message: string
    clan: ClansInterface,
    clanMembers: ClanMembersInterace[]
}