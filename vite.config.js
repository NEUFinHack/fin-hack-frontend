import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),svgr()],
  server : {
    proxy: {
      '/api': {
        target: process.env.VITE_BASE_URL,
        changeOrigin: true,
        secure: false
      }
    }
  }
})

