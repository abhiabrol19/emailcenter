import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/current_user': 'http://localhost:3001',
      '/auth/google': 'http://localhost:3001',
      '/api/logout': 'http://localhost:3001',
      '/api/create-checkout-session': 'http://localhost:3001',
      '/webhook': 'http://localhost:3001',
    },
  },
  optimizeDeps: {
    include: ['redux-thunk'],
  },
});
