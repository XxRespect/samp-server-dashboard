export interface IpBannedInterface {
    IP: string | null,
    Reason: string,
    Adminid: number,
    date: string | number,
    ban: number,
    desban: number,
    system: string,
    playername: string
}


export interface IpBannedResponse {
    message: string | null
    status: boolean
    banned?: IpBannedInterface[] | null
    total: number
    totalPages: number
    currentPage: number
    hasNextPage: boolean
}
