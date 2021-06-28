import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'

import viteSvgIcons from 'vite-plugin-svg-icons'

import path from 'path'

function resolve(dir) {
  return path.join(__dirname, dir)
}

export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: '9999',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }

  },
  plugins: [
    vue(),
    viteSvgIcons({
      iconDirs: [resolve('src/assets/icons/svg')],
      symbolId: 'icon-[name]'
    })
  ],
  resolve: {
    alias: [
      {find: 'components', replacement: resolve('src/components')},
      {find: 'model', replacement: resolve('src/model')},
      {find: 'views', replacement: resolve('src/views')},
      {find: 'styles', replacement: resolve('src/styles')},
      {find: 'assets', replacement: resolve('src/assets')},
      {find: 'api', replacement: resolve('src/api')}
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        
      }
    }
  }
})
