

export interface TicketsTypes{
    id: number;
    author_accid: number;
    against_accid: number | null;
    title: string | null;
    ticket_type: string;
    status: string | null;
    created_at: string;
    updated_at: string;
    author_name: string;
    against_name: string;

}


/**
 * 
 *           id: ticket.ticketid,
                author_accid: ticket.author_accid,
                against_accid: ticket.against_accid,
                title: ticket.name,
                ticket_type: ticket.ticket_type,
                status: ticket.status,
                created_at: ticket.createdAt,
                updated_at: ticket.updatedAt,
 * 
 */