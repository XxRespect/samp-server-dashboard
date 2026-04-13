export interface BannedsProps {
    Nick: string,
    banid: number | string | null,
    motivo: string,
    adm: string,
    desban: number,
    data: number | string,
    adminid: number,
    accid: number | null,
    ban: number
}


export interface bannedsResponse {
    banneds: BannedsProps[]
    total: number
    totalPages: number
    currentPage: number
}