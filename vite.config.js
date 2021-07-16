import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteSvgIcons from 'vite-plugin-svg-icons'

function resolve(dir) {
  return path.join(__dirname, dir)
}

export default defineConfig({
  plugins: [
    vue(),
    viteSvgIcons({
      iconDirs: [resolve('src/assets/icons/svg')],
      symbolId: 'icon-[name]'
    })
  ],
  resolve: {
    alias: [
      { find: '@', replacement: resolve('src') },
    ]
  },
  server: {
    host: '127.0.0.1',
    port: '9999',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
  },
})
