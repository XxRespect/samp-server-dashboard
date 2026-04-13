import { ColumnDef } from "@tanstack/react-table"
import { ChatLogInterface } from "./chatlog.type"



export const columns: ColumnDef<ChatLogInterface>[] = [
    {
accessorKey: "player_name",
        header: "Nome do Jogador",
    },
    {
        accessorKey: "ip",
        header: "IP",
    },
    {
        accessorKey: "version",
        header: "Version",
    },
{
        accessorKey: "serial",
        header: "Serial",
    },
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
    }
]

