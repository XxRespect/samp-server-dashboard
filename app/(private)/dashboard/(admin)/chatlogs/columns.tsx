import { ColumnDef } from "@tanstack/react-table"
import { ChatLogInterface } from "./chatlog.type"



export const columns: ColumnDef<ChatLogInterface>[] = [
    {
        accessorKey: "timestamp",
        header: "Data/Hora",
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
]

