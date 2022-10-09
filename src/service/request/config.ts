let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://152.136.185.210:5000'
}

/**
 * BASE_URL: 服务器资源地址
 * TIME_OUT: 服务超时设定
 */
export { BASE_URL, TIME_OUT }
