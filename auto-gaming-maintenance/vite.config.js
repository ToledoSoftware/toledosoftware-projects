import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // Esta seção é crucial. Ela força o Vite a reconhecer a estrutura do seu projeto.
  root: '.', // Define a raiz do projeto explicitamente.
  build: {
    // Aponta para o index.html na raiz.
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
    outDir: './dist' // Define o diretório de saída.
  },

  // Previne que o Vite limpe a tela, útil para ver logs.
  clearScreen: false,

  // Configuração do servidor que o Tauri espera.
  server: {
    port: 5173,      // A porta que estamos usando.
    strictPort: true, // Falha se a porta estiver em uso.
  },
})