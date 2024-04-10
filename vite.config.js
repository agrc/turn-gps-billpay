import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslintPlugin from 'vite-plugin-eslint';
import mkcert from 'vite-plugin-mkcert';
import loadVersion from 'vite-plugin-package-version';

export default defineConfig({
  css: {
    devSourcemap: true,
  },
  plugins: [
    react(),
    eslintPlugin(),
    loadVersion(),
    mkcert({
      force: true,
      hosts: [
        '*.utah.gov',
        '*.local.utah.gov',
        '127.0.0.1',
        'localhost',
        '::1',
      ],
    }),
  ],
  // server: {
  //   https: true,
  //   host: 'gps.local.utah.gov',
  //   port: 9201,
  //   open: true,
  // },
  preview: {
    port: 8080,
  },
  test: {
    env: 'node',
  },
});
