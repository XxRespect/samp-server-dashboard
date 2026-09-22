export type TicketKind = 'admin_report' | 'ban_appeal' | 'ip_appeal' | 'report'
export type TicketStatus = 'open' | 'closed' | 'accepted' | 'denied'



export type LastMessageTextedTyped = {
  
}

export type TicketTypes = {
  ticketid: number
  ticket_type: TicketKind
  author: string
  author_accid: number
  against_accid: number | null
  name: string | null
  status: TicketStatus | null
  createdAt: string
  updatedAt: string
  against_name: string | null
}