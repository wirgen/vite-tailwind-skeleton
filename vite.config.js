import { readdirSync } from 'fs'
import { resolve } from 'path'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

const root = 'src'
const htmlFiles = readdirSync(resolve(__dirname, root), { withFileTypes: true })
  .filter((item) => item.name.match(/.*?\.html/))
  .reduce((a, v) => ({ ...a, [v.name.substring(0, v.name.length - 5)]: resolve(v.path, v.name) }), {})

export default {
  root,
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: htmlFiles,
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]'
          }

          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]'
          }

          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
  plugins: [
    ViteImageOptimizer({
      /* pass your config - https://github.com/FatehAK/vite-plugin-image-optimizer */
    }),
  ],
}