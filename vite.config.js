import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuração otimizada para deploy no Vercel
export default defineConfig({
  plugins: [react()],
  base: './',   // garante que os assets funcionam em qualquer domínio/URL
})
