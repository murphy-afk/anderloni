import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The client is a single page application. Building with `--mode ghpages`
// sets the base to the GitHub Pages subpath; normal builds keep the domain
// root so local preview and the final hosting stay unchanged.
export default defineConfig(({ mode }) => ({
  base: mode === 'ghpages' ? '/anderloni/' : '/',
  plugins: [
    react(),
    {
      // The staging preview must not be indexed before the real launch:
      // in that build a robots noindex tag is added to the static HTML.
      name: 'preview-noindex',
      transformIndexHtml() {
        if (mode !== 'ghpages') return [];
        return [
          {
            tag: 'meta',
            attrs: { name: 'robots', content: 'noindex, nofollow' },
            injectTo: 'head',
          },
        ];
      },
    },
    {
      // GitHub Pages answers unknown paths with 404.html, which sends the
      // visitor back to index.html with the path in the query string. Only
      // the preview build needs it: its redirect assumes the /anderloni/
      // subpath and would loop on root hosting.
      name: 'preview-404-page',
      generateBundle() {
        if (mode !== 'ghpages') return;
        this.emitFile({
          type: 'asset',
          fileName: '404.html',
          source: readFileSync(
            fileURLToPath(new URL('./static/404.html', import.meta.url)),
            'utf8'
          ),
        });
      },
    },
  ],
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
}));
