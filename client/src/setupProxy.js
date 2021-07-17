const createProxyMiddleware = require("http-proxy-middleware");
const { server } = require("./config");

console.log("registering proxy middleware...");
module.exports = function (app) {
  app.use(
    "/ipfs",
    createProxyMiddleware({
      target: server,
      pathRewrite(pathReq, req) {
        let proxyUrl = `/ipfs?iurl=${req.query.iurl}`;
        console.log("proxyUrl", proxyUrl);
        return proxyUrl;
      },
      changeOrigin: true,
      secure: false,
    })
  );
  app.use(
    "/tokenInfo",
    createProxyMiddleware({
      target: server,
      changeOrigin: true,
      secure: false,
    })
  );
};
