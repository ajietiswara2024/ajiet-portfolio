import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Hashed JS/CSS go to /static (long-cached). /assets is reserved for your own
    // editable files in public/assets (photo, CV, certificates, screenshots).
    assetsDir: 'static',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils'))
              return 'motion'
            if (id.includes('react')) return 'react'
          }
        },
      },
    },
  },
})
