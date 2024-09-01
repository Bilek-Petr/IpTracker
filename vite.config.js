// vite.config.ts
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
   base: '/IpTracker/',
   define: {
      'process.env': process.env,
   },
});
