import { defineConfig } from 'vite';
import bromiumPlugin from '@bromscandium/vite-plugin';
import path from 'path';

export default defineConfig({
  base: '/bromiumjs-website/',
  plugins: [
    bromiumPlugin({
      pagesDir: 'src/pages',
      routesOutput: 'src/routes.generated.ts',
      base: '/bromiumjs-website',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: '@bromscandium/runtime',
  },
});
