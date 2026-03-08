import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/FloodAIRepo/',   // IMPORTANT for GitHub Pages
  build: {
    outDir: 'dist',
  },
  optimizeDeps: {
    include: ['uploadthing', '@uploadthing/react'],
  },
})