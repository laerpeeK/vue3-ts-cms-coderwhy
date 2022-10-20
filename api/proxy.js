const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (req, res) => {
  let target = ''

  if (req.url.startsWith('/backend')) {
    target = 'http://152.136.185.210:5000'
  }

  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      '^/backend': '/'
    }
  })(req, res)
}
