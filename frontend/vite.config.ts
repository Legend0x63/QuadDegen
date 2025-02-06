import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  server: {  
    host: '0.0.0.0',  // This makes it accessible from any address  
    port: 5173  
  },
  plugins: [react()],
})
