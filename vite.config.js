import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Source reference photo dumps (raw UUID-named exports, in-progress
      // downloads, etc.) live under these folders - they aren't imported by
      // the app, and a locked/incomplete file here (e.g. a browser download)
      // can crash the watcher with EBUSY on Windows.
      ignored: ['**/public/perfume/**', '**/public/perfume bg/**', '**/public/ui layout/**'],
    },
  },
})
