const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    const PROXY = process.env.REACT_APP_PROXY ? process.env.REACT_APP_PROXY : "http://localhost:5000/";
    app.use(
        createProxyMiddleware('/api', {
            target: PROXY,
            onProxyReq(proxyReq, req, res) {
                proxyReq.setHeader('Origin', PROXY)
            },
            changeOrigin : true
        })
    );
}