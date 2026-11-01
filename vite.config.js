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
        // السطر ده بيجبر Vercel يقفل البناء بعد ما Vite يخلص
        setTimeout(() => process.exit(0), 1000);
      }
    }
  ],
})