export interface BannedsProps {
    Nick: string,
    banid: number,
    motivo: string,
    adm: string,
    desban: number,
    data: number | string,
    adminid: number,
    ban: number
}


export interface bannedsResponse {
    banneds: BannedsProps[]
}