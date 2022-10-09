import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface AxRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responstInterceptorCatch?: (error: any) => any
}

export interface AxRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: AxRequestInterceptors<T>
}
