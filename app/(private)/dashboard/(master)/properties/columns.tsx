import { createColumnHelper } from "@/lib/table";
import { features } from "./data-table-features"
import { Properties } from './propertie.type'

import { DataTable } from "./data-table";


const columnHelper = createColumnHelper<typeof features, Properties>()

export const columns = columnHelper.columns([
  {
    accessorKey: "HOUSE_ID",
    header: "ID",
  },
  {
    accessorKey: "HOUSE_NAME",
    header: "Property Name",
  },
  {
    accessorKey: "HOUSE_LEVEL",
    header: "Level",
  },
  {
    accessorKey: "HOUSE_PRICE",
    header: "Price",
  },
]);


interface PropertiesTableProps {
  data: Properties[]
}


export const PropertiesTable = ({ data }: PropertiesTableProps) => {
  return <DataTable columns={columns} data={data} />
}