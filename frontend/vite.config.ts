// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  base: '/',
  // ESSENCIAL PRA FUNCIONAR COM ROTEAMENTO SPA
  // ISSO resolve o 404 ao atualizar ou entrar direto em /login
  appType: 'spa',
})
