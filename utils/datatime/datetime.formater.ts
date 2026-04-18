export function formatTime(value: string | Date | number | null | undefined): string {
    if (value === null || value === undefined || value === "") return "--"

    const d = value instanceof Date ? value : new Date(value)

    if (Number.isNaN(d.getTime())) return String(value)

    return d.toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    }).replace(",","")
}
