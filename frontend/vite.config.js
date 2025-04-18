import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5050,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8080/"
      }
    },
    host: "0.0.0.0",
    strictPort: true
  }
});
