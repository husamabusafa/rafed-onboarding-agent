import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router', 'react-router-dom'],
    alias: {
      react: path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'node_modules/react'),
      'react/jsx-runtime': path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        'node_modules/react/jsx-runtime.js',
      ),
      'react/jsx-dev-runtime': path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        'node_modules/react/jsx-dev-runtime.js',
      ),
      'react-dom': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'node_modules/react-dom'),
      'react-dom/client': path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        'node_modules/react-dom/client.js',
      ),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router', 'react-router-dom'],
  },
})
