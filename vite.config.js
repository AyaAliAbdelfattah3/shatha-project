import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    {
      name: 'force-exit',
      closeBundle() {
      
        setTimeout(() => process.exit(0), 1000);
      }
    }
  ],
})