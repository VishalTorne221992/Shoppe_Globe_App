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
    strictPort: true,
    port: 8000,
    allowedHosts: true,
    proxy: {
      "/api": {
        target : "https://shoppe-globe-app.onrender.com/",
        changeOrigin : true,
        secure : false,
      },
    },
  },
})
