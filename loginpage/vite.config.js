import { defineConfig } from 'vite'; // Ensure this line is added

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // Adjust according to your server's address
    },
  },
});
