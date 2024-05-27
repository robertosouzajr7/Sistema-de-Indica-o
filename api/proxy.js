const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

module.exports = (req, res) => {
  const apiProxy = createProxyMiddleware({
    target: process.env.URL_API,
    changeOrigin: true,
    pathRewrite: {
      "^/api/": "/api/3/", // Reescreve a URL
    },
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader("Api-Token", process.env.API_KEY);
    },
  });

  apiProxy(req, res);
};
