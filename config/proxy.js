import { createProxyMiddleware } from 'http-proxy-middleware';

function Proxy(app) {
app.use(
'/',
createProxyMiddleware({
target: 'http://localhost:3000',
changeOrigin: true,
})
);
};

export default Proxy