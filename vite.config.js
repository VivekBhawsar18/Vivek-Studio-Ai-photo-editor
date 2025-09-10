import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file for the current mode
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Expose environment variables to the client.
      // JSON.stringify is needed to wrap the string in quotes.
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
});
