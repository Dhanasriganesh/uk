import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { uploadApiPlugin } from './server/uploadApiPlugin.mjs'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      tailwindcss(),
      uploadApiPlugin({ apiKey: env.VITE_FIREBASE_API_KEY }),
    ],
  }
})
