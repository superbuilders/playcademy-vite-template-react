import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { cademyManifestPlugin } from '@playcademy/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        cademyManifestPlugin({
            bootMode: 'iframe',
            entryPoint: 'index.html',
        }),
    ],
    base: './',
})
