import AxRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

const axRequest = new AxRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 1.Authorize
      const token = localCache.getCache('token')
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('requestInterceptorCatchError:', err)
      return err
    },
    responseInterceptor: (res) => {
      return res.data
    },
    responstInterceptorCatch: (err) => {
      console.log('responseInterceptorCatchError:', err)
      return err
    }
  }
})

export default axRequest
