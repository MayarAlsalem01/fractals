export type Result<T, E> = {
    data: T | undefined,
    error?: {
        message: string,
    },
    isError?: boolean
    ok?: boolean
}
export interface PaginationResult<T> {
    data: T;
    pagination: {
        total: number;
        pages: number;
        current: number;
    };
}