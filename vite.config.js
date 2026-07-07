import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(async ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '') || {}
  const plugins = [react(), tailwindcss()]

  // Dev-only local upload API — skip loading during production build.
  if (command === 'serve') {
    const { uploadApiPlugin } = await import('./server/uploadApiPlugin.mjs')
    plugins.push(
      uploadApiPlugin({
        apiKey: env.VITE_FIREBASE_API_KEY || '',
        blobToken: env.BLOB_READ_WRITE_TOKEN || '',
        blobStoreId: env.BLOB_STORE_ID || '',
      })
    )
  }

  return { plugins }
})
