import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
  manifest:{
    name:"Crypto Portfolio",
    short_name:"crypto-portfolio",
    description:"the best crypto portfolio management app.",
    icons:[
      {
      src: '/Icon-20x20@1x.png',
      sizes:'20x20',
      type:'image/png',
      purpose:'favicon'
      },
      {
        src: '/logo.svg',
        sizes:'180x180',
        type:'image/png',
        purpose:'apple touch icon',
      },
      {
        src: '/logo.svg',
        sizes:'512x512',
        type:'image/png',
        purpose:'any maskable',
      }
    ],
    theme_color:'#171717',
    background_color:'#f0e7db',
    display:"standalone",
    scope:'/',
    start_url:"/",
    orientation:'portrait'
    }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
