import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { playcademy } from '@playcademy/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), playcademy()],
    base: './',
})
