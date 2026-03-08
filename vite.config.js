import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',   // Correct for custom domain deployment
  build: {
    outDir: 'dist',
  },
  optimizeDeps: {
    include: ['uploadthing', '@uploadthing/react'],
  },
})