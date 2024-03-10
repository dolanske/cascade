import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'cascade',
      formats: ['es'],
      fileName: 'cascade',
    },
    rollupOptions: {
      external: ['@vue/reactivity', '@vue-reactivity/watch'],
    },
  },
  plugins: [dts({
    rollupTypes: true,
    exclude: ['./src/examples'],
  })],
})
