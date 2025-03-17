import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    manifest: true,
    rollupOptions: {
      input: './src/main.jsx',
    },
  },
  server: {
    host: true,
    port: 8080,
    allowedHosts: 'https://shoppe-globe-app.onrender.com',
    proxy: {
      '/api': {
        target: 'http://localhost:4002',
        changeOrigin: true,
        secure: false,
      }
    },
  },
})
