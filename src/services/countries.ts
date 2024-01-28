import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import {
    IResponse,
    IResponseError,
    PaginateParams,
    Sorted,
} from '@/src/types/common'
import { backendAxios } from './axios'

export function useGetCountries(query: string) {
    return useQuery<IResponse<Sorted<any>>, AxiosError<IResponseError>>({
        queryKey: ['Countries', { query }],
        queryFn: () =>
        backendAxios
            .get<IResponse<Sorted<any>>>(`/${query}`, {})
            .then((res) => (res.data)),
    })
}
