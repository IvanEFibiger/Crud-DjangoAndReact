import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/personas': {
        target: 'http://127.0.0.1:8000', 
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
