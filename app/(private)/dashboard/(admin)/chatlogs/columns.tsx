import { createColumnHelper } from "@/lib/table"
import { features } from "./data-table-features"
import { ChatLogInterface } from "./chatlog.type"



const columnHelper = createColumnHelper<typeof features, ChatLogInterface>()

export const columns = columnHelper.columns([
    {
        accessorKey: "timestamp",
        header: "Time",
        cell: ({ row }) => {
            const timestamp = row.getValue("timestamp") as string;
            return new Date(timestamp).toLocaleString("pt-BR");
        },
    },
    {
        accessorKey: "message",
        header: "Mensagem",
        cell: ({row}) => {
            return (
                <>
                    <div>
                        {row.original.player_name}:  {row.original.message}
                    </div>
                </>
            )
        }
    }
])

