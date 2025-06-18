import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/Prueba-tecnica/',
  build: {
    // Elimina o comenta esta sección para que Vite maneje index.html como la plantilla principal
    // rollupOptions: {
    //   input: {
    //     main: resolve(__dirname, 'index.html'),
    //     '404': resolve(__dirname, 'index.html'),
    //   }
    // }
  }
})