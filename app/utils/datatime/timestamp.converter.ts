
export function convertTimestampToDate(
    timestamp: number | string | null | undefined,
    gmt: number = 0
): string {
    if (timestamp === null || timestamp === undefined || timestamp === "") return "--"

    const unixTimestamp = Number(timestamp)

    if (Number.isNaN(unixTimestamp)) return String(timestamp)

    const date = new Date((unixTimestamp + gmt * 60 * 60) * 1000)

    const day = String(date.getUTCDate()).padStart(2, "0")
    const month = String(date.getUTCMonth() + 1).padStart(2, "0")
    const year = date.getUTCFullYear()
    const hours = String(date.getUTCHours()).padStart(2, "0")
    const minutes = String(date.getUTCMinutes()).padStart(2, "0")
    const seconds = String(date.getUTCSeconds()).padStart(2, "0")

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}
