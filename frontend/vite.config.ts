// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ ESSENCIAL para evitar 404 em rotas React Router
export default defineConfig({
  plugins: [react()],
  appType: 'spa',
})
