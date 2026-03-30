export function formatPlayerNumber(value: string | number | null | undefined): string {
    const numericValue =
        typeof value === "number"
            ? value
            : Number(String(value ?? "").replace(/[^\d-]/g, ""))

    if (!Number.isFinite(numericValue)) {
        return "0"
    }

    return new Intl.NumberFormat("pt-BR", {
        maximumFractionDigits: 0,
    }).format(numericValue)
}
