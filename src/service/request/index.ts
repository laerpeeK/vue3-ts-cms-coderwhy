import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { AxRequestInterceptors, AxRequestConfig } from './type'

export default class AxRequest {
  instance: AxiosInstance
  interceptors?: AxRequestInterceptors
  errorMsg: string
  constructor(config: AxRequestConfig) {
    // 1.保存基本信息
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.errorMsg = ''
    // 2.从config中取出当前实例拦截器并使用
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responstInterceptorCatch
    )

    // 添加错误上报拦截器
    /*
    this.instance.interceptors.request.use(undefined, (err) => {})
    this.instance.interceptors.response.use(undefined, (err) => {})
    */
  }

  request<T>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
