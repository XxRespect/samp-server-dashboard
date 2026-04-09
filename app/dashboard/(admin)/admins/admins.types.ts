

export interface AdminsInterface {
    id: number
    Nome: string
    Admin: number
    role: string
    ADMIN_TEMP: number,
    LasTimer: string | number
}

export interface AdminsResponse {
    admins: AdminsInterface[]
    totalAdmins: number
}
