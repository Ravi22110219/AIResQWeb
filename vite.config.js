import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  base: '/',   // Correct for custom domain deployment

  build: {
    outDir: 'dist',

    // Prevent exposing original source
    sourcemap: false,

    // Minify production code
    minify: 'terser',

    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },

    // Make bundle structure harder to understand
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  },

  optimizeDeps: {
    include: ['uploadthing', '@uploadthing/react'],
  },
})