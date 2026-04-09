

export const serializeBigInt = <T>(data: T): T =>
    JSON.parse(
        JSON.stringify(data, (_, value) =>
            typeof value === 'bigint' ? value.toString() : value
        )
    )