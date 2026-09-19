import { TicketInterface } from './ticket.type'
import { createColumnHelper } from "@/lib/table"
import { type DataTableFeatures } from "./data-table-features"



const columnHelper = createColumnHelper<DataTableFeatures, TicketInterface>()

export const columns = columnHelper.columns([
    {
        id: "ticketid",
        accessorKey: "ticketid",
    }
])
