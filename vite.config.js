import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        product: resolve(__dirname, 'product.html'),
        admin: resolve(__dirname, 'admin.html'),
        cart: resolve(__dirname, 'cart.html'),
      },
    },
  },
})
