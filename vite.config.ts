import { defineConfig } from 'vite';
import bromiumPlugin from '@bromium/vite-plugin';
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
      'bromium': path.resolve(__dirname, '../BromiumJS/bromium/src'),
      '@bromium/core': path.resolve(__dirname, '../BromiumJS/packages/core/src'),
      '@bromium/runtime/jsx-runtime': path.resolve(__dirname, '../BromiumJS/packages/runtime/src/jsx-runtime.ts'),
      '@bromium/runtime/jsx-dev-runtime': path.resolve(__dirname, '../BromiumJS/packages/runtime/src/jsx-runtime.ts'),
      '@bromium/runtime': path.resolve(__dirname, '../BromiumJS/packages/runtime/src'),
      '@bromium/router': path.resolve(__dirname, '../BromiumJS/packages/router/src'),
    },
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: '@bromium/runtime',
  },
});
