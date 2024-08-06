import { defineConfig } from 'vite';

export default defineConfig({
  base: '/threejs-webflow-periodictable/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './public/index.html'
      }
    }
  }
});