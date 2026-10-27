import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The client is a single page application. Session 6 sets the `base` option
// to the GitHub Pages subpath and swaps the API for a static adapter.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 4173,
  },
});
