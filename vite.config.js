import { defineConfig } from 'vite'
import { config } from 'dotenv';
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

config();

// https://vite.dev/config/
export default defineConfig({
  define: {
      // eslint-disable-next-line no-undef
      'process.env': process.env
  },
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
      outDir: 'dist',
      manifest: true
  },
  server: {
    host: true,
    port: 8080,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4002',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          })
        },
      },
    },
  },
})
