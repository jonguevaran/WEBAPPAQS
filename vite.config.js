import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        altas: resolve(__dirname, 'Altas.html'),
        cartas: resolve(__dirname, 'cartas.html'),
        buscador: resolve(__dirname, 'BuscadorCasos.html'),
        delegacion: resolve(__dirname, 'DelegacionAlmacenes.html'),
        llamadas: resolve(__dirname, 'Llamadas.html'),
        password: resolve(__dirname, 'Password.html')
      }
    }
  }
});
