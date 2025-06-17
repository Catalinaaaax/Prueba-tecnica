import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Prueba-tecnica/', // Asegúrate que coincida con el nombre de tu repositorio
})
