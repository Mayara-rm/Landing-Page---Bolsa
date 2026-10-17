import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // nome do repositório no GitHub (necessário para o GitHub Pages)
  base: '/Landing-Page---Bolsa/',
})
