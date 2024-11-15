import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),svgr()],
  server : {
    proxy: {
      '/api': {
        target: import.meta.env.VITE_API_BASE_URL,
        changeOrigin: true,
        secure: false
      }
    }
  }
})

