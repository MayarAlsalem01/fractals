type Result<T, E> = {
    data: T | undefined,
    error?: {
        message: string,
    },
    isError?: boolean
    ok?: boolean
}