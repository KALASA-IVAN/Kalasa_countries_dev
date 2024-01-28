import { z } from 'zod'

export type IResponse<T> = {
    data: T
    message: string
    status: string
    success: boolean
}

export type IResponseError = {
    data?: null
    message: string
    status: string
    success: boolean
}

export type Sorted<T> = {
    docs: T[]
    totalDocs: number,
    limit: number,
    totalPages: number,
    page: number,
    pagingCounter: number,
    hasPrevPage: boolean,
    hasNextPage: boolean,
    prevPage: number | null,
    nextPage: number | null
}

export type PaginateParams = {
    page?: number
    size?: number
}

export type APIError = {
    message: string
    status: number
    success: boolean
}

export type APIErrorResponse = {
    response: { data: APIError }
}

export type APISuccessResponse<T> = {
    response: { data: IResponse<T> }
}

export function responseSchema<T>(data: z.Schema<T>) {
    return z.object({
        message: z.string(),
        status: z.string(),
        success: z.boolean(),
        data: data,
    })
}
