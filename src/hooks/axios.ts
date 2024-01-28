import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig
} from 'axios'

const env = process.env.NODE_ENV || process.env['NEXT_PUBLIC_ENV'] || 'development'
export const BASE_URL =
    env == 'production' ?
        process.env['NEXT_PUBLIC_DEV_BASE_URL'] :
        process.env['NEXT_PUBLIC_PROD_BASE_URL']

const baseInstance = axios.create({
    baseURL: BASE_URL,
})

function baseRequestInterceptor(config: InternalAxiosRequestConfig) {
    config.headers['Accept-Language'] = localStorage.getItem('lang') ?? 'en'
    return config
}

function baseRequestSuccessResponseInterceptor(response: AxiosResponse) {
    return response
}

function baseRequestErrorResponseInterceptor(error: AxiosError) {
    const status = error.response?.status

    if (status === 401) throw 'Unauthorized Access!'
    return Promise.reject(error)
}

baseInstance.interceptors.request.use(baseRequestInterceptor)

baseInstance.interceptors.response.use(
    baseRequestSuccessResponseInterceptor,
    baseRequestErrorResponseInterceptor
)

export type ExtendedAxiosInstanceOptions = {
    /** unique axios config for extended instance */
    config?: AxiosRequestConfig
    /** in case you do not want to use baseInstance */
    alternateInstance?: AxiosInstance
    alternateRequestInterceptor?: (
        config: InternalAxiosRequestConfig
    ) => InternalAxiosRequestConfig
    alternateSuccessResponseInterceptor?: (
        response: AxiosResponse
    ) => AxiosResponse
    alternateErrorResponseInterceptor?: (error: any) => Promise<any>
}

function createExtendedInstance(
    subPath: string,
    {
        config,
        alternateInstance,
        alternateErrorResponseInterceptor,
        alternateRequestInterceptor,
        alternateSuccessResponseInterceptor,
    }: ExtendedAxiosInstanceOptions = {},
): AxiosInstance {
    const itc = alternateInstance ?? baseInstance

    const instance = axios.create({
        ...itc.defaults,
        baseURL: itc.defaults.baseURL + subPath,
        ...config,
    })

    // use base interceptors by default
    const requestInterceptor =
        alternateRequestInterceptor ?? baseRequestInterceptor
    const requestSuccessResponseInterceptor =
        alternateSuccessResponseInterceptor ?? baseRequestSuccessResponseInterceptor
    const requestErrorResponseInterceptor =
        alternateErrorResponseInterceptor ?? baseRequestErrorResponseInterceptor

    instance.interceptors.request.use(requestInterceptor)
    instance.interceptors.response.use(
        requestSuccessResponseInterceptor,
        requestErrorResponseInterceptor
    )

    return instance
}

export { baseInstance, createExtendedInstance }
