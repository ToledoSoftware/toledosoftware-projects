// vite.config.js
import { defineConfig } from 'vite';

// Este import é crucial para que o Vite saiba como lidar com arquivos .jsx
// Ele assume que o plugin do React está instalado (o que deve ser verdade)
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Adicionalmente, forçamos o Vite a não ignorar a pasta src
  optimizeDeps: {
    include: ['src/**/*.jsx', 'src/**/*.js'],
  },
});