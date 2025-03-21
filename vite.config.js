import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: '',
  build: {
      outDir: './dist',
      assetsDir: 'assets',
      manifest: true,
      rollupOptions: {
           input: './src/main.jsx'    
      },      
  },
  publicDir: 'assets',
  server: {
    cors: { origin: "https://shoppe-globe.onrender.com"},
    host: true,
    port: 8000,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4002',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });;
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
