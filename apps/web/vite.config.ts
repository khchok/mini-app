/* eslint-disable @typescript-eslint/no-explicit-any */
import httpProxy from 'http-proxy';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
const proxy = httpProxy.createProxyServer({});

const customProxyPlugin = () => {
  return {
    name: 'custom-proxy-plugin',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        const { host } = req.headers;
        // const prefix = host.slice(0, host.lastIndexOf('localhost'));

        const regexApiPathRule = new RegExp('^(/api|/websocket)');

        const isDevServer = String(host).includes('localhost');
        const target = isDevServer
          ? `http://localhost:3334`
          : 'https://server-sandy-two-95.vercel.app';

        if (isDevServer && regexApiPathRule.test(req.url)) {
          proxy.web(req, res, {
            changeOrigin: true,
            target: target
          });
        } else {
          next();
        }
      });
    }
  };
};

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3333
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [react(), tailwindcss(), customProxyPlugin()]
});
