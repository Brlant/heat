import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import {fileURLToPath, URL} from 'node:url'
import glsl from 'rollup-plugin-glsl'


const target = {
  local_api:'http://192.168.5.23:8110',
  lacal_base:'http://192.168.5.25:8110/',
  ys:'http://192.168.5.25:8110',
  test:'https://test-ess-inner.cdcerp.cn/'
}


export default defineConfig({
  base:"",
  plugins: [vue(), glsl({
    include: "**/*.glsl",
    exclude: ['**/index.html']
  })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {},
  server: {
    host: '0.0.0.0',
    port: '5173',
    proxy: {
      '/api': {
        target: target.local_api,
        changeOrigin: true,
      }
    }
  }
})



